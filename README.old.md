# Code Plus — n8n Community Node

Run custom JavaScript with installable npm libraries and a persistent cache.

![npm version](https://img.shields.io/npm/v/@warnyin/n8n-nodes-code-plus.svg)
![npm downloads](https://img.shields.io/npm/dm/@warnyin/n8n-nodes-code-plus.svg)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

Package: `@warnyin/n8n-nodes-code-plus`

## About
- Install npm libraries directly from the node UI (comma-separated or JSON array).
- Cache libraries in a persistent directory for reuse and faster runs.
- Optional Init Code that runs once before the main code.
- Mode: Run Once for Each Item, Run Once for All Items, or n8n Code (compat).
- Control Timeout, clear cache, and force reinstall.
- Executes in a restricted VM with a custom `require` bound to the cache.

Documentation structure is inspired by the author’s Swagger API node for n8n [reference][ref-swagger].

## Key Features
- On-the-fly npm dependency installation.
- Supports both comma-separated and JSON array input for libraries.
- Persistent cache directory (default `~/.n8n/code-plus-cache`).
- Select `Mode`: `Run Once for Each Item`, `Run Once for All Items`, or `n8n Code (compat)`.
 - Language selector: JavaScript (Python options shown but currently unsupported in this node).
- Safety and performance options: Timeout, Clear Cache, Force Reinstall, Preinstall Only.
- `require()` is scoped to the cache directory for controlled loading.

## Installation
### Option 1: Community Nodes (Recommended)
1) Open n8n and go to `Settings → Community Nodes`
2) Click `Install`
3) Enter: `@warnyin/n8n-nodes-code-plus`
4) Accept the risks and install

### Option 2: Manual Installation
```bash
cd ~/.n8n/nodes
npm install @warnyin/n8n-nodes-code-plus
# Restart n8n
```

### Option 3: Local Development & Linking
```bash
# Clone, install, and build
git clone https://github.com/warnyin/n8n-nodes-code-plus.git
cd n8n-nodes-code-plus
npm install
npm run build

# Link to n8n
npm link
cd ~/.n8n
npm link @warnyin/n8n-nodes-code-plus
# Restart n8n
```

## Usage
### Main Parameters
- `Language`: Select between `JavaScript`, `Python`, or `Python (Native)`. **Note**: Currently only JavaScript is fully supported for execution.
- `Libraries`: e.g. `nanoid@latest,lodash` or `["nanoid","dayjs@^1"]`
- `Init Code`: runs once before main code (language-specific field)
- `Main Code`: JavaScript or Python code where `require()` loads from the cache (language-specific field)
- **Important**: Fields automatically switch based on selected language using displayOptions:
  - JavaScript: Shows `Libraries`, `Init Code (JavaScript)`, and `JavaScript` fields
  - Python: Shows `Libraries`, `Init Code (Python)`, and `Python` fields
- `Mode`: `Run Once for Each Item`, `Run Once for All Items`, or `n8n Code (compat)`
- `Options`:
  - `Cache Directory` (default: `~/.n8n/code-plus-cache`)
  - `Clear Cache Before Run`
  - `Force Reinstall`
  - `Timeout (ms)`
  - `Cache TTL (minutes)`
  - `Preinstall Only`

### Quick Start
Simple `Main Code` to generate an ID:
```js
const { nanoid } = require('nanoid');
return { id: nanoid(), input: item };
```

### n8n Code (compat) examples
- Modify items in-place like the native Code node:
```js
// Mode: n8n Code (compat)
for (let i = 0; i < items.length; i++) {
  items[i].json.idx = i;
}
return items;
```

- Return a single item object with `json`:
```js
// Mode: n8n Code (compat)
return { json: { ok: true } };
```

## Detailed Parameters & Behavior (English)

### Language
- Options: `JavaScript` (supported), `Python (Beta)`, `Python (Native) (Beta)`.
- Current behavior: Only `JavaScript` executes in Code Plus. Selecting Python shows a friendly message and prevents execution.
- Roadmap: Python support via system `python` + `venv` and/or Pyodide.

### Mode
- `Run Once for Each Item`
  - Context: `item.json`, `items.map(x => x.json)`, `index`, `$input.item = item.json`.
  - Execution: Runs once per input item. Outputs are paired with inputs via `pairedItem`.
  - Returns: Array → multiple outputs for that item; Object → one output; `undefined` → passthrough current `item.json`.
  - Best for: map/transform per item.
- `Run Once for All Items`
  - Context: `items` is an array of all `json` payloads; `$input.item = items[0]?.json`.
  - Execution: Runs once for the whole batch.
  - Returns: Array → multiple outputs overall; Object → one output; `undefined` → passthrough first item’s `json` (if present).
  - Best for: aggregate/summary.
- `n8n Code (compat)`
  - Context: full `item` and `items` objects (not only `json`), plus `index`, `$input.item = item`.
  - Execution: Iterates per item internally, like n8n’s native Code node.
  - Returns: Native Code node style (`return items`, `return { json: ... }`, `return [ ... ]`, `return` passthrough).
  - Best for: migration from the native Code node or when full item structure is required.

### Libraries
- Input formats: comma-separated (`nanoid@latest,lodash`) or JSON array (`["nanoid","dayjs@^1"]`).
- Installed into the node’s cache directory (default: `~/.n8n/code-plus-cache`).
- `Force Reinstall` reinstalls even if present; `Clear Cache Before Run` removes cache `node_modules` before installing.

### Init Code
- Runs once before main code in the same sandbox; supports top-level `await` and `return` (async wrapper).
- Use for preloading libraries, setting globals, warm-ups.

