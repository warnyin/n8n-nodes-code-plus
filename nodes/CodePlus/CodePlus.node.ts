import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
} from "n8n-workflow";

import { existsSync, mkdirSync, writeFileSync, rmSync } from "fs";
import path from "path";
import os from "os";
import { spawnSync } from "child_process";
import { createRequire } from "module";
import * as vm from "vm";

function defaultCacheDir(): string {
  return path.join(os.homedir(), ".n8n", "code-plus-cache");
}

function ensureCacheProject(cacheDir: string) {
  if (!existsSync(cacheDir)) {
    mkdirSync(cacheDir, { recursive: true });
  }
  const pkgPath = path.join(cacheDir, "package.json");
  if (!existsSync(pkgPath)) {
    const pkg = {
      name: "code-plus-cache",
      version: "1.0.0",
      description: "Cache for n8n Code Plus node",
      license: "MIT",
    };
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  }
  const indexPath = path.join(cacheDir, "index.js");
  if (!existsSync(indexPath)) {
    writeFileSync(indexPath, "module.exports = {};\n");
  }
}

function parseLibraries(librariesRaw: string): string[] {
  if (!librariesRaw) return [];
  // Accept comma-separated or JSON array
  const raw = librariesRaw.trim();
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr.map((s) => String(s).trim()).filter(Boolean);
  } catch {}
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

// Wrap user-provided code so that top-level `return` and `await` are allowed.
// Using an async IIFE ensures `await` works and a returned value is captured.
function wrapAsyncIIFE(code: string): string {
  return `(async () => {\n${code}\n})()`;
}

function isLibInstalled(cacheDir: string, libName: string): boolean {
  return existsSync(path.join(cacheDir, "node_modules", libName));
}

function installLibraries(cacheDir: string, libs: string[]): { success: boolean; output: string } {
  if (libs.length === 0) return { success: true, output: "No libraries to install" };
  const args = ["install", "--no-audit", "--no-fund", "--omit=dev", "--silent", ...libs];
  const res = spawnSync("npm", args, { cwd: cacheDir, shell: true, encoding: "utf-8" });
  const success = res.status === 0;
  return { success, output: (res.stdout || "") + (res.stderr || "") };
}

