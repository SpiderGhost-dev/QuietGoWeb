# QuietGoWeb Agent Instructions

These instructions apply to the entire repository and supplement higher-priority directives (system, developer, and user). If any conflict arises, follow the higher-priority instructions.

## Operational Guidelines
- Treat `agentv_2.md` as the authoritative reference for workflow, sequencing, and visual parity requirements when modifying this codebase.
- Align public, hub, and admin surfaces with the Firebrand look and behavior as detailed in `agentv_2.md`.
- Preserve repository structure, PHP includes, routing, and existing authentication flows except where `agentv_2.md` explicitly authorizes changes.
- Complete work directly on the `main` branch of the canonical repository. Do not create or rely on alternate branches or external archives.
- Before modifying files, review the corresponding Firebrand canonical sources listed in `agentv_2.md` to maintain parity.
- Ensure hub authentication uses email-and-password credentials shared with the QuietGo mobile app; OTP or magic-link flows must remain disabled.

Refer to `agentv_2.md` for the full set of directives and acceptance criteria.