### Main Code
- JavaScript in a restricted VM with custom `require()` bound to the cache.
- Supports top-level `await`/`return`; `Timeout (ms)` applies to both init and main code.

### Options
- `Cache Directory`: Path for library cache (default `~/.n8n/code-plus-cache`).
- `Clear Cache Before Run`: Remove cached modules before reinstalling.
- `Force Reinstall`: Reinstall libraries regardless of presence.
- `Timeout (ms)`: Max execution time for init/main code.
- `Cache TTL (minutes)`: Automatically clears installed libraries when the last install time exceeds this TTL. Set `0` to disable. Useful to keep memory fresh by re-installing daily or after fixed periods.
- `Preinstall Only`: Install libraries and return a summary without running code.

### Execution Context
- `console`: Forwarded to the UI in manual mode; to stdout in execute mode when `CODE_ENABLE_STDOUT="true"`.
- `$input` helper:
  - `all()` returns all `json` payloads.
  - `item` is set per mode (`item.json` for per-item/once; full `item` in compat mode).
- `require()`: Scoped to the cache directory for controlled loading of npm packages.
- Built-ins: `Buffer`, `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`.
- `helpers`: Exposes n8n helpers via `helpers` in the sandbox.

### Error Handling
- Throws `NodeOperationError` on failures; with `Continue On Fail`, returns an error item instead of halting.
- Library installation failures include detailed stdout/stderr in the `detail` field.

### Environment Variables
- `CODE_ENABLE_STDOUT`: When set to `"true"`, forwards console output to stdout in execute mode (non-manual). Otherwise, console output appears in the UI only during manual runs.

### Examples by Mode
- Per-item transform:
```js
return { ...item, json: { ...item.json, idx: index } };
```
- Aggregate once:
```js
const sum = items.reduce((acc, x) => acc + (x.value || 0), 0);
return { total: sum };
```
- Compat passthrough with in-place edit:
```js
items[index].json.tag = 'processed';
return items;
```

## Examples
- Generate IDs for each item using `nanoid`:
```js
const { nanoid } = require('nanoid');
return items.map((item) => ({ ...item, id: nanoid() }));
```

- Use `lodash` to chunk data:
```js
const _ = require('lodash');
const chunks = _.chunk(items, 50);
return { chunksCount: chunks.length };
```

- Run once and stamp a timestamp via `dayjs`:
```js
const dayjs = require('dayjs');
return { generatedAt: dayjs().toISOString() };
```

## Notes & Limitations
- Requires network access and permission to run `npm install` on the n8n server.
- Libraries are installed into the cache directory only, not into n8n itself.
- `require()` is restricted to the cache; Node built-ins are accessible via the sandbox.
- Avoid long-running or blocking code; configure `Timeout (ms)` appropriately.
- Version `0.1.1` adjusted the build output so n8n loads from `dist/nodes/CodePlus/CodePlus.node.js`.
- Python execution (`python` / `pythonNative`) is not supported in Code Plus; use the native Code node in n8n for Python.

---

Made with ❤️ for the n8n community

## Roadmap
- Recent
  - 0.1.7 shipped: Cache TTL (minutes) — auto-prunes cached `node_modules` after a configurable lifetime and reinstalls on the next run.

- Near-term (0.1.x)
  - Add UI toggle for stdout (replace `CODE_ENABLE_STDOUT` env var).
  - Expand `$input` and console forwarding docs with examples/screenshots.
  - Review default `Mode` to align with the native Code node.
  - Concurrency control for `Run Once for Each Item`.
  - Internationalized error messages (English/Thai) with structured details.

- Python Support
  - Execute Python via `venv + pip` with per-node cache.
  - Cross-platform handling (Windows/Linux/macOS) and compiled wheels.
  - Safety: timeouts, memory limits, sanitized imports.
  - `Python (Native)` via Pyodide as a fallback when system Python is unavailable.
  - Language-aware editor (syntax highlight/linting for Python).

- Execution & Security
  - Require allowlist/denylist.
  - Offline mode and dependency whitelist scanning; integrity checks via lockfile.
  - Resource limits (CPU/Memory) and configurable concurrency.
  - Harden sandbox and restrict accessible globals.

- Features & Compatibility
  - Multiple outputs and binary data support.
  - Expand `$input` (e.g., `first`, `pairedItem`) to parity with the native Code node.
  - UI list of installed libraries with upgrade/remove actions.
  - Proxy and custom registry support for installations.

- UX & Developer Experience
  - Template/snippet library in the editor.
  - Autocomplete for `require()` from installed libraries.
  - Debug mode with step logging and timing.
  - CLI for preinstall/prune cache operations.
  - Unit/integration tests and full example workflows.

- Docs & Community
  - Migration guide from the native Code node.
  - API reference for helpers and `$input`.
  - Contribution guide, code style, issue templates.
  - Security policy and responsible disclosure.

- Monitoring
  - Opt-in telemetry and anonymized usage metrics.
  - Log viewer UI with filters and export.

- Performance
  - Cache warm-up strategies and TTL tuning.
  - Prebundle frequently used libraries to reduce cold starts.

## Development
```bash
npm install
npm run build
# Use npm link as shown above to connect with n8n
```

## Changelog
- See `CHANGELOG.md` for release notes.

## License
- MIT License — see `LICENSE.md`.

## References
- [0] @warnyin/n8n-nodes-swagger-api — README structure and sections [ref-swagger]

[ref-swagger]: https://www.npmjs.com/package/@warnyin/n8n-nodes-swagger-api#-warnyinn8n-nodes-swagger-api