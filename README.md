# Code Plus (n8n Community Node)

Run custom JavaScript with installable libraries and persistent cache.

## Features
- Install npm libraries from the node UI (comma-separated or JSON array)
- Cache libraries in a persistent directory for reuse
- Optional init code executed once before main code
- Execute per item or once for all items
- Timeout control and options to clear cache / force reinstall
- Uses a restricted VM with custom `require` bound to the cache

## Parameters
- `Libraries`: e.g. `nanoid@latest,lodash` or `["nanoid","dayjs@^1"]`
- `Init Code`: runs once before main code
- `Main Code`: JavaScript where `require()` loads from cached libraries
- `Run Mode`: `Per Item` or `Once`
- `Options`:
  - `Cache Directory`: custom path, defaults to `~/.n8n/code-plus-cache`
  - `Clear Cache Before Run`: delete `node_modules` before install
  - `Force Reinstall`: install even if present
  - `Timeout (ms)`: execution timeout
  - `Preinstall Only`: install requested libraries without executing code

## Example
Main Code:
```js
const { nanoid } = require('nanoid');
return { id: nanoid(), input: item };
```

## Notes & Limitations
- Requires network access and permission to run `npm install` from n8n server
- Libraries are installed into the cache directory only, not into n8n itself
- `require()` is restricted to the cache; Node built-ins can still be used via the sandbox
- Avoid long-running or blocking code; respect `Timeout (ms)`
- Use at your own risk in production; review security implications

## Build & Install
```bash
npm install
npm run build
# Link/install into your n8n instance per standard community node flow
```