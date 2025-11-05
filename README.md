# Code Plus — n8n Community Node# Code Plus — n8n Community Node



🚀 **Supercharge your n8n workflows** with custom JavaScript code and **any npm library** you need.Run custom JavaScript with installable npm libraries and a persistent cache.



![npm version](https://img.shields.io/npm/v/@warnyin/n8n-nodes-code-plus.svg)![npm version](https://img.shields.io/npm/v/@warnyin/n8n-nodes-code-plus.svg)

![npm downloads](https://img.shields.io/npm/dm/@warnyin/n8n-nodes-code-plus.svg)![npm downloads](https://img.shields.io/npm/dm/@warnyin/n8n-nodes-code-plus.svg)

![license](https://img.shields.io/badge/license-MIT-blue.svg)![license](https://img.shields.io/badge/license-MIT-blue.svg)



Package: `@warnyin/n8n-nodes-code-plus`Package: `@warnyin/n8n-nodes-code-plus`



## 🎯 Why Code Plus?## About

- Install npm libraries directly from the node UI (comma-separated or JSON array).

The native n8n Code node is great, but **Code Plus takes it to the next level**:- Cache libraries in a persistent directory for reuse and faster runs.

- Optional Init Code that runs once before the main code.

| Feature | Native Code Node | **Code Plus** |- Mode: Run Once for Each Item, Run Once for All Items, or n8n Code (compat).

|---------|-----------------|---------------|- Control Timeout, clear cache, and force reinstall.

| Custom JavaScript | ✅ | ✅ |- Executes in a restricted VM with a custom `require` bound to the cache.

| Install npm libraries | ❌ | ✅ **Any package from npm** |

| Library caching | ❌ | ✅ **Persistent & fast** |Documentation structure is inspired by the author’s Swagger API node for n8n [reference][ref-swagger].

| Init Code (one-time setup) | ❌ | ✅ **Load once, use many times** |

| Multiple execution modes | ✅ | ✅ **+ n8n Code compatibility** |## Key Features

| Auto field switching | ❌ | ✅ **By Language & Mode** |- On-the-fly npm dependency installation.

- Supports both comma-separated and JSON array input for libraries.

### Perfect for:- Persistent cache directory (default `~/.n8n/code-plus-cache`).

- 📦 Using powerful npm libraries (lodash, dayjs, nanoid, axios, etc.)- Select `Mode`: `Run Once for Each Item`, `Run Once for All Items`, or `n8n Code (compat)`.

- 🔄 Processing hundreds of items with shared resources - Language selector: JavaScript (Python options shown but currently unsupported in this node).

- 🎨 Complex data transformations- Safety and performance options: Timeout, Clear Cache, Force Reinstall, Preinstall Only.

- 🔗 API integrations with custom libraries- `require()` is scoped to the cache directory for controlled loading.

- ⚡ Performance-critical workflows

## Installation

## ⚡ Quick Start### Option 1: Community Nodes (Recommended)

1) Open n8n and go to `Settings → Community Nodes`

**1. Install the node:**2) Click `Install`

```3) Enter: `@warnyin/n8n-nodes-code-plus`

Settings → Community Nodes → Install → @warnyin/n8n-nodes-code-plus4) Accept the risks and install

```

### Option 2: Manual Installation

**2. Add to your workflow and install a library:**```bash

```cd ~/.n8n/nodes

Libraries: nanoid@latestnpm install @warnyin/n8n-nodes-code-plus

```# Restart n8n

```

**3. Write your code:**

```javascript### Option 3: Local Development & Linking

const { nanoid } = require('nanoid');```bash

return { id: nanoid(), data: $input.item.json };# Clone, install, and build

```git clone https://github.com/warnyin/n8n-nodes-code-plus.git

cd n8n-nodes-code-plus

**Done!** 🎉npm install

npm run build

---

# Link to n8n

## 📚 Complete Guidenpm link

cd ~/.n8n

### 🔧 Installationnpm link @warnyin/n8n-nodes-code-plus

# Restart n8n

#### Option 1: Community Nodes (Recommended)```

1. Open n8n → `Settings` → `Community Nodes`

2. Click `Install`## Usage

3. Enter: `@warnyin/n8n-nodes-code-plus`### Main Parameters

4. Accept the risks and click Install- `Language`: Select between `JavaScript`, `Python`, or `Python (Native)`. **Note**: Currently only JavaScript is fully supported for execution.

5. Restart n8n- `Libraries`: e.g. `nanoid@latest,lodash` or `["nanoid","dayjs@^1"]`

- `Init Code`: runs once before main code (language-specific field)

#### Option 2: Manual Installation- `Main Code`: JavaScript or Python code where `require()` loads from the cache (language-specific field)

```bash- **Important**: Fields automatically switch based on selected language using displayOptions:

cd ~/.n8n/nodes  - JavaScript: Shows `Libraries`, `Init Code (JavaScript)`, and `JavaScript` fields

npm install @warnyin/n8n-nodes-code-plus  - Python: Shows `Libraries`, `Init Code (Python)`, and `Python` fields

# Restart n8n- `Mode`: `Run Once for Each Item`, `Run Once for All Items`, or `n8n Code (compat)`

```- `Options`:

  - `Cache Directory` (default: `~/.n8n/code-plus-cache`)

#### Option 3: Local Development  - `Clear Cache Before Run`

```bash  - `Force Reinstall`

git clone https://github.com/warnyin/n8n-nodes-code-plus.git  - `Timeout (ms)`

cd n8n-nodes-code-plus  - `Cache TTL (minutes)`

npm install  - `Preinstall Only`

npm run build

npm link### Quick Start

cd ~/.n8nSimple `Main Code` to generate an ID:

npm link @warnyin/n8n-nodes-code-plus```js

# Restart n8nconst { nanoid } = require('nanoid');

```return { id: nanoid(), input: item };

```

---

### n8n Code (compat) examples

## 🎮 Understanding Each Field- Modify items in-place like the native Code node:

```js

### 1️⃣ **Language** (Selector)// Mode: n8n Code (compat)

for (let i = 0; i < items.length; i++) {

Select your programming language. Currently **JavaScript is fully supported**.  items[i].json.idx = i;

}

**Options:**return items;

- ✅ `JavaScript` — Fully functional, runs with Node.js VM```

- 🚧 `Python (Beta)` — UI available, execution coming soon

- 🚧 `Python (Native) (Beta)` — UI available, execution coming soon- Return a single item object with `json`:

```js

**Note:** Python options are shown for future compatibility but currently display a friendly message without executing.// Mode: n8n Code (compat)

return { json: { ok: true } };

---```



### 2️⃣ **Mode** (Execution Strategy)## Detailed Parameters & Behavior (English)



Choose **how your code runs** across input items. This is crucial for performance and logic!### Language

- Options: `JavaScript` (supported), `Python (Beta)`, `Python (Native) (Beta)`.

#### 🔁 **Run Once for Each Item**- Current behavior: Only `JavaScript` executes in Code Plus. Selecting Python shows a friendly message and prevents execution.

- Roadmap: Python support via system `python` + `venv` and/or Pyodide.

Your code executes **separately for each input item**.

### Mode

**When to use:**- `Run Once for Each Item`

- Transform/modify each item individually  - Context: `item.json`, `items.map(x => x.json)`, `index`, `$input.item = item.json`.

- Add unique IDs or timestamps per item  - Execution: Runs once per input item. Outputs are paired with inputs via `pairedItem`.

- Process items independently  - Returns: Array → multiple outputs for that item; Object → one output; `undefined` → passthrough current `item.json`.

  - Best for: map/transform per item.

**Available context:**- `Run Once for All Items`

- `$input.item.json` — Current item's data  - Context: `items` is an array of all `json` payloads; `$input.item = items[0]?.json`.

- `$input.all()` — All items (if needed for comparison)  - Execution: Runs once for the whole batch.

- `item` — Alias for `$input.item.json`  - Returns: Array → multiple outputs overall; Object → one output; `undefined` → passthrough first item’s `json` (if present).

- `index` — Current item index (0-based)  - Best for: aggregate/summary.

- `n8n Code (compat)`

**Example:**  - Context: full `item` and `items` objects (not only `json`), plus `index`, `$input.item = item`.

```javascript  - Execution: Iterates per item internally, like n8n’s native Code node.

// Add a unique ID to each item  - Returns: Native Code node style (`return items`, `return { json: ... }`, `return [ ... ]`, `return` passthrough).

const { nanoid } = require('nanoid');  - Best for: migration from the native Code node or when full item structure is required.



return {### Libraries

  id: nanoid(),- Input formats: comma-separated (`nanoid@latest,lodash`) or JSON array (`["nanoid","dayjs@^1"]`).

  index: index,- Installed into the node’s cache directory (default: `~/.n8n/code-plus-cache`).

  data: $input.item.json- `Force Reinstall` reinstalls even if present; `Clear Cache Before Run` removes cache `node_modules` before installing.

};

```### Init Code

- Runs once before main code in the same sandbox; supports top-level `await` and `return` (async wrapper).

**Input:**- Use for preloading libraries, setting globals, warm-ups.

```json

[### Main Code

  { "name": "Alice" },- JavaScript in a restricted VM with custom `require()` bound to the cache.

  { "name": "Bob" }- Supports top-level `await`/`return`; `Timeout (ms)` applies to both init and main code.

]

```### Options

- `Cache Directory`: Path for library cache (default `~/.n8n/code-plus-cache`).

**Output:**- `Clear Cache Before Run`: Remove cached modules before reinstalling.

```json- `Force Reinstall`: Reinstall libraries regardless of presence.

[- `Timeout (ms)`: Max execution time for init/main code.

  { "id": "V1StGXR8_", "index": 0, "data": { "name": "Alice" } },- `Cache TTL (minutes)`: Automatically clears installed libraries when the last install time exceeds this TTL. Set `0` to disable. Useful to keep memory fresh by re-installing daily or after fixed periods.

  { "id": "KYfwxwjl_", "index": 1, "data": { "name": "Bob" } }- `Preinstall Only`: Install libraries and return a summary without running code.

]

```### Execution Context

- `console`: Forwarded to the UI in manual mode; to stdout in execute mode when `CODE_ENABLE_STDOUT="true"`.

---- `$input` helper:

  - `all()` returns all `json` payloads.

#### 🎯 **Run Once for All Items**  - `item` is set per mode (`item.json` for per-item/once; full `item` in compat mode).

- `require()`: Scoped to the cache directory for controlled loading of npm packages.

Your code executes **once for the entire batch** of items.- Built-ins: `Buffer`, `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`.

- `helpers`: Exposes n8n helpers via `helpers` in the sandbox.

**When to use:**

- Aggregate data (sum, average, count)### Error Handling

- Generate reports or summaries- Throws `NodeOperationError` on failures; with `Continue On Fail`, returns an error item instead of halting.

- Process all items together- Library installation failures include detailed stdout/stderr in the `detail` field.



**Available context:**### Environment Variables

- `items` — Array of all items' JSON data- `CODE_ENABLE_STDOUT`: When set to `"true"`, forwards console output to stdout in execute mode (non-manual). Otherwise, console output appears in the UI only during manual runs.

- `$input.all()` — Same as `items`

- `$input.item` — First item (for convenience)### Examples by Mode

- Per-item transform:

**Example:**```js

```javascriptreturn { ...item, json: { ...item.json, idx: index } };

// Calculate statistics for all items```

const _ = require('lodash');- Aggregate once:

```js

const total = _.sumBy(items, 'amount');const sum = items.reduce((acc, x) => acc + (x.value || 0), 0);

const average = _.meanBy(items, 'amount');return { total: sum };

const count = items.length;```

- Compat passthrough with in-place edit:

return {```js

  summary: {items[index].json.tag = 'processed';

    total,return items;

    average,```

    count,

    timestamp: new Date().toISOString()## Examples

  }- Generate IDs for each item using `nanoid`:

};```js

```const { nanoid } = require('nanoid');