export class CodePlus implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Code Plus",
    name: "codePlus",
    icon: "file:code-plus.svg",
    group: ["transform"],
    version: 1,
    description: "Run custom JavaScript with installable cached libraries",
    defaults: {
      name: "Code Plus",
    },
    inputs: ["main"],
    outputs: ["main"],
    properties: [
      {
        displayName: "Libraries",
        name: "libraries",
        type: "string",
        default: "",
        description:
          "Comma-separated packages or JSON array (e.g. nanoid@latest,lodash or [\"nanoid\"]).",
        placeholder: "nanoid@latest,lodash",
      },
      {
        displayName: "Init Code",
        name: "initCode",
        type: "string",
        typeOptions: { rows: 4 },
        default: "",
        description: "JavaScript to run once before main code (optional).",
      },
      {
        displayName: "Main Code",
        name: "code",
        type: "string",
        typeOptions: { rows: 8 },
        default: "return { id: require('nanoid').nanoid(), input: item };",
        description: "JavaScript executed per item or once, with custom require available.",
      },
      {
        displayName: "Run Mode",
        name: "runMode",
        type: "options",
        default: "perItem",
        options: [
          { name: "Per Item", value: "perItem" },
          { name: "Once", value: "once" },
          { name: "n8n Code (compat)", value: "n8nCode" },
        ],
        description: "Execute code for each input item or a single time.",
      },
      {
        displayName: "Options",
        name: "options",
        type: "collection",
        placeholder: "Add Option",
        default: {},
        options: [
          {
            displayName: "Cache Directory",
            name: "cacheDir",
            type: "string",
            default: "",
            description: "Custom cache path. Leave empty for default at ~/.n8n/code-plus-cache.",
          },
          {
            displayName: "Clear Cache Before Run",
            name: "clearCache",
            type: "boolean",
            default: false,
            description: "Delete node_modules in cache before installing.",
          },
          {
            displayName: "Force Reinstall",
            name: "forceReinstall",
            type: "boolean",
            default: false,
            description: "Install libraries even if already present in cache.",
          },
          {
            displayName: "Timeout (ms)",
            name: "timeoutMs",
            type: "number",
            default: 10000,
            description: "Max execution time for init/main code.",
          },
          {
            displayName: "Preinstall Only",
            name: "preinstallOnly",
            type: "boolean",
            default: false,
            description: "Install libraries without running any code.",
          },
        ],
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    // Parameters
    const librariesRaw = this.getNodeParameter("libraries", 0, "") as string;
    const initCode = this.getNodeParameter("initCode", 0, "") as string;
    const code = this.getNodeParameter("code", 0) as string;
    const runMode = this.getNodeParameter("runMode", 0, "perItem") as string;
    const options = this.getNodeParameter("options", 0, {}) as Record<string, any>;

    const timeoutMs = Number(options.timeoutMs ?? 10000);
    const cacheDir = (options.cacheDir as string) || defaultCacheDir();
    const clearCache = Boolean(options.clearCache);
    const forceReinstall = Boolean(options.forceReinstall);
    const preinstallOnly = Boolean(options.preinstallOnly);

    // Prepare cache project
    try {
      if (clearCache) {
        const nm = path.join(cacheDir, "node_modules");
        if (existsSync(nm)) rmSync(nm, { recursive: true, force: true });
      }
      ensureCacheProject(cacheDir);
    } catch (err) {
      throw new NodeOperationError(this.getNode(), `Failed to prepare cache directory: ${String(err)}`);
    }

    // Install libraries if needed
    const libraries = parseLibraries(librariesRaw);
    try {
      const toInstall = forceReinstall
        ? libraries
        : libraries.filter((lib) => !isLibInstalled(cacheDir, lib.split("@")[0]));

      if (toInstall.length > 0) {
        const { success, output } = installLibraries(cacheDir, toInstall);
        if (!success) {
          if (this.continueOnFail()) {
            return [
              [
                {
                  json: { error: "Library installation failed", detail: output },
                },
              ],
            ];
          }
          throw new NodeOperationError(this.getNode(), `Library installation failed: ${output}`);
        }
      }
    } catch (err) {
      throw new NodeOperationError(this.getNode(), `Failed to install libraries: ${String(err)}`);
    }

    if (preinstallOnly) {
      // No code execution, return a summary
      return [[{ json: { status: "preinstalled", libraries } }]];
    }

    // Create a custom require bound to cacheDir
    const customRequire = createRequire(path.join(cacheDir, "index.js"));

    // Setup VM context
    const context = vm.createContext({
      require: customRequire,
      console,
      Buffer,
      setTimeout,
      setInterval,
      clearTimeout,
      clearInterval,
    });

    // Run init code once if provided
    if (initCode && initCode.trim().length > 0) {
      try {
        const initWrapped = wrapAsyncIIFE(initCode);
        await Promise.resolve(vm.runInContext(initWrapped, context, { timeout: timeoutMs }));
      } catch (err) {
        if (this.continueOnFail()) {
          return [[{ json: { error: "Init code error", detail: String(err) } }]];
        }
        throw new NodeOperationError(this.getNode(), `Init code error: ${String(err)}`);
      }
    }

    // Execute main code
    const wrappedMainCode = wrapAsyncIIFE(code);
    if (runMode === "n8nCode") {
      // Compatibility mode: expose full items (INodeExecutionData) like n8n Code node
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        try {
          (context as any).item = item;
          (context as any).items = items;
          (context as any).index = i;

          const result = await Promise.resolve(
            vm.runInContext(wrappedMainCode, context, { timeout: timeoutMs })
          );

          if (Array.isArray(result)) {
            for (const r of result) {
              if (r && typeof r === "object" && "json" in r) {
                returnData.push({ ...(r as any), pairedItem: { item: i } });
              } else {
                returnData.push({ json: r as any, pairedItem: { item: i } });
              }
            }
          } else if (result && typeof result === "object" && "json" in (result as any)) {
            returnData.push({ ...(result as any), pairedItem: { item: i } });
          } else if (typeof result === "object" && result !== null) {
            returnData.push({ json: result as any, pairedItem: { item: i } });
          } else if (typeof result === "undefined") {
            // passthrough original item structure
            returnData.push({ ...item, pairedItem: { item: i } });
          } else {
            returnData.push({ json: { result }, pairedItem: { item: i } });
          }
        } catch (err) {
          if (this.continueOnFail()) {
            returnData.push({ json: { error: String(err) }, pairedItem: { item: i } });
            continue;
          }
          throw new NodeOperationError(this.getNode(), String(err));
        }
      }
    } else if (runMode === "perItem") {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        try {
          // Provide item and items into context
          (context as any).item = item.json;
          (context as any).items = items.map((x) => x.json);
          (context as any).index = i;

          const result = await Promise.resolve(
            vm.runInContext(wrappedMainCode, context, { timeout: timeoutMs })
          );

          if (Array.isArray(result)) {
            for (const r of result) {
              returnData.push({ json: r, pairedItem: { item: i } });
            }
          } else if (typeof result === "object" && result !== null) {
            returnData.push({ json: result, pairedItem: { item: i } });
          } else if (typeof result === "undefined") {
            // passthrough
            returnData.push({ json: item.json, pairedItem: { item: i } });
          } else {
            returnData.push({ json: { result }, pairedItem: { item: i } });
          }
        } catch (err) {
          if (this.continueOnFail()) {
            returnData.push({ json: { error: String(err) }, pairedItem: { item: i } });
            continue;
          }
          throw new NodeOperationError(this.getNode(), String(err));
        }
      }
    } else {
      // Run once
      try {
        (context as any).items = items.map((x) => x.json);
        const result = await Promise.resolve(
          vm.runInContext(wrappedMainCode, context, { timeout: timeoutMs })
        );
        if (Array.isArray(result)) {
          for (const r of result) returnData.push({ json: r });
        } else if (typeof result === "object" && result !== null) {
          returnData.push({ json: result });
        } else if (typeof result === "undefined") {
          // passthrough first item or empty
          if (items.length > 0) returnData.push({ json: items[0].json });
        } else {
          returnData.push({ json: { result } });
        }
      } catch (err) {
        if (this.continueOnFail()) {
          return [[{ json: { error: String(err) } }]];
        }
        throw new NodeOperationError(this.getNode(), String(err));
      }
    }

    return [returnData];
  }
}