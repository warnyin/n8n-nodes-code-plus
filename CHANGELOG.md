# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

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