return items.map((item) => ({ ...item, id: nanoid() }));

**Input:**```

```json

[- Use `lodash` to chunk data:

  { "amount": 100 },```js

  { "amount": 200 },const _ = require('lodash');

  { "amount": 50 }const chunks = _.chunk(items, 50);

]return { chunksCount: chunks.length };

``````



**Output:**- Run once and stamp a timestamp via `dayjs`:

```json```js

[const dayjs = require('dayjs');

  {return { generatedAt: dayjs().toISOString() };

    "summary": {```

      "total": 350,

      "average": 116.67,## Notes & Limitations

      "count": 3,- Requires network access and permission to run `npm install` on the n8n server.

      "timestamp": "2025-11-05T10:30:00.000Z"- Libraries are installed into the cache directory only, not into n8n itself.

    }- `require()` is restricted to the cache; Node built-ins are accessible via the sandbox.

  }- Avoid long-running or blocking code; configure `Timeout (ms)` appropriately.

]- Version `0.1.1` adjusted the build output so n8n loads from `dist/nodes/CodePlus/CodePlus.node.js`.

```- Python execution (`python` / `pythonNative`) is not supported in Code Plus; use the native Code node in n8n for Python.



------



#### 🔄 **n8n Code (compat)**Made with ❤️ for the n8n community



**Compatibility mode** with the native n8n Code node. Use this when migrating from the native Code node.## Roadmap

- Recent

**When to use:**  - 0.1.7 shipped: Cache TTL (minutes) — auto-prunes cached `node_modules` after a configurable lifetime and reinstalls on the next run.

- Migrating existing workflows from native Code node

- Need full `items` structure (with `.json`, `.binary`, etc.)- Near-term (0.1.x)

- Want native Code node behavior  - Add UI toggle for stdout (replace `CODE_ENABLE_STDOUT` env var).

  - Expand `$input` and console forwarding docs with examples/screenshots.

**Available context:**  - Review default `Mode` to align with the native Code node.

- `items` — Full items array (not just JSON)  - Concurrency control for `Run Once for Each Item`.

- `item` — Current item object  - Internationalized error messages (English/Thai) with structured details.

- `index` — Current index

- Python Support

**Example:**  - Execute Python via `venv + pip` with per-node cache.

```javascript  - Cross-platform handling (Windows/Linux/macOS) and compiled wheels.

