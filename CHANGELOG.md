# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

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