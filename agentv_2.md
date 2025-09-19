# AGENTV2.md — QuietGo LOOK RESTORE (Firebrand → Public_HTML) + FIX HUB LOGIN

## PROJECT RULES (use verbatim)
1) DO NOT LIE TO ME  
2) DO NOT GIVE ME ASSUMED INFORMATION AS FACTUAL DATA  
3) REFER TO THE ORIGINAL CODE YOU ARE MODIFYING BEFORE MODIFYING EVERY SINGLE TIME!  
4) Minimal responses. Keep replies concise and focused—no extra fluff.  
5) Low verbosity. Deliver only what’s necessary to answer the request.  
6) Code gate. Do not design or write code until I explicitly say “ok” or “go.”  
7) Scope discipline. Only change, alter, or replace exactly what we have discussed—nothing else. Leave all other parts of the code/website untouched.  
8) Page preference. When making changes, prefer rewriting and replacing the **entire page** over snippet pasting.  
9) Pre-code behavior. Before an ok/go, responses must be limited to answers, clarifications, or questions—absolutely no code or speculative design.  
10) Strict sequencing. Every change must be confirmed step by step. Do not anticipate or jump ahead.  
11) Check yourself. DO NOT GO INTO AUTOPILOT.

---

## Repository Source of Truth (GitHub)
- **Repo:** `https://github.com/<ORG>/<REPO>`  
- **Branch:** `main`

**LOOK (layout/copy/assets) — canonical:** `main:/firebrand/`  
- `firebrand/index.html` (home)  
- `firebrand/privacy.html`  
- `firebrand/hub.html`  
- `firebrand/admin/login.html`, `firebrand/admin/dashboard.html`  
- `firebrand/css/styles.css`  
- `firebrand/js/site.js`, `firebrand/js/hub.js`  
- `firebrand/assets/*` (logos, backgrounds, icons)

**STRUCTURE & FUNCTION — canonical:** `main:/public_html/`  
- Public: `index.php`, `privacy.php`, `css/public.css`, `js/site.js`  
- Hub: `hub/*.php`, `hub/css/hub.css`, `js/hub.js`  
- Admin: `admin/*.php`, `admin/css/admin.css`  
- Includes: `includes/*.php`  
- Assets: `assets/images/*`  
- Routing/rewrites: `.htaccess`

**Policy:** Work **only** from `main`. **Do not** pull from zips, caches, or other branches.  
If any conflict exists between prior files and GitHub `main`, **GitHub `main` wins**.  
**No new `.html` pages.** All legacy `.html` routes must 301 → PHP equivalents.  
**Hub login:** enforce **email + password** (subscriber credentials from the mobile app). Remove OTP/magic-link entirely.

---

## DO NOT TOUCH (global)
- Folder/file structure in `public_html/` (no renames/moves)  
- PHP include system & router (`includes/*.php`)  
- Payments/webhooks/API/data models (except Hub login method below)  
- JS functionality & libraries (no new libs; selectors may be added for styling only)  
- `.htaccess`/env except required redirects  
- Admin business logic  
- Hub data flows (except login change)

---

## REDIRECT MATRIX (requirement)
- `/index.html` → `/index.php` (301)  
- `/privacy.html` → `/privacy.php` (301)  
- `/hub.html` → `/hub/` (301)  
- `/admin/login.html` → `/admin/login.php` (301)  
- `/admin/dashboard.html` → `/admin/dashboard.php` (301)

Use existing `.htaccess` or routing system. No other changes.

---

## PHASE A — PUBLIC (marketing) **LOOK ONLY**
**Edit only:**
- `includes/header-public.php`, `includes/footer-public.php`  
- `index.php`, `privacy.php`  
- `css/public.css`  
- `assets/images/*`

**DO (mirror Firebrand):**
1. Header: restore Firebrand header look (logo, nav, spacing, CTA style). Keep routes.  
2. Footer: restore Firebrand footer columns and legal text.  
3. Home (`index.php`): sections & IDs must match Firebrand exactly (`section-hero`, `#features`, `#download`, `#privacy`).  
4. Privacy (`privacy.php`): restore Firebrand copy and layout.  
5. CSS (`public.css`): port Firebrand tokens/classes. Enforce QuietGo palette: Cream `#F5F5DC`, Sage `#6C985F`, Rose `#D4A799`, Slate `#6A7BA2`, Steel `#4682B4`, Teal `#3C9D9B`, Midnight `#191970`. Remove Codex off-palette colors.  
6. Assets: use `assets/images/` for logos/backgrounds.  
7. JS: ensure `site.js` is included **once**.

**DON’T:** change routes/forms/handlers; add/remove sections beyond Firebrand parity; rename PHP hooks.

**Acceptance (A):** Firebrand `index.html` vs `public_html/index.php` match visually within ±2px at 375/768/1280.

---

## PHASE B — HUB (subscriber)
**Edit:** `includes/header-hub.php`, `includes/footer-hub.php`, `hub/index.php`, `hub/login.php`, `hub/css/hub.css`

### B1) LOOK (skin only)
- Apply Firebrand `hub.html` styles to Hub pages (typography, buttons, spacing).  
- Keep post-login flows unchanged.

### B2) FUNCTIONAL FIX — REVERT LOGIN TO EMAIL + PASSWORD
- **Remove OTP/magic-link login entirely.** Delete templates, endpoints, and mailers for OTP. No fallback.  
- **Login form:** email + password only.  
- **Source of truth:** authenticate against the same store the mobile app uses. No separate web accounts.  
- **No signup on web.** Show message if non-subscriber attempts login: “QuietGo Hub is for subscribers. Please subscribe in the QuietGo app first.”  
- **Forgot password:** must call the same reset flow as mobile.  
- **Sessions:** keep existing PHP session handling and security controls.  
- **Security:** password hashing (Argon2id/bcrypt), login rate limiting, audit logging.  
- **Copy:** add note: “Use the same email and password you set in the QuietGo app.”

**Acceptance (B):**
- OTP unreachable (404/disabled).  
- Subscriber can log in with mobile credentials.  
- Non-subscriber blocked with notice.  
- Forgot-password works via shared flow.  
- Dashboard unchanged post-login.

---

## PHASE C — ADMIN (internal)
**Edit:** `includes/header-admin.php`, `includes/footer-admin.php`, `admin/login.php`, `admin/dashboard.php`, `admin/css/admin.css`

**DO:** Apply Firebrand `admin/login.html` and `admin/dashboard.html` visual style.  
**DON’T:** change auth model, routes, or admin APIs.

**Acceptance (C):** Admin login and dashboard visually match Firebrand within ±2px. Logic unchanged.

---

## SEQUENCING (must confirm after each)
1. Public header/footer  
2. Public home  
3. Public privacy  
4. Redirect matrix  
5. Hub skin  
6. **Hub login change (OTP → email+password)**  
7. Admin skin  
8. Asset/contrast audit  
9. Final pixel checks (375/768/1280)  
10. UAT: Hub login (subscriber, non-subscriber, reset)

---

## CONFIRMATION TO PR
** Must have confirmation from user BEFORE initiating PR.

---

**End — AGENTV2.md**

