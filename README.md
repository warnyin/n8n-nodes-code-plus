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
- `Libraries`: e.g. `nanoid@latest,lodash` or `["nanoid","dayjs@^1"]`
- `Init Code`: runs once before main code
- `Main Code`: JavaScript where `require()` loads from the cache
- `Mode`: `Run Once for Each Item`, `Run Once for All Items`, or `n8n Code (compat)`
 - `Language`: `JavaScript` (Python options are visible but not supported in Code Plus)
- `Options`:
  - `Cache Directory` (default: `~/.n8n/code-plus-cache`)
  - `Clear Cache Before Run`
  - `Force Reinstall`
  - `Timeout (ms)`
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

## Roadmap
- Near-term (0.1.x)
  - Publish `0.1.6` to npm พร้อมรายละเอียด Language selector
  - เพิ่มตัวเลือกใน UI เพื่อเปิด/ปิด stdout (แทน `CODE_ENABLE_STDOUT` env var)
  - ขยายเอกสาร `$input` และ console forwarding พร้อมตัวอย่าง/ภาพหน้าจอ
  - ทบทวนค่า Default ของ `Mode` ให้สอดคล้องกับ Code node
  - เพิ่ม Concurrency control สำหรับโหมด `Run Once for Each Item`
  - ปรับปรุงข้อความ error ให้เป็น i18n (ไทย/อังกฤษ) และมีรายละเอียดเชิงโครงสร้าง

- Python Support
  - รองรับการรัน Python ผ่าน `venv + pip` และ cache ต่อ node
  - จัดการ cross-platform (Windows/Linux/macOS) และแพ็กเกจที่เป็น compiled wheels
  - เพิ่ม safe execution (timeouts, memory limit) และ sanitize imports
  - โหมด `Python (Native)` ด้วย Pyodide เป็นทางเลือกเมื่อไม่มี system Python
  - เพิ่ม editor ที่รู้ภาษา: syntax highlight/linting สำหรับ Python

- Execution & Security
  - เพิ่ม allowlist/denylist ให้กับ `require()`
  - โหมด offline และสแกน dependency whitelist; ตรวจสอบ integrity ด้วย lockfile
  - จำกัดทรัพยากร (CPU/Memory) และปรับ concurrency ได้
  - เสริม sandbox และจำกัด globals ที่เข้าถึงได้

- Features & Compatibility
  - รองรับ multiple outputs และ binary data
  - ขยาย `$input` (เช่น `first`, `pairedItem`) ให้ parity กับ Code node
  - แสดงรายชื่อและเวอร์ชันของไลบรารีที่ติดตั้งใน UI; เพิ่มปุ่ม upgrade/remove
  - รองรับ proxy และ custom registry สำหรับการติดตั้ง

- UX & Developer Experience
  - เพิ่ม template/snippet library ใน editor
  - Auto-complete สำหรับ `require()` จากไลบรารีที่ติดตั้ง
  - โหมด debug พร้อม step logging และ timing
  - CLI สำหรับ preinstall/prune cache
  - เพิ่ม unit/integration tests และ example workflows แบบครบชุด

- Docs & Community
  - คู่มือ migration จาก Code node
  - API reference สำหรับ helpers และ `$input`
  - Contribution guide, code style, issue templates
  - Security policy และ responsible disclosure

- Monitoring
  - Telemetry แบบ opt-in และ anonymized usage metrics
  - Log viewer UI พร้อมตัวกรองและ export

- Performance
  - กลยุทธ์ cache warm-up และ TTL
  - Prebundle ไลบรารีที่ใช้บ่อยเพื่อลด cold-start

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