// Modify items in-place (native Code node style)  - Safety: timeouts, memory limits, sanitized imports.

for (let i = 0; i < items.length; i++) {  - `Python (Native)` via Pyodide as a fallback when system Python is unavailable.

  items[i].json.processed = true;  - Language-aware editor (syntax highlight/linting for Python).

  items[i].json.position = i + 1;

}- Execution & Security

  - Require allowlist/denylist.

return items;  - Offline mode and dependency whitelist scanning; integrity checks via lockfile.

```  - Resource limits (CPU/Memory) and configurable concurrency.

  - Harden sandbox and restrict accessible globals.

**Or return a new single item:**

```javascript- Features & Compatibility

return { json: { message: "All items processed", count: items.length } };  - Multiple outputs and binary data support.

```  - Expand `$input` (e.g., `first`, `pairedItem`) to parity with the native Code node.

  - UI list of installed libraries with upgrade/remove actions.

---  - Proxy and custom registry support for installations.



### 3️⃣ **Libraries** (npm Packages)- UX & Developer Experience

  - Template/snippet library in the editor.

Install any npm package you need! Packages are cached for fast reuse.  - Autocomplete for `require()` from installed libraries.

  - Debug mode with step logging and timing.

**Format options:**  - CLI for preinstall/prune cache operations.

  - Unit/integration tests and full example workflows.

**Comma-separated:**

```- Docs & Community

