# n8n-nodes-code-plus# Code Plus — n8n Community Node# Code Plus — n8n Community Node



This is an n8n community node that runs custom JavaScript with **installable npm libraries** and persistent cache.



[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.🚀 **Supercharge your n8n workflows** with custom JavaScript code and **any npm library** you need.Run custom JavaScript with installable npm libraries and a persistent cache.



[![npm version](https://img.shields.io/npm/v/@warnyin/n8n-nodes-code-plus?logo=npm)](https://www.npmjs.com/package/@warnyin/n8n-nodes-code-plus)

[![npm downloads](https://img.shields.io/npm/dt/@warnyin/n8n-nodes-code-plus?logo=npm)](https://www.npmjs.com/package/@warnyin/n8n-nodes-code-plus)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)![npm version](https://img.shields.io/npm/v/@warnyin/n8n-nodes-code-plus.svg)![npm version](https://img.shields.io/npm/v/@warnyin/n8n-nodes-code-plus.svg)



## Why Code Plus?![npm downloads](https://img.shields.io/npm/dm/@warnyin/n8n-nodes-code-plus.svg)![npm downloads](https://img.shields.io/npm/dm/@warnyin/n8n-nodes-code-plus.svg)



The native n8n Code node is powerful, but **Code Plus adds npm library support**:![license](https://img.shields.io/badge/license-MIT-blue.svg)![license](https://img.shields.io/badge/license-MIT-blue.svg)



| Feature | Native Code | Code Plus |

|---------|-------------|-----------|

| Custom JavaScript | ✅ | ✅ |Package: `@warnyin/n8n-nodes-code-plus`Package: `@warnyin/n8n-nodes-code-plus`

| **Install npm libraries** | ❌ | ✅ |

| **Library caching** | ❌ | ✅ |

| **Init Code** | ❌ | ✅ |

| Multiple modes | ✅ | ✅ |## 🎯 Why Code Plus?## About



## Installation- Install npm libraries directly from the node UI (comma-separated or JSON array).



Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.The native n8n Code node is great, but **Code Plus takes it to the next level**:- Cache libraries in a persistent directory for reuse and faster runs.



### Community Node Installation- Optional Init Code that runs once before the main code.



1. Go to **Settings > Community Nodes**.| Feature | Native Code Node | **Code Plus** |- Mode: Run Once for Each Item, Run Once for All Items, or n8n Code (compat).

2. Select **Install**.

3. Enter `@warnyin/n8n-nodes-code-plus` in **Enter npm package name**.|---------|-----------------|---------------|- Control Timeout, clear cache, and force reinstall.

4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes and select **Install**.

| Custom JavaScript | ✅ | ✅ |- Executes in a restricted VM with a custom `require` bound to the cache.

After installing the node, you can use it like any other node. n8n displays the node in search results in the **Nodes** panel.

| Install npm libraries | ❌ | ✅ **Any package from npm** |

### Manual Installation

| Library caching | ❌ | ✅ **Persistent & fast** |Documentation structure is inspired by the author’s Swagger API node for n8n [reference][ref-swagger].

To install manually:

| Init Code (one-time setup) | ❌ | ✅ **Load once, use many times** |

```bash

npm install @warnyin/n8n-nodes-code-plus| Multiple execution modes | ✅ | ✅ **+ n8n Code compatibility** |## Key Features

```

| Auto field switching | ❌ | ✅ **By Language & Mode** |- On-the-fly npm dependency installation.

## Quick Start

- Supports both comma-separated and JSON array input for libraries.

**1. Add Code Plus node to your workflow**

### Perfect for:- Persistent cache directory (default `~/.n8n/code-plus-cache`).

**2. Install a library:**

```- 📦 Using powerful npm libraries (lodash, dayjs, nanoid, axios, etc.)- Select `Mode`: `Run Once for Each Item`, `Run Once for All Items`, or `n8n Code (compat)`.

Libraries: nanoid@latest

```- 🔄 Processing hundreds of items with shared resources - Language selector: JavaScript (Python options shown but currently unsupported in this node).



**3. Write your code:**- 🎨 Complex data transformations- Safety and performance options: Timeout, Clear Cache, Force Reinstall, Preinstall Only.

```javascript

const { nanoid } = require('nanoid');- 🔗 API integrations with custom libraries- `require()` is scoped to the cache directory for controlled loading.

return { id: nanoid(), data: item };

```- ⚡ Performance-critical workflows



**Done!** 🎉## Installation



## Parameters## ⚡ Quick Start### Option 1: Community Nodes (Recommended)



### Mode1) Open n8n and go to `Settings → Community Nodes`



Choose how your code executes across input items:**1. Install the node:**2) Click `Install`



#### Run Once for All Items```3) Enter: `@warnyin/n8n-nodes-code-plus`

Execute code **once** for the entire batch of items.

Settings → Community Nodes → Install → @warnyin/n8n-nodes-code-plus4) Accept the risks and install

**When to use:**

- Aggregate data (sum, count, average)```

- Generate reports or summaries

- Process all items together### Option 2: Manual Installation



**Available variables:****2. Add to your workflow and install a library:**```bash

- `items` — Array of JSON objects

- `item` — First item (for convenience)```cd ~/.n8n/nodes



**Example:**Libraries: nanoid@latestnpm install @warnyin/n8n-nodes-code-plus

```javascript

const _ = require('lodash');```# Restart n8n



return {```

  total: _.sumBy(items, 'amount'),

  count: items.length,**3. Write your code:**

  average: _.meanBy(items, 'amount')

};```javascript### Option 3: Local Development & Linking

```

const { nanoid } = require('nanoid');```bash

**Input:**

```jsonreturn { id: nanoid(), data: $input.item.json };# Clone, install, and build

[

  {"amount": 100},```git clone https://github.com/warnyin/n8n-nodes-code-plus.git

  {"amount": 200},

  {"amount": 50}cd n8n-nodes-code-plus

]

```**Done!** 🎉npm install



**Output:**npm run build

```json

[---

  {"total": 350, "count": 3, "average": 116.67}

]# Link to n8n

```

## 📚 Complete Guidenpm link

---

cd ~/.n8n

#### Run Once for Each Item

Execute code **separately for each input item**.### 🔧 Installationnpm link @warnyin/n8n-nodes-code-plus



**When to use:**# Restart n8n

- Transform/modify each item individually

- Add unique IDs per item#### Option 1: Community Nodes (Recommended)```

- Process items independently

1. Open n8n → `Settings` → `Community Nodes`

**Available variables:**

- `item` — Current item's JSON data2. Click `Install`## Usage

- `items` — All items (for reference)

- `index` — Current item index (0-based)3. Enter: `@warnyin/n8n-nodes-code-plus`### Main Parameters



**Example:**4. Accept the risks and click Install- `Language`: Select between `JavaScript`, `Python`, or `Python (Native)`. **Note**: Currently only JavaScript is fully supported for execution.

```javascript

const { nanoid } = require('nanoid');5. Restart n8n- `Libraries`: e.g. `nanoid@latest,lodash` or `["nanoid","dayjs@^1"]`



return {- `Init Code`: runs once before main code (language-specific field)

  id: nanoid(),

  index: index,#### Option 2: Manual Installation- `Main Code`: JavaScript or Python code where `require()` loads from the cache (language-specific field)

  ...item

};```bash- **Important**: Fields automatically switch based on selected language using displayOptions:

```

cd ~/.n8n/nodes  - JavaScript: Shows `Libraries`, `Init Code (JavaScript)`, and `JavaScript` fields

**Input:**

```jsonnpm install @warnyin/n8n-nodes-code-plus  - Python: Shows `Libraries`, `Init Code (Python)`, and `Python` fields

[

  {"name": "Alice"},# Restart n8n- `Mode`: `Run Once for Each Item`, `Run Once for All Items`, or `n8n Code (compat)`

  {"name": "Bob"}

]```- `Options`:

```

  - `Cache Directory` (default: `~/.n8n/code-plus-cache`)

**Output:**

```json#### Option 3: Local Development  - `Clear Cache Before Run`

[

  {"id": "V1StGXR8_", "index": 0, "name": "Alice"},```bash  - `Force Reinstall`

  {"id": "KYfwxwjl_", "index": 1, "name": "Bob"}

]git clone https://github.com/warnyin/n8n-nodes-code-plus.git  - `Timeout (ms)`

```

cd n8n-nodes-code-plus  - `Cache TTL (minutes)`

---

npm install  - `Preinstall Only`

#### n8n Code (compat)

**Compatibility mode** with the native n8n Code node.npm run build



**When to use:**npm link### Quick Start

- Migrating from native Code node

- Need full `items` structure (with `.json`, `.binary`)cd ~/.n8nSimple `Main Code` to generate an ID:



**Available variables:**npm link @warnyin/n8n-nodes-code-plus```js

- `items` — Full items array

- `item` — Current item object# Restart n8nconst { nanoid } = require('nanoid');

- `index` — Current index

```return { id: nanoid(), input: item };

**Example:**

```javascript```

// Modify items in-place

for (let i = 0; i < items.length; i++) {---

  items[i].json.processed = true;

  items[i].json.index = i;### n8n Code (compat) examples

}

## 🎮 Understanding Each Field- Modify items in-place like the native Code node:

return items;

``````js



---### 1️⃣ **Language** (Selector)// Mode: n8n Code (compat)



### Languagefor (let i = 0; i < items.length; i++) {



Select programming language. Currently **JavaScript is fully supported**.Select your programming language. Currently **JavaScript is fully supported**.  items[i].json.idx = i;



**Options:**}

- ✅ `JavaScript` — Fully functional

- 🚧 `Python (Beta)` — Coming soon**Options:**return items;

- 🚧 `Python (Native) (Beta)` — Coming soon

- ✅ `JavaScript` — Fully functional, runs with Node.js VM```

---

- 🚧 `Python (Beta)` — UI available, execution coming soon

### Libraries

- 🚧 `Python (Native) (Beta)` — UI available, execution coming soon- Return a single item object with `json`:

Install npm packages to use in your code. Packages are cached for fast reuse.

```js

**Format:**

**Note:** Python options are shown for future compatibility but currently display a friendly message without executing.// Mode: n8n Code (compat)

**Comma-separated:**

```return { json: { ok: true } };

nanoid@latest, lodash, dayjs@^1.11.0

```---```



**JSON array:**

```json

["nanoid", "lodash@4.17.21", "axios"]### 2️⃣ **Mode** (Execution Strategy)## Detailed Parameters & Behavior (English)

```



**Popular libraries:**

- `lodash` — Data manipulation utilitiesChoose **how your code runs** across input items. This is crucial for performance and logic!### Language

- `dayjs` — Date/time handling

- `nanoid` — Unique ID generation- Options: `JavaScript` (supported), `Python (Beta)`, `Python (Native) (Beta)`.

- `axios` — HTTP requests

- `uuid` — UUID generation#### 🔁 **Run Once for Each Item**- Current behavior: Only `JavaScript` executes in Code Plus. Selecting Python shows a friendly message and prevents execution.

- `validator` — String validation

- `cheerio` — HTML parsing- Roadmap: Python support via system `python` + `venv` and/or Pyodide.



**How it works:**Your code executes **separately for each input item**.

1. First run: Libraries install (takes a few seconds)

2. Subsequent runs: Use cached versions (instant!)### Mode

3. Cache location: `~/.n8n/code-plus-cache`

**When to use:**- `Run Once for Each Item`

---

- Transform/modify each item individually  - Context: `item.json`, `items.map(x => x.json)`, `index`, `$input.item = item.json`.

### Init Code

- Add unique IDs or timestamps per item  - Execution: Runs once per input item. Outputs are paired with inputs via `pairedItem`.

Code that runs **once before Main Code**, regardless of item count.

- Process items independently  - Returns: Array → multiple outputs for that item; Object → one output; `undefined` → passthrough current `item.json`.

**Why use Init Code?**

  - Best for: map/transform per item.

✅ **Performance** — Load libraries once, not per item (10-100x faster)  

✅ **Clean code** — Separate setup from business logic  **Available context:**- `Run Once for All Items`

✅ **Shared resources** — Database connections, API clients  

✅ **Helper functions** — Reusable utilities- `$input.item.json` — Current item's data  - Context: `items` is an array of all `json` payloads; `$input.item = items[0]?.json`.



**Example 1: Load Libraries Once**- `$input.all()` — All items (if needed for comparison)  - Execution: Runs once for the whole batch.



**Init Code:**- `item` — Alias for `$input.item.json`  - Returns: Array → multiple outputs overall; Object → one output; `undefined` → passthrough first item’s `json` (if present).

```javascript

const { nanoid } = require('nanoid');- `index` — Current item index (0-based)  - Best for: aggregate/summary.

const _ = require('lodash');

const dayjs = require('dayjs');- `n8n Code (compat)`

```

**Example:**  - Context: full `item` and `items` objects (not only `json`), plus `index`, `$input.item = item`.

**Main Code:**

```javascript```javascript  - Execution: Iterates per item internally, like n8n’s native Code node.

// No require() needed - much faster!

return {// Add a unique ID to each item  - Returns: Native Code node style (`return items`, `return { json: ... }`, `return [ ... ]`, `return` passthrough).

  id: nanoid(),

  timestamp: dayjs().format(),const { nanoid } = require('nanoid');  - Best for: migration from the native Code node or when full item structure is required.

  name: _.upperCase(item.name)

};

```

return {### Libraries

**Example 2: Helper Functions**

  id: nanoid(),- Input formats: comma-separated (`nanoid@latest,lodash`) or JSON array (`["nanoid","dayjs@^1"]`).

**Init Code:**

```javascript  index: index,- Installed into the node’s cache directory (default: `~/.n8n/code-plus-cache`).

function validateEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);  data: $input.item.json- `Force Reinstall` reinstalls even if present; `Clear Cache Before Run` removes cache `node_modules` before installing.

}

};

