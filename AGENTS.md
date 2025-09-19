# AGENTS.md — QuietGo POA (Plan of Action) for ChatGPT‑5 Codex

## Project facts (lock these)
- **Stack:** PHP 8.2 (Hostinger), no build step required.
- **Divisions:** Public `/`, Hub `/hub/`, Admin `/admin/` (three separate headers/footers).
- **Universal includes (PHP):**
  - Public: `includes/header-public.php`, `includes/footer-public.php`
  - Hub: `includes/header-hub.php`, `includes/footer-hub.php`
  - Admin: `includes/header-admin.php`, `includes/footer-admin.php`
- **Branding text:** Any visible “QuietGo” renders as `<span class="quietgo-brand"><span class="quiet">Quiet</span><span class="go">Go</span></span>`.
- **Brand script:** `js/site.js` includes an exact-match replacer + MutationObserver; supports cross-node cases (e.g., `Quiet<em>Go</em>`). Do not regress.

## CSS tokens (LOCKED)
Define these once and respect across all divisions (flattened output still honors them):
```
--quiet-color: #ded4c4;
--go-color: #cb978a;
--header-bg: #000000;
--footer-bg: #000000;
--bg-page: #0a0a0a;
--bg-section-1: #0d0d0d;
--bg-section-2: #111111;
--bg-section-3: #151515;
```
- **Flattened CSS per division (Hostinger‑friendly):** exactly one file per area, built by concatenation order **tokens → base → components → division**:
  - Public → `/css/public.css`
  - Hub → `/hub/css/hub.css`
  - Admin → `/admin/css/admin.css`
- Admin visuals must remain pixel‑identical.

## Images (exact names + paths)
- `/assets/images/favicon.ico`  → favicon
- `/assets/images/logo.png`  → full logo (hero/marketing)
- `/assets/images/logo-graphic.png`  → universal headers & footers (all divisions)
- Replace legacy asset refs; do **not** rename these files. No cache‑busting query strings on images.

## Hard rules
1) No Admin redesign. Pixel‑identical after work.
2) Scope discipline: only change files touched by tasks.
3) Prefer full‑page replacements over snippet edits when modifying a page.
4) Use `&amp;` in all href/action querystrings.
5) Never commit secrets (`admin/api/.config.php`, `.setup.php`, uploads, cache).
6) Keep Public/Hub/Admin strictly separate.
7) No iframe styling hacks. No new routes beyond this POA.

## Outcomes / Acceptance
- Every page uses the correct header/footer include; no hardcoded `<header>/<footer>` remain (homepage included).
- Branding wrapper or script styles all visible “QuietGo” (exact case) including split text nodes.
- All image refs updated to the three canonical files under `/assets/images/`.
- Each page loads **one** CSS file (its division’s flat).
- Routing finalized:
  - Move `hub.php` → `/hub/index.php`; add redirect `/hub.php` → `/hub/` (302 for now).
  - Hub login uses `/hub/login.php` (remove any `/api/login` redirects).
  - Admin dashboard: `/admin/dashboard.php`.
- Admin header: remove “Dashboard” menu item; logo → `/admin/dashboard.php`. Keep “View Hub” → `/hub/`. Keep “Impersonate User” placeholder → `/admin/impersonate.php`.
- Impersonation: when active, Hub shows banner with email + Stop link (`/admin/stop-impersonation.php`).
- SEO: `/hub/*` and `/admin/*` set `noindex, nofollow` (meta or headers). Public remains indexable.
- Quality: PHP 8.2 lint passes; internal links valid; `&amp;` everywhere in attributes.

## Tasks (execute in order)
1) **Un‑hardcode headers/footers everywhere**
   - Convert remaining `.html` → `.php` across Public/Hub/Admin.
   - Swap hardcoded header/footer for the correct includes.
   - Update internal links `.html` → `.php` and fix `&` → `&amp;` in attributes.
2) **Create `/hub/` and re‑route**
   - Create `/hub/`; move `hub.php` → `/hub/index.php`.
   - Add `/hub/login.php` (UI only; hooks TBD).
   - Add 302 from `/hub.php` → `/hub/`.
   - Change any `/api/login` redirects in JS/HTML to `/hub/login.php`.
3) **Branding & assets sweep**
   - Ensure `js/site.js` branding script present and runs on all divisions.
   - Replace any “QuietGo” in non‑text assets (e.g., SVG) manually with wrapper if needed.
   - Standardize images to the three canonical paths above.
4) **CSS flattening (per division)**
   - Produce `public.css`, `hub.css`, `admin.css` via concatenation (**tokens → base → components → division**).
   - Update pages to link only their division flat file.
   - Keep Admin visuals identical; Hub mirrors Admin’s structure with subscriber content.
5) **Admin nav consistency**
   - Remove “Dashboard” menu item.
   - Keep logo → `/admin/dashboard.php`, keep “View Hub” → `/hub/` and “Impersonate User” → `/admin/impersonate.php`.
6) **SEO & robots**
   - Add meta or header `noindex, nofollow` to `/hub/*` and `/admin/*`.
   - Optional: provide simple `/404` and `/500` using public includes (placeholders OK).

## Tests & checks (block PR if fail)
- PHP lint: `php -l` on all `.php` files.
- Link check: no `.html` leftovers; internal links resolve.
- Branding check: sample Public/Hub/Admin pages show wrapper rendering; script works.
- Asset check: head includes favicon; header/footer use `logo-graphic.png`; hero uses `logo.png`.
- CSS check: one stylesheet per page (public.css / hub.css / admin.css).
- Security: no changes to secret files or credentials.

## Commit/PR rules
- Scoped commit prefixes: `public:`, `hub:`, `admin:`, `css:`, `branding:` etc.
- PR must map acceptance bullets to specific file changes + include a brief diff summary.
- Label by area: `public`, `hub`, `admin`, `infra`.
- If ambiguous, choose smaller scope and list the question in the PR.

## Do NOT
- Redesign Admin.
- Rename image files or move them off `/assets/images/`.
- Add querystrings to image URLs.
- Merge the three headers/footers into one.
- Invent APIs beyond this POA.


## Context (source of truth)

**Mobile apps (FULL & GO-TO) = the primary product.**
- Do **everything**: capture, notify, analyze on the go, full feature set.
- Offline → sync, fast UX, highest usage surface.
- The system of record originates here.

**Website = companion + command center.**
- **Public (/):** educate, market, route to logins.
- **QuietGo Hub (/hub/):** comfortable viewer/analyst, organizer of leisure, long-form insights, exports, account. Mirrors Admin’s structure, subscriber-only features.
- **Admin (/admin/):** operations (users, reports, settings, logs, impersonation). Pixel-identical; no redesign.
- Hub/Admin are **noindex, nofollow**.

**Principle:** Apps lead; site augments—stores knowledge, visualizes in comfort, keeps everything organized.


## Deliverables
- Every Pull Request created by Codex must attach a **`public_html.zip`** artifact containing the deploy‑ready folder for Hostinger upload.
- This artifact must reflect the full output after tasks are executed (headers/footers un‑hardcoded, CSS flattened, branding/images corrected).
- Purpose: allow direct download/upload to Hostinger without needing to pull or rebuild locally.