nanoid@latest, lodash, dayjs@^1.11.0  - Migration guide from the native Code node.

```  - API reference for helpers and `$input`.

  - Contribution guide, code style, issue templates.

**JSON array:**  - Security policy and responsible disclosure.

```json

["nanoid", "lodash@4.17.21", "axios"]- Monitoring

```  - Opt-in telemetry and anonymized usage metrics.

  - Log viewer UI with filters and export.

**Common useful libraries:**

- `lodash` — Powerful data manipulation utilities- Performance

- `dayjs` — Date/time handling  - Cache warm-up strategies and TTL tuning.

- `nanoid` — Unique ID generation  - Prebundle frequently used libraries to reduce cold starts.

- `axios` — HTTP requests

- `uuid` — UUID generation## Development

- `crypto-js` — Encryption/hashing```bash

- `validator` — String validationnpm install

- `cheerio` — HTML parsing (like jQuery)npm run build

# Use npm link as shown above to connect with n8n

**Example with multiple libraries:**```

```javascript

// Libraries: lodash, dayjs, nanoid## Changelog

- See `CHANGELOG.md` for release notes.

const _ = require('lodash');

const dayjs = require('dayjs');## License

const { nanoid } = require('nanoid');- MIT License — see `LICENSE.md`.



const grouped = _.groupBy($input.all(), 'category');## References