function formatPhone(phone) {

  return phone.replace(/\D/g, '').slice(0, 10);```### Init Code

}

```- Runs once before main code in the same sandbox; supports top-level `await` and `return` (async wrapper).



**Main Code:****Input:**- Use for preloading libraries, setting globals, warm-ups.

```javascript

return {```json

  ...item,

  emailValid: validateEmail(item.email),[### Main Code

  phone: formatPhone(item.phone)

};  { "name": "Alice" },- JavaScript in a restricted VM with custom `require()` bound to the cache.

```

  { "name": "Bob" }- Supports top-level `await`/`return`; `Timeout (ms)` applies to both init and main code.

**Example 3: API Client Setup**

]

**Init Code:**

```javascript```### Options

const axios = require('axios');

- `Cache Directory`: Path for library cache (default `~/.n8n/code-plus-cache`).

const api = axios.create({

  baseURL: 'https://api.example.com',**Output:**- `Clear Cache Before Run`: Remove cached modules before reinstalling.

  timeout: 5000,

  headers: { 'Authorization': 'Bearer YOUR_TOKEN' }```json- `Force Reinstall`: Reinstall libraries regardless of presence.

});

```[- `Timeout (ms)`: Max execution time for init/main code.



**Main Code:**  { "id": "V1StGXR8_", "index": 0, "data": { "name": "Alice" } },- `Cache TTL (minutes)`: Automatically clears installed libraries when the last install time exceeds this TTL. Set `0` to disable. Useful to keep memory fresh by re-installing daily or after fixed periods.

```javascript

