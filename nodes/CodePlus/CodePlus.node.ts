import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
} from "n8n-workflow";

import { existsSync, mkdirSync, writeFileSync, rmSync, readFileSync } from "fs";
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

// Default main code used when the field is empty; also used for example replacement detection
const DEFAULT_MAIN_CODE = "return { id: require('nanoid').nanoid(), input: item };";

// Provide example snippets keyed by language and run mode
function getExampleSnippets(language: string, runMode: string): {
  libraries: string;
  initCode: string;
  code: string;
} {
  // JavaScript examples
  if (language === "javaScript") {
    switch (runMode) {
      case "runOnceForEachItem":
        return {
          libraries: "",
          initCode: "",
          code: "// JS — Each item\nreturn { ...item, json: { ...item.json, processed: true } };",
        };
      case "n8nCode":
        return {
          libraries: "",
          initCode: "",
          code: "// JS — n8n Code (compat)\nfor (let i = 0; i < items.length; i++) {\n  items[i].json.processed = true;\n}\nreturn items;",
        };
      case "runOnceForAllItems":
      default:
        return {
          libraries: "",
          initCode: "",
          code: "// JS — All items\nconst total = items.reduce((sum, x) => sum + (x.value || 0), 0);\nreturn { total };",
        };
    }
  }
  // Python examples (informational only; not executed here)
  switch (runMode) {
    case "runOnceForEachItem":
      return {
        libraries: "",
        initCode: "",
        code: "# Python — Each item\n# Not executed in Code Plus; example only.\nitem['processed'] = True\nreturn item",
      };
    case "n8nCode":
      return {
        libraries: "",
        initCode: "",
        code: "# Python — n8n Code (compat)\n# Not executed in Code Plus; example only.\nfor i in range(len(items)):\n    items[i]['json']['processed'] = True\nreturn items",
      };
    case "runOnceForAllItems":
    default:
      return {
        libraries: "",
        initCode: "",
        code: "# Python — All items\n# Not executed in Code Plus; example only.\n total = sum([x.get('value', 0) for x in items])\nreturn {'total': total}",
      };
  }
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
    parameterPane: "wide",
    properties: [
      {
        displayName: "Mode",
        name: "runMode",
        type: "options",
        noDataExpression: true,
        default: "runOnceForAllItems",
        options: [
          { name: "Run Once for All Items", value: "runOnceForAllItems", description: "Run this code only once, no matter how many input items there are" },
          { name: "Run Once for Each Item", value: "runOnceForEachItem", description: "Run this code as many times as there are input items" },
          { name: "n8n Code (compat)", value: "n8nCode", description: "Expose full items like the native Code node" },
        ],
        description: "Select how the code executes across input items.",
      },
      {
        displayName: "Language",
        name: "language",
        type: "options",
        noDataExpression: true,
        options: [
          { name: "JavaScript", value: "javaScript", action: "Code in JavaScript" },
          { name: "Python (Beta)", value: "python", action: "Code in Python (Beta)" },
          { name: "Python (Native) (Beta)", value: "pythonNative", action: "Code in Python (Native) (Beta)" },
        ],
        default: "javaScript",
      },
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
        displayName: "Cache TTL (minutes)",
        name: "cacheTtlMinutes",
        type: "number",
        default: 0,
        description: "Auto-clear installed libraries after this lifetime. Set 0 to disable.",
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
    const language = this.getNodeParameter("language", 0, "javaScript") as string;
    const librariesRawInput = this.getNodeParameter("libraries", 0, "") as string;
    const initCodeInput = this.getNodeParameter("initCode", 0, "") as string;
    const codeInput = this.getNodeParameter("code", 0) as string;
    const runMode = this.getNodeParameter("runMode", 0, "runOnceForAllItems") as string;
    const options = this.getNodeParameter("options", 0, {}) as Record<string, any>;

    const timeoutMs = Number(options.timeoutMs ?? 10000);
    const cacheDir = (options.cacheDir as string) || defaultCacheDir();
    const clearCache = Boolean(options.clearCache);
    const forceReinstall = Boolean(options.forceReinstall);
    const preinstallOnly = Boolean(options.preinstallOnly);
    const cacheTtlMinutes = Number(options.cacheTtlMinutes ?? 0);

    // Identify node for per-node meta tracking
    const wfId = this.getWorkflow().id;
    const nodeName = this.getNode().name;
    const nodeKey = `${wfId}:${nodeName}`;

    // Read previous Mode/Language from meta for change detection
    let prevMode: string | undefined;
    let prevLanguage: string | undefined;
    try {
      const metaFile = path.join(cacheDir, ".code-plus-meta.json");
      if (existsSync(metaFile)) {
        const metaRawNode = readFileSync(metaFile, "utf-8");
        const metaNode = JSON.parse(metaRawNode || "{}");
        const nodesMeta = (metaNode as any).nodes || {};
        const rec = nodesMeta[nodeKey];
        if (rec) {
          prevMode = rec.lastMode;
          prevLanguage = rec.lastLanguage;
        }
      }
    } catch {}

    const hasPrev = prevMode !== undefined || prevLanguage !== undefined;
    const modeOrLangChanged = hasPrev && (prevMode !== runMode || prevLanguage !== language);

    // Auto-fill examples into Libraries / Init Code / Main Code
    const examples = getExampleSnippets(language, runMode);
    let librariesRaw: string;
    let initCode: string;
    let code: string;
    if (modeOrLangChanged) {
      // Overwrite all three when Mode/Language changed since last run
      librariesRaw = examples.libraries;
      initCode = examples.initCode;
      code = examples.code;
    } else {
      // Otherwise, assist only when fields are blank/default
      librariesRaw = librariesRawInput?.trim().length ? librariesRawInput : examples.libraries;
      initCode = initCodeInput?.trim().length ? initCodeInput : examples.initCode;
      code = (!codeInput || !codeInput.trim().length || codeInput.trim() === DEFAULT_MAIN_CODE)
        ? examples.code
        : codeInput;
    }

    

    // Gate non-JS language for now (Python shown in UI but not executed here)
    if (language !== "javaScript") {
      const msg =
        language === "pythonNative"
          ? "Python (Native) ยังไม่รองรับใน Code Plus. โปรดใช้ Code node ของ n8n หรือเลือก JavaScript."
          : "Python ยังไม่รองรับใน Code Plus. โปรดใช้ Code node ของ n8n หรือเลือก JavaScript.";
      if (this.continueOnFail()) {
        return [[{ json: { error: msg, language } }]];
      }
      throw new NodeOperationError(this.getNode(), msg);
    }

    // Prepare cache project
    try {
      // TTL-based cache clearing
      if (!clearCache && cacheTtlMinutes > 0) {
        const nm = path.join(cacheDir, "node_modules");
        const metaFile = path.join(cacheDir, ".code-plus-meta.json");
        let lastInstallAt = 0;
        try {
          if (existsSync(metaFile)) {
            const metaRaw = readFileSync(metaFile, "utf-8");
            const meta = JSON.parse(metaRaw || "{}");
            lastInstallAt = Number(meta.lastInstallAt ?? 0);
          }
        } catch {}
        const ttlMs = cacheTtlMinutes * 60 * 1000;
        if (lastInstallAt > 0 && Date.now() - lastInstallAt > ttlMs) {
          if (existsSync(nm)) rmSync(nm, { recursive: true, force: true });
          // Inform UI in manual mode
          if (this.getMode() === "manual") {
            try {
              this.sendMessageToUI({ type: "info", message: `Cache TTL exceeded (${cacheTtlMinutes}m): cleared node_modules` });
            } catch {}
          }
        }
      }
      if (clearCache) {
        const nm = path.join(cacheDir, "node_modules");
        if (existsSync(nm)) rmSync(nm, { recursive: true, force: true });
      }
      ensureCacheProject(cacheDir);
      // Update per-node meta with latest Mode/Language for future change detection
      try {
        const metaFile = path.join(cacheDir, ".code-plus-meta.json");
        const prev = existsSync(metaFile) ? JSON.parse(readFileSync(metaFile, "utf-8") || "{}") : {};
        const nodesMeta = (prev as any).nodes || {};
        nodesMeta[nodeKey] = { lastMode: runMode, lastLanguage: language };
        const next = { ...prev, nodes: nodesMeta };
        writeFileSync(metaFile, JSON.stringify(next));
      } catch {}
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
        // Update cache meta with last install timestamp
        try {
          const metaFile = path.join(cacheDir, ".code-plus-meta.json");
          const prev = existsSync(metaFile) ? JSON.parse(readFileSync(metaFile, "utf-8") || "{}") : {};
          const next = { ...prev, lastInstallAt: Date.now() };
          writeFileSync(metaFile, JSON.stringify(next));
        } catch {}
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

    // Setup console forwarding similar to native Code node
    const workflowMode = this.getMode();
    const CODE_ENABLE_STDOUT = (process.env as any).CODE_ENABLE_STDOUT;

    const pref = `[Workflow "${wfId}"][Node "${nodeName}"]`;
    const forwardToUI = (method: string, args: any[]) => {
      try {
        // Send structured message to UI in manual mode
        this.sendMessageToUI({ type: "console", level: method, message: args.map((a) => String(a)).join(" ") });
      } catch {
        // Fallback: ignore
      }
    };
    const forwardToStdout = (method: string, args: any[]) => {
      const base = `${pref}`;
      switch (method) {
        case "log":
          console.log(base, ...args);
          break;
        case "info":
          console.info(base, ...args);
          break;
        case "warn":
          console.warn(base, ...args);
          break;
        case "error":
          console.error(base, ...args);
          break;
        default:
          console.log(base, ...args);
      }
    };
    const contextConsole = {
      log: (...args: any[]) =>
        workflowMode === "manual"
          ? forwardToUI("log", args)
          : CODE_ENABLE_STDOUT === "true"
          ? forwardToStdout("log", args)
          : undefined,
      info: (...args: any[]) =>
        workflowMode === "manual"
          ? forwardToUI("info", args)
          : CODE_ENABLE_STDOUT === "true"
          ? forwardToStdout("info", args)
          : undefined,
      warn: (...args: any[]) =>
        workflowMode === "manual"
          ? forwardToUI("warn", args)
          : CODE_ENABLE_STDOUT === "true"
          ? forwardToStdout("warn", args)
          : undefined,
      error: (...args: any[]) =>
        workflowMode === "manual"
          ? forwardToUI("error", args)
          : CODE_ENABLE_STDOUT === "true"
          ? forwardToStdout("error", args)
          : undefined,
    };

    // Provide $input helper similar to native Code node
    // - In compat mode, return full items (with `.json`), matching native Code node
    // - In other modes, return only JSON objects for convenience
    const inputHelper: any = {
      all: () => (runMode === "n8nCode" ? items : items.map((x) => x.json)),
      item: undefined,
    };

    // Setup VM context
    const context = vm.createContext({
      require: customRequire,
      console: contextConsole,
      Buffer,
      setTimeout,
      setInterval,
      clearTimeout,
      clearInterval,
      $input: inputHelper,
      helpers: this.helpers,
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
      // Compatibility mode: run once and expose full items like native Code node
      try {
        (context as any).items = items;
        (context as any).item = items[0];
        (context as any).index = 0;
        (context as any).$input.item = items[0];

        const result = await Promise.resolve(
          vm.runInContext(wrappedMainCode, context, { timeout: timeoutMs })
        );

        if (Array.isArray(result)) {
          for (const r of result) {
            if (r && typeof r === "object" && "json" in r) {
              returnData.push({ ...(r as any) });
            } else {
              returnData.push({ json: r as any });
            }
          }
        } else if (result && typeof result === "object" && "json" in (result as any)) {
          returnData.push({ ...(result as any) });
        } else if (typeof result === "object" && result !== null) {
          returnData.push({ json: result as any });
        } else if (typeof result === "undefined") {
          // passthrough original items
          for (const it of items) returnData.push({ ...it });
        } else {
          returnData.push({ json: { result } });
        }
      } catch (err) {
        if (this.continueOnFail()) {
          return [[{ json: { error: String(err) } }]];
        }
        throw new NodeOperationError(this.getNode(), String(err));
      }
      // Post-execution info in manual mode
      if (workflowMode === "manual") {
        this.sendMessageToUI({ type: "info", message: `Returned ${returnData.length} items (input ${items.length})` });
      }
    } else if (runMode === "runOnceForEachItem") {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        try {
          // Provide item and items into context
          (context as any).item = item.json;
          (context as any).items = items.map((x) => x.json);
          (context as any).index = i;
          (context as any).$input.item = item.json;

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
      if (workflowMode === "manual") {
        this.sendMessageToUI({ type: "info", message: `Returned ${returnData.length} items (input ${items.length})` });
      }
    } else if (runMode === "runOnceForAllItems") {
      // Run once
      try {
        (context as any).items = items.map((x) => x.json);
        (context as any).$input.item = items[0]?.json;
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
      if (workflowMode === "manual") {
        this.sendMessageToUI({ type: "info", message: `Returned ${returnData.length} items (input ${items.length})` });
      }
    } else {
      // Fallback to per-item behavior for unknown values
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        try {
          (context as any).item = item.json;
          (context as any).items = items.map((x) => x.json);
          (context as any).index = i;
          (context as any).$input.item = item.json;
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
    }

    return [returnData];
  }
}