- [0] @warnyin/n8n-nodes-swagger-api — README structure and sections [ref-swagger]

return {

  id: nanoid(),[ref-swagger]: https://www.npmjs.com/package/@warnyin/n8n-nodes-swagger-api#-warnyinn8n-nodes-swagger-api
  timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  categories: Object.keys(grouped),
  totalItems: $input.all().length
};
```

**How it works:**
1. Libraries are installed to `~/.n8n/code-plus-cache`
2. First run installs (takes a few seconds)
3. Subsequent runs use cached versions (instant!)
4. Cache persists across workflow executions

---

### 4️⃣ **Init Code** (One-Time Setup)

Code that runs **once before Main Code**, regardless of how many items you process.

**Why use Init Code?**

✅ **Performance:** Load libraries once, not per item  
✅ **Clean code:** Separate setup from business logic  
✅ **Shared resources:** Database connections, API clients  
✅ **Helper functions:** Reusable utilities

#### Example 1: Load Libraries Once

**Init Code:**
```javascript
const { nanoid } = require('nanoid');
const _ = require('lodash');
const dayjs = require('dayjs');

// These are now available in Main Code
```

**Main Code:**
```javascript
// No need to require() again - much faster!
return {
  id: nanoid(),
  timestamp: dayjs().format(),
  name: _.upperCase($input.item.json.name)
};
```

#### Example 2: Create Helper Functions

**Init Code:**
```javascript
// Create reusable functions
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatPhone(phone) {
  return phone.replace(/\D/g, '').slice(0, 10);
}

function sanitizeString(str) {
  return str.trim().toLowerCase();
}
```

**Main Code:**
```javascript
const item = $input.item.json;

return {
  ...item,
  email: sanitizeString(item.email),
  emailValid: validateEmail(item.email),
  phone: formatPhone(item.phone)
};
```

#### Example 3: Load Reference Data Once

**Init Code:**
```javascript
const fs = require('fs');

// Load lookup tables once
const countryMap = {
  'US': 'United States',
  'UK': 'United Kingdom',
  'TH': 'Thailand',
  'JP': 'Japan'
};

const currencyRates = {
  'USD': 1,
  'EUR': 0.92,
  'GBP': 0.79,
  'THB': 35.50
};

// Cache for repeated lookups
const cache = new Map();
```

**Main Code:**
```javascript
const item = $input.item.json;

return {
  ...item,
  countryName: countryMap[item.countryCode] || 'Unknown',
  priceUSD: item.price * currencyRates[item.currency]
};
```

#### Example 4: API Client Setup

**Init Code:**
```javascript
const axios = require('axios');

// Create configured API client once
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  }
});
```

**Main Code:**
```javascript
// Use the pre-configured client
const userId = $input.item.json.userId;
const response = await apiClient.get(`/users/${userId}`);

return {
  userId,
  userData: response.data
};
```

#### Example 5: Global State Tracking

**Init Code:**
```javascript
const crypto = require('crypto');

// Generate unique workflow run ID
const runId = crypto.randomBytes(8).toString('hex');
const startTime = Date.now();
let processedCount = 0;
let errorCount = 0;
```

**Main Code:**
```javascript
processedCount++;

try {
  // Your processing logic
  const result = someProcessing($input.item.json);
  
  return {
    runId,
    itemNumber: processedCount,
    elapsedMs: Date.now() - startTime,
    data: result
  };
} catch (error) {
  errorCount++;
  throw error;
}
```

**Key Benefits:**
- 🚀 **10-100x faster** for multi-item processing
- 🧹 **Cleaner main code** without setup clutter
- 💾 **Resource pooling** (connections, caches)
- 🔧 **Better organization** (setup vs. logic)

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