const response = await api.get(`/users/${item.userId}`);  { "id": "KYfwxwjl_", "index": 1, "data": { "name": "Bob" } }- `Preinstall Only`: Install libraries and return a summary without running code.

return { userId: item.userId, userData: response.data };

```]



---```### Execution Context



### Main Code- `console`: Forwarded to the UI in manual mode; to stdout in execute mode when `CODE_ENABLE_STDOUT="true"`.



Your main processing logic. Code executes based on selected Mode.---- `$input` helper:



**Supports:**  - `all()` returns all `json` payloads.

- ✅ Top-level `await` (async/await)

- ✅ Top-level `return`#### 🎯 **Run Once for All Items**  - `item` is set per mode (`item.json` for per-item/once; full `item` in compat mode).

- ✅ All libraries from Init Code

- ✅ Built-in Node.js modules- `require()`: Scoped to the cache directory for controlled loading of npm packages.



**Return behavior:**Your code executes **once for the entire batch** of items.- Built-ins: `Buffer`, `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`.



**Run Once for All Items:**- `helpers`: Exposes n8n helpers via `helpers` in the sandbox.

```javascript

// Return object → Single output**When to use:**

return { summary: 'complete' };

- Aggregate data (sum, average, count)### Error Handling

// Return array → Multiple outputs

return items.map(item => ({ ...item, processed: true }));- Generate reports or summaries- Throws `NodeOperationError` on failures; with `Continue On Fail`, returns an error item instead of halting.

```

- Process all items together- Library installation failures include detailed stdout/stderr in the `detail` field.

**Run Once for Each Item:**

```javascript

// Return object → Single output per item

return { result: 'success' };**Available context:**### Environment Variables



// Return array → Multiple outputs per item- `items` — Array of all items' JSON data- `CODE_ENABLE_STDOUT`: When set to `"true"`, forwards console output to stdout in execute mode (non-manual). Otherwise, console output appears in the UI only during manual runs.

return [{ item: 1 }, { item: 2 }];

- `$input.all()` — Same as `items`

// Return undefined → Passthrough original

return;- `$input.item` — First item (for convenience)### Examples by Mode

```

- Per-item transform:

---

**Example:**```js

### Options

```javascriptreturn { ...item, json: { ...item.json, idx: index } };

Advanced settings for caching, timeout, and installation control.

// Calculate statistics for all items```

#### Cache Directory

Custom path for library cache.const _ = require('lodash');- Aggregate once:



**Default:** `~/.n8n/code-plus-cache`  ```js

**Example:** `/opt/n8n/custom-cache`

const total = _.sumBy(items, 'amount');const sum = items.reduce((acc, x) => acc + (x.value || 0), 0);

---

const average = _.meanBy(items, 'amount');return { total: sum };

#### Clear Cache Before Run

Delete all cached libraries before installing.const count = items.length;```



**Default:** `false`  - Compat passthrough with in-place edit:

**Use when:** Need fresh install, troubleshooting

return {```js

---

  summary: {items[index].json.tag = 'processed';

#### Force Reinstall

Reinstall libraries even if cached.    total,return items;



**Default:** `false`      average,```

**Use when:** Update to latest version

    count,

---

    timestamp: new Date().toISOString()## Examples

#### Timeout (ms)

Maximum execution time for Init Code + Main Code.  }- Generate IDs for each item using `nanoid`:



**Default:** `10000` (10 seconds)  };```js

**Range:** `100` - `300000` (5 minutes)

```const { nanoid } = require('nanoid');

---

return items.map((item) => ({ ...item, id: nanoid() }));

#### Cache TTL (minutes)

Automatically clear cached libraries after specified time.**Input:**```



**Default:** `0` (disabled)  ```json

**Example:** `1440` (24 hours)

