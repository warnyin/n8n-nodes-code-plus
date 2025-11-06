# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [0.1.18] - 2025-11-06
- **UI Fix**: Removed large popup for Init Code field - now displays as inline text field.
- **User Experience**: Init Code field now matches the compact size of other text inputs.
- **Change**: Removed `codeNodeEditor` editor type from Init Code, keeping only JavaScript/Python main code fields as expandable editors.

## [0.1.17] - 2025-11-06
- **Docs**: Refined README aesthetics and structure (Table of Contents, clearer sections, reset tip highlighted).
- **Publish**: Patch release to update npm README rendering.

## [0.1.16] - 2025-11-06
- **Documentation**: Complete README rewrite for better clarity and conciseness.
- **Structure**: Reorganized following Ex-README pattern with clear sections:
  - Installation guide (Community Nodes + Manual)
  - Parameters with practical examples
  - Complete examples (ID generation, validation, reports, API)
  - Available context and helpers
  - Performance tips and migration guide
  - Troubleshooting section
- **Length**: Reduced from 2000+ to ~700 lines while maintaining full coverage.
- **Usability**: Removed excessive emojis and redundant content.
- **Examples**: Streamlined to 4 focused real-world use cases.
- **Backup**: Full detailed README preserved in README.full.md.

## [0.1.15] - 2025-11-06
- **Critical Fix**: Fixed "Cannot set properties of undefined" error in Run Once for Each Item and Run Once for All Items modes.
- **Code Fixes**: Updated default code examples to use correct context variables:
  - Changed from `$input.all()` to `items` (array of JSON objects)
  - Changed from `$input.item.json` to `item` (JSON object)
  - Removed incorrect `.json` accessor that caused errors
- **UX Improvement**: Removed `rows` from editor typeOptions to prevent oversized popup dialogs.
- **Editor**: Init Code and Main Code editors now display at optimal size instead of forcing large popup windows.
- **Validation**: All default examples now work correctly out of the box.

## [0.1.14] - 2025-11-05
- **UI Enhancement**: Code fields now automatically switch examples when changing Mode (Run Once for Each Item / Run Once for All Items / n8n Code compat).
- **UX**: Removed `parameterPane: "wide"` for better field sizing - inputs now display at optimal width.
- **Documentation**: Complete README rewrite with comprehensive guide:
  - Detailed explanation of every field and option
  - 5 complete real-world examples with input/output
  - Init Code usage guide with 5 practical scenarios
  - Performance tips and best practices
  - Migration guide from native Code node
  - Troubleshooting section
  - Professional structure with emojis and clear sections
- **Examples**: Added mode-specific code examples:
  - Run Once for Each Item: Uses `$input.item` and `index`
  - Run Once for All Items: Uses `items` array and aggregation
  - n8n Code (compat): Uses full `items` structure for migration
- **Build**: Updated and tested all changes.

## [0.1.13] - 2025-11-05
- **Major Refactor**: Implemented proper field separation by language using `displayOptions`.
- **UI**: Fields now automatically switch when toggling between JavaScript and Python languages.
- **Architecture**: Separated field definitions into `JavascriptCodeDescription.ts` and `PythonCodeDescription.ts`.
- **Code Quality**: Removed complex dynamic default logic (~60 lines) and example snippet generation system.
- **Fixes**: 
  - Fixed parameter references throughout (runMode → mode)
  - Added proper code editor support (codeNodeEditor)
  - Language-specific fields now show/hide correctly based on selection
- **Cleanup**: Removed backup and temporary files from repository.
- **Build**: Complete rebuild with streamlined codebase (reduced from 659 to 492 lines).

## [0.1.12] - 2025-11-05
- UI: `Main Code` now has a dynamic default expression that re-applies contextual examples based on `Language` and `Mode` when using the field’s menu (`⋯`) → `Reset Value`.
- Docs: README explains how to use `Reset Value` to reapply examples.
- Build: Rebuild package.

## [0.1.11] - 2025-11-05
- UI: Show info messages in manual runs when example code is applied due to `Mode/Language` change or when fields are blank/default.
- Impl: Example replacement remains runtime-only due to n8n editor parameter mutation limitations; meta tracking for `lastMode`/`lastLanguage` unchanged.
- Build: Rebuild package.

## [0.1.4] - 2025-11-05
- Feature: Add `Run Mode: n8n Code (compat)` to expose full item
  structures and accept native Code node-style returns (`items`, `{ json: ... }`).
- Docs: Update README with compatibility examples.

## [0.1.5] - 2025-11-05
- UI: Rename parameter label from `Run Mode` to `Mode` to align with native
  Code node terminology. Option labels updated for clarity.

## [0.1.6] - 2025-11-05
- UI: Add `Language` selector like the native Code node. Currently only
  `JavaScript` is executed; selecting `Python`/`Python (Native)` shows a friendly
  message and prevents execution.
- Docs: Update README to describe the `Language` option and Python limitation.
- Build: Rebuild package.

## [0.1.7] - 2025-11-05
- Feature: Add `Cache TTL (minutes)` option to automatically clear cached `node_modules` after a configurable lifetime. Keeps memory usage fresh by pruning and reinstalling dependencies on the next run post-TTL.
- Impl: Store last install timestamp in `.code-plus-meta.json` and clear cache based on TTL before execution.
- Docs: Update README to document the new option and its behavior.
- Build: Rebuild package.

## [0.1.8] - 2025-11-05
- UX: Remove UI-only `Example` fields. Instead, auto-fill `Libraries`, `Init Code`, and `Main Code` with contextual examples when these fields are blank or `Main Code` still equals the default.
- Impl: Example snippets depend on `Mode` and `Language`. JavaScript examples execute; Python/Python (Native) examples are informational only and execution remains gated to JavaScript.
- Build: Rebuild package.

## [0.1.9] - 2025-11-05
- Policy: Always overwrite `Libraries`, `Init Code`, and `Main Code` with contextual examples whenever `Mode` or `Language` changes.
- Impl: Track last selected `Mode`/`Language` in per-node meta to detect changes and trigger example replacement. Prevents stale examples and aligns behavior with user intent.
- Build: Rebuild package.

## [0.1.10] - 2025-11-05
- Fix: In `n8n Code (compat)` mode, `$input.all()` now returns full items (with `.json`) and the main code runs once (not per item), matching native Code node semantics.
- Docs: Add footer "Made with ❤️ for the n8n community" to README.
- Build: Rebuild package.

## [0.1.3] - 2025-11-05
- Fix: Allow top-level `return` and `await` in user code by wrapping
  execution in an async IIFE inside the sandbox.
- Dev: Rebuild package and prepare release.

## [0.1.2] - 2025-11-05
- Docs: Revamp README with badges, installation/usage guides, and references.
- Docs: Add `LICENSE.md` (MIT) and `CHANGELOG.md` to the package.
- Chore: Prepare for npm page refresh by publishing patch version.

## [0.1.1] - 2025-11-05
- Fix: Adjust build output structure to match n8n expected path
  (`dist/nodes/CodePlus/CodePlus.node.js`) by setting `tsconfig.json` with `rootDir: "."`.
- Build: Rebuild and republish to npm under `@warnyin` scope.

## [0.1.0] - 2025-11-05
- Initial public release of Code Plus node.
- Features:
  - Install npm libraries on the fly from node UI
  - Persistent cache directory for reusable dependencies
  - Optional init code (executes once) and run modes (Per Item / Once)
  - Timeout and safety options; restricted VM with custom `require`

---

## Unreleased
- TBA