[- Use `lodash` to chunk data:

**Use cases:**

```  { "amount": 100 },```js

1440  → Daily refresh

10080 → Weekly refresh  { "amount": 200 },const _ = require('lodash');

0     → Never clear (max performance)

```  { "amount": 50 }const chunks = _.chunk(items, 50);



---]return { chunksCount: chunks.length };



#### Preinstall Only``````

Install libraries without running code.



**Default:** `false`

**Output:**- Run once and stamp a timestamp via `dayjs`:

**Use when:**

- Warming up cache```json```js

- Testing installations

- Preparing for offline execution[const dayjs = require('dayjs');



**Returns:**  {return { generatedAt: dayjs().toISOString() };

```json

{    "summary": {```

  "status": "preinstalled",

  "libraries": ["lodash", "dayjs", "nanoid"]      "total": 350,

}

```      "average": 116.67,## Notes & Limitations



---      "count": 3,- Requires network access and permission to run `npm install` on the n8n server.



## Examples      "timestamp": "2025-11-05T10:30:00.000Z"- Libraries are installed into the cache directory only, not into n8n itself.



### Generate Unique IDs    }- `require()` is restricted to the cache; Node built-ins are accessible via the sandbox.



**Settings:**  }- Avoid long-running or blocking code; configure `Timeout (ms)` appropriately.

```

Mode: Run Once for Each Item]- Version `0.1.1` adjusted the build output so n8n loads from `dist/nodes/CodePlus/CodePlus.node.js`.

Libraries: nanoid

``````- Python execution (`python` / `pythonNative`) is not supported in Code Plus; use the native Code node in n8n for Python.



**Main Code:**

```javascript

const { nanoid } = require('nanoid');------



return {

  id: nanoid(),

  customerId: nanoid(10),#### 🔄 **n8n Code (compat)**Made with ❤️ for the n8n community

  ...item

};

```

**Compatibility mode** with the native n8n Code node. Use this when migrating from the native Code node.## Roadmap

---

- Recent

### Data Validation

**When to use:**  - 0.1.7 shipped: Cache TTL (minutes) — auto-prunes cached `node_modules` after a configurable lifetime and reinstalls on the next run.

**Settings:**

```- Migrating existing workflows from native Code node

Mode: Run Once for Each Item

Libraries: validator, lodash- Need full `items` structure (with `.json`, `.binary`, etc.)- Near-term (0.1.x)

```

- Want native Code node behavior  - Add UI toggle for stdout (replace `CODE_ENABLE_STDOUT` env var).

**Init Code:**

```javascript  - Expand `$input` and console forwarding docs with examples/screenshots.

const validator = require('validator');

const _ = require('lodash');**Available context:**  - Review default `Mode` to align with the native Code node.



function formatPhone(phone) {- `items` — Full items array (not just JSON)  - Concurrency control for `Run Once for Each Item`.

  return phone.replace(/\D/g, '').slice(0, 10);

}- `item` — Current item object  - Internationalized error messages (English/Thai) with structured details.

```

- `index` — Current index

**Main Code:**

```javascript- Python Support

return {

  ...item,**Example:**  - Execute Python via `venv + pip` with per-node cache.

  emailValid: validator.isEmail(item.email),

  phoneFormatted: formatPhone(item.phone),```javascript  - Cross-platform handling (Windows/Linux/macOS) and compiled wheels.

  urlValid: validator.isURL(item.website || '')

};// Modify items in-place (native Code node style)  - Safety: timeouts, memory limits, sanitized imports.

```

for (let i = 0; i < items.length; i++) {  - `Python (Native)` via Pyodide as a fallback when system Python is unavailable.

---

  items[i].json.processed = true;  - Language-aware editor (syntax highlight/linting for Python).

### Generate Report

  items[i].json.position = i + 1;

**Settings:**

```}- Execution & Security

Mode: Run Once for All Items

Libraries: dayjs, lodash  - Require allowlist/denylist.

```

return items;  - Offline mode and dependency whitelist scanning; integrity checks via lockfile.

**Main Code:**

```javascript```  - Resource limits (CPU/Memory) and configurable concurrency.

const dayjs = require('dayjs');

const _ = require('lodash');  - Harden sandbox and restrict accessible globals.



return {**Or return a new single item:**

  reportId: `RPT-${dayjs().format('YYYYMMDD-HHmmss')}`,

  generatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),```javascript- Features & Compatibility

  itemCount: items.length,

  totalAmount: _.sumBy(items, 'amount'),return { json: { message: "All items processed", count: items.length } };  - Multiple outputs and binary data support.

  averageAmount: _.meanBy(items, 'amount')

};```  - Expand `$input` (e.g., `first`, `pairedItem`) to parity with the native Code node.

```

  - UI list of installed libraries with upgrade/remove actions.

---

---  - Proxy and custom registry support for installations.

### API Integration



**Settings:**

```### 3️⃣ **Libraries** (npm Packages)- UX & Developer Experience

Mode: Run Once for Each Item

Libraries: axios  - Template/snippet library in the editor.

Timeout: 10000

```Install any npm package you need! Packages are cached for fast reuse.  - Autocomplete for `require()` from installed libraries.



**Init Code:**  - Debug mode with step logging and timing.

```javascript

const axios = require('axios');**Format options:**  - CLI for preinstall/prune cache operations.



const api = axios.create({  - Unit/integration tests and full example workflows.

  baseURL: 'https://api.github.com',

  timeout: 8000,**Comma-separated:**

  headers: { 'Accept': 'application/vnd.github.v3+json' }

});```- Docs & Community

```

nanoid@latest, lodash, dayjs@^1.11.0  - Migration guide from the native Code node.

**Main Code:**

```javascript```  - API reference for helpers and `$input`.

try {

  const response = await api.get(`/users/${item.username}`);  - Contribution guide, code style, issue templates.

  return {

    username: item.username,**JSON array:**  - Security policy and responsible disclosure.

    profile: {

      name: response.data.name,```json

      bio: response.data.bio,

      repos: response.data.public_repos["nanoid", "lodash@4.17.21", "axios"]- Monitoring

    },

    status: 'success'```  - Opt-in telemetry and anonymized usage metrics.

  };

} catch (error) {  - Log viewer UI with filters and export.

  return {

    username: item.username,**Common useful libraries:**

    error: error.message,

    status: 'failed'- `lodash` — Powerful data manipulation utilities- Performance

  };

}- `dayjs` — Date/time handling  - Cache warm-up strategies and TTL tuning.

```

- `nanoid` — Unique ID generation  - Prebundle frequently used libraries to reduce cold starts.

---

- `axios` — HTTP requests

## Available Context

- `uuid` — UUID generation## Development

### Built-in Variables

- `crypto-js` — Encryption/hashing```bash

**All modes:**

- `items` — Items array (structure depends on mode)- `validator` — String validationnpm install

- `item` — Current item

- `index` — Current item index (Run Once for Each Item only)- `cheerio` — HTML parsing (like jQuery)npm run build



### Console Methods# Use npm link as shown above to connect with n8n



Output appears in n8n UI during manual execution:**Example with multiple libraries:**```



```javascript```javascript

console.log('Processing item:', index);

console.info('Status:', 'success');// Libraries: lodash, dayjs, nanoid## Changelog

console.warn('Low stock:', item.quantity);

console.error('Failed to process:', item.id);- See `CHANGELOG.md` for release notes.

```

const _ = require('lodash');

Set `CODE_ENABLE_STDOUT=true` environment variable for production logging.

const dayjs = require('dayjs');## License

### `require()` Function

const { nanoid } = require('nanoid');- MIT License — see `LICENSE.md`.

Load npm packages from cache:



```javascript

// Installed librariesconst grouped = _.groupBy($input.all(), 'category');## References

const _ = require('lodash');

const dayjs = require('dayjs');- [0] @warnyin/n8n-nodes-swagger-api — README structure and sections [ref-swagger]

const { nanoid } = require('nanoid');

return {

// Node.js built-ins (no installation needed)

const crypto = require('crypto');  id: nanoid(),[ref-swagger]: https://www.npmjs.com/package/@warnyin/n8n-nodes-swagger-api#-warnyinn8n-nodes-swagger-api

const path = require('path');  timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),

const fs = require('fs');  categories: Object.keys(grouped),

```  totalItems: $input.all().length

};

### `helpers` Object```



Access n8n helpers:**How it works:**

1. Libraries are installed to `~/.n8n/code-plus-cache`

```javascript2. First run installs (takes a few seconds)

const response = await helpers.httpRequest({3. Subsequent runs use cached versions (instant!)

  method: 'GET',4. Cache persists across workflow executions

  url: 'https://api.example.com/data'

});---

```

### 4️⃣ **Init Code** (One-Time Setup)

---

Code that runs **once before Main Code**, regardless of how many items you process.

## Performance Tips

**Why use Init Code?**

### 1. Use Init Code for Setup

✅ **Performance:** Load libraries once, not per item  

❌ **Slow:**✅ **Clean code:** Separate setup from business logic  

```javascript✅ **Shared resources:** Database connections, API clients  

// Main Code - loads 100 times for 100 items✅ **Helper functions:** Reusable utilities

const _ = require('lodash');

return _.upperCase(item.name);#### Example 1: Load Libraries Once

```

**Init Code:**

✅ **Fast:**```javascript

```javascriptconst { nanoid } = require('nanoid');

// Init Code - loads onceconst _ = require('lodash');

const _ = require('lodash');const dayjs = require('dayjs');



// Main Code - 100x faster// These are now available in Main Code

return _.upperCase(item.name);```

```

**Main Code:**

### 2. Specify Library Versions```javascript

// No need to require() again - much faster!

✅ **Recommended:**return {

```  id: nanoid(),

lodash@4.17.21, dayjs@1.11.10  timestamp: dayjs().format(),

```  name: _.upperCase($input.item.json.name)

};

❌ **Unpredictable:**```

```

lodash@latest, dayjs@latest#### Example 2: Create Helper Functions

```

**Init Code:**

### 3. Use Cache TTL Wisely```javascript

// Create reusable functions

```function validateEmail(email) {

0     → Maximum speed (never reinstall)  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

1440  → Daily updates (balanced)}

10080 → Weekly updates (stable deps)

```function formatPhone(phone) {

  return phone.replace(/\D/g, '').slice(0, 10);

---}



## Migration from Native Code Nodefunction sanitizeString(str) {

  return str.trim().toLowerCase();

### Key Differences}

```

| Native Code | Code Plus |

|-------------|-----------|**Main Code:**

| No `require()` | ✅ `require('any-package')` |```javascript

| No Init Code | ✅ Separate Init + Main |const item = $input.item.json;

| Single mode | ✅ 3 execution modes |

return {

### Migration Steps  ...item,

  email: sanitizeString(item.email),

1. Copy code from native Code node  emailValid: validateEmail(item.email),

2. Add required libraries to Libraries field  phone: formatPhone(item.phone)

3. Add `require()` statements};

4. Test thoroughly```



**Example:**#### Example 3: Load Reference Data Once



**Before (Native):****Init Code:**

```javascript```javascript

const ids = items.map((item, i) => ({const fs = require('fs');

  ...item.json,

  id: `${Date.now()}-${i}`// Load lookup tables once

}));const countryMap = {

return ids.map(json => ({ json }));  'US': 'United States',

```  'UK': 'United Kingdom',

  'TH': 'Thailand',

**After (Code Plus):**  'JP': 'Japan'

```javascript};

// Libraries: nanoid

const { nanoid } = require('nanoid');const currencyRates = {

  'USD': 1,

return items.map(item => ({  'EUR': 0.92,

  ...item,  'GBP': 0.79,

  id: nanoid()  'THB': 35.50

}));};

```

// Cache for repeated lookups

---const cache = new Map();

```

## Troubleshooting

**Main Code:**

### "Library not found"```javascript

**Solution:** Check package name on npmjs.com, try Force Reinstallconst item = $input.item.json;



### "Timeout exceeded"return {

**Solution:** Increase timeout in Options or optimize code  ...item,

  countryName: countryMap[item.countryCode] || 'Unknown',

### "Cannot set properties of undefined"  priceUSD: item.price * currencyRates[item.currency]

**Solution:** Check variable names (`items`, `item`, not `$input`)};

```

### "Cache directory not writable"

**Solution:** Check permissions or use custom Cache Directory#### Example 4: API Client Setup



---**Init Code:**

```javascript

## Featuresconst axios = require('axios');



- **npm Library Support** — Install any npm package// Create configured API client once

- **Persistent Caching** — Fast library reuse across executionsconst apiClient = axios.create({

- **Init Code** — One-time setup for performance  baseURL: 'https://api.example.com',

- **Multiple Modes** — Choose execution strategy  timeout: 5000,

- **Auto Field Switching** — Fields change by Language & Mode  headers: {

- **VM Sandbox** — Secure code execution    'Authorization': 'Bearer YOUR_TOKEN',

- **Error Handling** — Continue on fail support    'Content-Type': 'application/json'

- **Console Output** — Debug with console.log()  }

});

---```



## Use Cases**Main Code:**

```javascript

- **Custom Data Processing** — Complex transformations with lodash// Use the pre-configured client

- **ID Generation** — Unique IDs with nanoid/uuidconst userId = $input.item.json.userId;

- **Date/Time Operations** — Format dates with dayjs/momentconst response = await apiClient.get(`/users/${userId}`);

- **API Integration** — HTTP requests with axios

- **Data Validation** — Validate with validator/joireturn {

- **Text Processing** — Parse HTML with cheerio  userId,

- **Cryptography** — Hash/encrypt with crypto-js  userData: response.data

- **Performance** — Share resources across items};

```

---

#### Example 5: Global State Tracking

## Compatibility

**Init Code:**

- Requires n8n version 0.187.0 or higher```javascript

- Node.js 16+ recommendedconst crypto = require('crypto');

- npm must be installed on server

// Generate unique workflow run ID

---const runId = crypto.randomBytes(8).toString('hex');

const startTime = Date.now();

## Resourceslet processedCount = 0;

let errorCount = 0;

- **npm Package:** [@warnyin/n8n-nodes-code-plus](https://www.npmjs.com/package/@warnyin/n8n-nodes-code-plus)```

- **GitHub:** [warnyin/n8n-nodes-code-plus](https://github.com/warnyin/n8n-nodes-code-plus)

- **Changelog:** [CHANGELOG.md](CHANGELOG.md)**Main Code:**

- **n8n Community:** [community.n8n.io](https://community.n8n.io)```javascript

- **n8n Documentation:** [docs.n8n.io](https://docs.n8n.io)processedCount++;



---try {

  // Your processing logic

## Version History  const result = someProcessing($input.item.json);

  

- **0.1.15** — Fixed default code errors + editor popup sizing  return {

- **0.1.14** — Mode-based field switching + complete README    runId,

- **0.1.13** — Language-based field separation with displayOptions    itemNumber: processedCount,

- **0.1.12** — Dynamic default examples    elapsedMs: Date.now() - startTime,

- **0.1.7** — Cache TTL support    data: result

  };

See [CHANGELOG.md](CHANGELOG.md) for full history.} catch (error) {

  errorCount++;

---  throw error;

}

## License```



[MIT](LICENSE.md)**Key Benefits:**

- 🚀 **10-100x faster** for multi-item processing

---- 🧹 **Cleaner main code** without setup clutter

- 💾 **Resource pooling** (connections, caches)

**Made with ❤️ for the n8n community**- 🔧 **Better organization** (setup vs. logic)


---

### 5️⃣ **Main Code** (Your Business Logic)

This is where your main processing happens. Code executes based on the selected Mode.

**Supports:**
- ✅ Top-level `await` (async/await)
- ✅ Top-level `return`
- ✅ All libraries from Init Code
- ✅ Built-in Node.js modules
- ✅ n8n helpers via `helpers` object

#### Return Value Behavior:

**For "Run Once for Each Item":**
```javascript
// Return object → Single output item
return { result: 'success' };

// Return array → Multiple output items
return [
  { item: 1 },
  { item: 2 }
];

// Return undefined → Passthrough original item
return;
```

**For "Run Once for All Items":**
```javascript
// Return object → Single output
return { summary: 'complete' };

// Return array → Multiple outputs
return items.map(item => ({ ...item, processed: true }));
```

**For "n8n Code (compat)":**
```javascript
// Return modified items array
return items;

// Return new item
return { json: { result: 'done' } };

// Return multiple items
return [
  { json: { item: 1 } },
  { json: { item: 2 } }
];
```

---

### 6️⃣ **Options** (Advanced Settings)

#### **Cache Directory**

Custom path for library cache.

**Default:** `~/.n8n/code-plus-cache`

**Example:** `/opt/n8n/custom-cache`

When to change: Multiple n8n instances, custom storage location

---

#### **Clear Cache Before Run**

Delete all cached libraries before installing.

**Default:** `false`

**Use when:** Need fresh install, troubleshooting package issues

**Example:**
```
Libraries: lodash@latest
Clear Cache: ✅
```
Result: Deletes `node_modules`, reinstalls `lodash` fresh

---

#### **Force Reinstall**

Reinstall libraries even if already cached.

**Default:** `false`

**Use when:** Update to latest version, fix corrupted packages

**Difference from Clear Cache:**
- Clear Cache: Deletes everything, then installs
- Force Reinstall: Reinstalls only specified libraries

---

#### **Timeout (ms)**

Maximum execution time for Init Code + Main Code.

**Default:** `3000` (3 seconds)  
**Range:** `100` - `300000` (5 minutes)

**Example scenarios:**
```javascript
// Timeout: 5000 (5 seconds)
// Good for API calls
const axios = require('axios');
const response = await axios.get('https://api.example.com/data');
return response.data;

// Timeout: 30000 (30 seconds)
// Good for processing large datasets
const _ = require('lodash');
const processed = _.transform(largeArray, (result, item) => {
  // Complex processing
});
return processed;
```

**Error if timeout exceeded:**
```json
{
  "error": "Execution timed out after 5000ms"
}
```

---

#### **Cache TTL (minutes)**

Automatically clear cached libraries after specified time.

**Default:** `0` (disabled)  
**Example:** `1440` (24 hours)

**How it works:**
1. Libraries installed → timestamp saved
2. Next run checks timestamp
3. If TTL exceeded → clear cache → reinstall

**Use cases:**
```
TTL: 1440 (24 hours)
→ Daily fresh installs, auto-update packages

TTL: 10080 (1 week)  
→ Weekly refresh for stable libraries

TTL: 0
→ Never auto-clear, maximum performance
```

**Stored in:** `.code-plus-meta.json` in cache directory

---

#### **Preinstall Only**

Install libraries without running any code.

**Default:** `false`

**Use when:**
- Warming up cache before actual execution
- Testing package installations
- Preparing for offline execution

**Example:**
```
Libraries: lodash, dayjs, nanoid
Preinstall Only: ✅
```

**Returns:**
```json
{
  "preinstallOnly": true,
  "librariesInstalled": ["lodash", "dayjs", "nanoid"],
  "cacheDir": "/home/user/.n8n/code-plus-cache",
  "installOutput": "added 3 packages, and audited 3 packages in 2s"
}
```

Then in subsequent runs with `Preinstall Only: false`, libraries are instantly available!

---

## 🎓 Complete Examples

### Example 1: Generate Unique IDs

**Scenario:** Add unique IDs to customer records

**Settings:**
```
Mode: Run Once for Each Item
Libraries: nanoid
```

**Main Code:**
```javascript
const { nanoid } = require('nanoid');

return {
  id: nanoid(),
  customerId: nanoid(10),
  ...$input.item.json
};
```

**Input:**
```json
[
  { "name": "Alice", "email": "alice@example.com" },
  { "name": "Bob", "email": "bob@example.com" }
]
```

**Output:**
```json
[
  { "id": "V1StGXR8_Z5jdHi6B", "customerId": "V1StGXR8_Z", "name": "Alice", "email": "alice@example.com" },
  { "id": "KYfwxwjl_J4h3k8L", "customerId": "KYfwxwjl_J", "name": "Bob", "email": "bob@example.com" }
]
```

---

### Example 2: Data Validation & Transformation

**Scenario:** Validate and format user data

**Settings:**
```
Mode: Run Once for Each Item
Libraries: validator, lodash
```

**Init Code:**
```javascript
const validator = require('validator');
const _ = require('lodash');

function formatPhone(phone) {
  return phone.replace(/\D/g, '').slice(0, 10);
}

function sanitize(data) {
  return _.mapValues(data, v => 
    typeof v === 'string' ? v.trim() : v
  );
}
```

**Main Code:**
```javascript
const item = sanitize($input.item.json);

return {
  ...item,
  emailValid: validator.isEmail(item.email),
  phoneFormatted: formatPhone(item.phone),
  urlValid: validator.isURL(item.website || ''),
  processed: true
};
```

**Input:**
```json
{
  "name": "  Alice  ",
  "email": "alice@example.com",
  "phone": "+1 (555) 123-4567",
  "website": "https://example.com"
}
```

**Output:**
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "emailValid": true,
  "phone": "+1 (555) 123-4567",
  "phoneFormatted": "5551234567",
  "website": "https://example.com",
  "urlValid": true,
  "processed": true
}
```

---

### Example 3: Date/Time Operations

**Scenario:** Generate reports with timestamps and date calculations

**Settings:**
```
Mode: Run Once for All Items
Libraries: dayjs, lodash
```

**Main Code:**
```javascript
const dayjs = require('dayjs');
const _ = require('lodash');

const now = dayjs();
const summary = {
  reportId: `RPT-${now.format('YYYYMMDD-HHmmss')}`,
  generatedAt: now.format('YYYY-MM-DD HH:mm:ss'),
  timezone: 'UTC',
  itemCount: items.length,
  totalAmount: _.sumBy(items, 'amount'),
  averageAmount: _.meanBy(items, 'amount'),
  oldestDate: dayjs(_.minBy(items, 'date').date).format('YYYY-MM-DD'),
  newestDate: dayjs(_.maxBy(items, 'date').date).format('YYYY-MM-DD')
};

return { summary };
```

---

### Example 4: API Integration with Error Handling

**Scenario:** Enrich data with external API

**Settings:**
```
Mode: Run Once for Each Item
Libraries: axios
Timeout: 10000
```

**Init Code:**
```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 8000,
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});
```

**Main Code:**
```javascript
const username = $input.item.json.username;

try {
  const response = await api.get(`/users/${username}`);
  
  return {
    username,
    profile: {
      name: response.data.name,
      bio: response.data.bio,
      publicRepos: response.data.public_repos,
      followers: response.data.followers
    },
    status: 'success'
  };
} catch (error) {
  return {
    username,
    error: error.message,
    status: 'failed'
  };
}
```

---

### Example 5: Advanced Data Processing

**Scenario:** Process e-commerce orders with complex logic

**Settings:**
```
Mode: Run Once for Each Item
Libraries: lodash, dayjs
```

**Init Code:**
```javascript
const _ = require('lodash');
const dayjs = require('dayjs');

const TAX_RATE = 0.07;
const SHIPPING_COST = 10;
const FREE_SHIPPING_THRESHOLD = 100;

function calculateTax(amount) {
  return _.round(amount * TAX_RATE, 2);
}

function calculateShipping(total) {
  return total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

function categorizeOrder(total) {
  if (total >= 500) return 'premium';
  if (total >= 100) return 'standard';
  return 'basic';
}
```

**Main Code:**
```javascript
const order = $input.item.json;

const subtotal = _.sumBy(order.items, item => item.price * item.quantity);
const tax = calculateTax(subtotal);
const shipping = calculateShipping(subtotal);
const total = subtotal + tax + shipping;

return {
  orderId: order.orderId,
  customerId: order.customerId,
  orderDate: dayjs().format('YYYY-MM-DD'),
  items: order.items,
  pricing: {
    subtotal,
    tax,
    shipping,
    total
  },
  category: categorizeOrder(total),
  freeShipping: shipping === 0,
  itemCount: order.items.length
};
```

---

## 🔍 Available Context & Helpers

### `$input` Helper

**Methods:**
- `$input.all()` — Get all items as JSON array
- `$input.item` — Current item (varies by mode)

**Example:**
```javascript
const allItems = $input.all();
const currentItem = $input.item.json;
const firstItem = $input.all()[0];
```

---

### Built-in Variables

**Available in all modes:**
- `items` — Items array (structure depends on mode)
- `item` — Current item
- `index` — Current item index (Run Once for Each Item mode)

---

### Console Methods

Output appears in n8n UI during manual execution:

```javascript
console.log('Processing item:', index);
console.info('Status:', 'success');
console.warn('Low stock:', item.quantity);
console.error('Failed to process:', item.id);
```

To enable console output in production:  
Set environment variable: `CODE_ENABLE_STDOUT=true`

---

### `helpers` Object

Access n8n helpers:

```javascript
// Example: Use n8n's HTTP request helper
const response = await helpers.httpRequest({
  method: 'GET',
  url: 'https://api.example.com/data'
});

return response;
```

---

### `require()` Function

Load npm packages from cache:

```javascript
// Standard libraries
const _ = require('lodash');
const dayjs = require('dayjs');

// Named exports
const { nanoid } = require('nanoid');

// Node.js built-ins (no installation needed)
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
```

---

## ⚠️ Error Handling

### Common Errors

#### Library Installation Failed
```json
{
  "error": "Library installation failed",
  "detail": "npm ERR! 404 'unknown-package' is not in the npm registry"
}
```

**Solution:** Check package name spelling

---

#### Timeout Exceeded
```json
{
  "error": "Execution timed out after 5000ms"
}
```

**Solution:** Increase timeout in Options

---

#### Syntax Error
```json
{
  "error": "SyntaxError: Unexpected token",
  "line": 5
}
```

**Solution:** Check your code syntax

---

### Continue On Fail

Enable "Continue On Fail" in node settings to process remaining items even if one fails:

```javascript
try {
  // Risky operation
  const result = someOperation($input.item.json);
  return { result, status: 'success' };
} catch (error) {
  return { 
    error: error.message, 
    status: 'failed',
    item: $input.item.json 
  };
}
```

---

## 🚀 Performance Tips

### 1. Use Init Code for Setup

❌ **Slow (loads per item):**
```javascript
// Main Code - runs 100 times for 100 items
const _ = require('lodash');
const dayjs = require('dayjs');
return { date: dayjs().format() };
```

✅ **Fast (loads once):**
```javascript
// Init Code - runs once
const _ = require('lodash');
const dayjs = require('dayjs');

// Main Code - 100x faster
return { date: dayjs().format() };
```

---

### 2. Choose Right Mode

- **Processing each item independently?** → Run Once for Each Item
- **Aggregating/summarizing data?** → Run Once for All Items
- **Need full item structure?** → n8n Code (compat)

---

### 3. Cache Library Versions

Specify versions to prevent reinstalls:
```
lodash@4.17.21, dayjs@1.11.10
```

Instead of:
```
lodash@latest, dayjs@latest
```

---

### 4. Use Cache TTL Wisely

```
TTL: 0 → Maximum speed (never reinstall)
TTL: 1440 → Daily updates (balanced)
TTL: 10080 → Weekly updates (for stable deps)
```

---

### 5. Preinstall Libraries

For production workflows:
1. Create setup workflow with `Preinstall Only: true`
2. Run once to warm cache
3. Main workflows run instantly

---

## 📖 Migration from Native Code Node

### Key Differences

| Native Code Node | Code Plus |
|-----------------|-----------|
| No `require()` | ✅ `require('any-npm-package')` |
| `$input.all()` | ✅ Same (or use `items`) |
| `$input.item` | ✅ Same |
| Single field | ✅ Separate Init Code + Main Code |
| - | ✅ Library caching |

### Migration Steps

1. **Copy your code** from native Code node
2. **Add required libraries** to Libraries field
3. **Add `require()` statements**
4. **Test thoroughly**

**Example:**

**Before (Native Code):**
```javascript
// Can't use external libraries
const ids = items.map((item, i) => ({
  ...item.json,
  id: `${Date.now()}-${i}`
}));

return ids.map(json => ({ json }));
```

**After (Code Plus):**
```javascript
// Libraries: nanoid

const { nanoid } = require('nanoid');

const ids = items.map(item => ({
  ...item,
  id: nanoid()
}));

return ids;
```

---

## 🛠️ Troubleshooting

### Issue: "Library not found"

**Cause:** Package not installed or wrong name

**Solution:**
1. Check package name on npmjs.com
2. Ensure Libraries field is filled
3. Try Force Reinstall

---

### Issue: "require is not defined"

**Cause:** Trying to use `require()` in native Code node

**Solution:** Use Code Plus node instead

---

### Issue: "Timeout exceeded"

**Cause:** Code takes too long

**Solution:**
1. Increase timeout in Options
2. Optimize code logic
3. Use Init Code to load libraries once

---

### Issue: "Cache directory not writable"

**Cause:** Permission issues

**Solution:**
1. Check directory permissions
2. Use custom Cache Directory path
3. Run n8n with appropriate permissions

---

## 📝 Notes & Limitations

### Current Limitations

- ✅ JavaScript fully supported
- 🚧 Python support planned (coming soon)
- ⚠️ Requires npm installed on server
- ⚠️ Network access needed for package installation
- ⚠️ Sandboxed VM environment (some Node.js features restricted)

### Security Considerations

- Code runs in restricted VM sandbox
- `require()` scoped to cache directory
- No file system access outside cache
- Timeout limits prevent infinite loops
- Use with trusted code only

### Best Practices

✅ **Do:**
- Specify package versions
- Use Init Code for setup
- Handle errors gracefully
- Set appropriate timeouts
- Cache libraries for performance

❌ **Don't:**
- Use `latest` for production (unpredictable)
- Put heavy operations in per-item code
- Forget to handle API errors
- Set infinite timeouts
- Share sensitive tokens in code (use environment variables)

---

## 🗺️ Roadmap

### Version 0.1.x (Current)
- ✅ JavaScript execution with npm libraries
- ✅ Persistent library caching
- ✅ Init Code support
- ✅ Multiple execution modes
- ✅ Auto field switching by Language & Mode
- ✅ Cache TTL (auto-prune old libraries)

### Version 0.2.x (Planned)
- 🚧 Python support (system Python + venv)
- 🚧 UI toggle for console output
- 🚧 Better error messages with code snippets
- 🚧 Library version management UI

### Version 0.3.x (Future)
- 🔮 Multiple outputs support
- 🔮 Binary data handling
- 🔮 Allowlist/denylist for packages
- 🔮 Template/snippet library
- 🔮 Debug mode with step-by-step logging

### Long-term
- 🔮 Pyodide support (Python in browser)
- 🔮 Resource limits (CPU/memory)
- 🔮 Offline mode
- 🔮 Proxy support for installations
- 🔮 Autocomplete for installed libraries

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

**Development:**
```bash
git clone https://github.com/warnyin/n8n-nodes-code-plus.git
cd n8n-nodes-code-plus
npm install
npm run build
npm run lint
```

---

## 📄 License

MIT License - see [LICENSE.md](LICENSE.md)

---

## 📚 Resources

- **npm Package:** [@warnyin/n8n-nodes-code-plus](https://www.npmjs.com/package/@warnyin/n8n-nodes-code-plus)
- **GitHub:** [warnyin/n8n-nodes-code-plus](https://github.com/warnyin/n8n-nodes-code-plus)
- **Changelog:** [CHANGELOG.md](CHANGELOG.md)
- **n8n Community:** [community.n8n.io](https://community.n8n.io)

---

## ❤️ Support

If you find this node helpful:
- ⭐ Star the repository
- 🐛 Report issues
- 💡 Suggest features
- 📢 Share with the community

---

**Made with ❤️ for the n8n community**

*Empowering workflows with unlimited possibilities* 🚀
