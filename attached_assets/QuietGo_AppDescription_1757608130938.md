
# QuietGo — App Description & Flow (Build Guide)

## Purpose & Non‑Goals
**Purpose:** discreet, camera‑fast stool & meal tracker surfacing patterns and correlations.  
**Non‑goals:** social feeds, gamification, diagnosis, crude UI, celebrity avatars.

## Public Homepage — Explore First
Browse freely (value prop, screenshots, loops, sample **Rhythm** report, FAQs, privacy).  
CTAs: **Try logging** (account flow), **See patterns demo** (sample data), **Pricing**.  
**Rule:** attempts to save/edit/use trigger **Account/Subscription**.

## Top‑Level Navigation
Home • Patterns • People • Reports • Settings

## Page‑by‑Page Spec
### Onboarding & Consent
3‑step: value → privacy‑at‑a‑glance → consents (camera, notifications, optional analytics).  
Persist **consent version + timestamp**; links: ToS, Privacy, Data Policy.

### Account & Verification
Email + password; **email OTP**; Apple/Google later.  
Optional profile: nickname, timezone, units, goals.

### Home (Today)
Status (e.g., “Regularity window 7–11am”), hydration hint; recent logs; next reminder.  
CTAs: **+Stool**, **+Meal**, **Camera**, **Patterns**.

### Stool Camera (AI)
Capture → preview → **AI classification** (Bristol, color flags, confidence) → **editable** result + plain‑English context (education only).  
**Auto‑stamp:** timestamp + coarse location; **auto‑delete original** after analysis by default (toggle).  
Actions: Retake • Use Photo • Save.

### Stool Log (Manual)
Fields: time, Bristol, color, effort, pain, notes; tags (fiber/dairy/spicy/meds/stress/custom).

### Meal Camera (AI)
Capture → detect foods → estimate portions → calories/macros; confidence shown; one‑tap edits.  
**Auto‑stamp:** timestamp + coarse location; **auto‑delete** by default.

### Meal Log (Manual)
Items, portions, calories; tags (fiber/dairy/spicy/caffeine/alcohol), notes; optional photo.

### Patterns & Results
**Regularity Window** heatmap; **Frequency** bars; **Bristol Mix**; **Correlations** matrix (foods/tags/sleep/steps/workouts ↔ stool).  
Overlays: hydration, sleep, steps, workouts; filters: date range; weekday/weekend.

### Calendar
Month grid: stool icons sized by count; meal dots; day drawer with entries + mini trends.

### People (Trackable Sharing)
Invite by email; **view‑only** trends (no raw photos by default). Revoke; access audit.

### Reports
Weekly **Rhythm** PDF; CSV export; share via private link/email; optional clinic header.

### Reminders
Time windows (e.g., 7–11am); post‑meal nudges; missed‑log prompts; Snooze; DND; smart cooldown.

### Subscription & Billing
Free vs Pro table; **$29.99/yr** or **$4.99/mo**; Stripe web billing; App Store/Play on mobile; restore/manage.

### Settings (Privacy & Data)
Image retention window; **auto‑delete toggle**; consent dashboard; **export/delete**.  
Integrations: Apple Health / Health Connect (sleep/steps/workouts).  
Analytics opt‑in; SDK minimization.

### Account & Profile
Nickname, timezone, units, goals; discreet icon label; change password; sessions list; delete account.

### Legal
ToS, Privacy, Data Processing, HBNR notice, “not medical advice” disclaimer; contacts.

### Security & Privacy
TLS; encryption at rest; region‑scoped storage; minimal PII; consent versioning; export/delete; breach playbook.

## Data Model (Minimum)
- **User**(id, email, pw_hash, tz, units, consent_version, created_at)  
- **LogStool**(id, user_id, ts, bristol:int, color:str, effort:bool, pain:bool, tags:[str], notes:str, photo_id?, lat?, lon?)  
- **LogMeal**(id, user_id, ts, foods:[{name, qty, unit, kcal, macros}], tags:[str], notes:str, photo_id?, lat?, lon?)  
- **Photo**(id, user_id, kind:stool|meal, analyzed:bool, stored_until:datetime)  
- **Reminder**(id, user_id, type:window|post_meal|missed, config:json)  
- **Share**(id, user_id, viewer_email, perms:{trends:bool, photos:bool}, revoked_at?)  
- **Subscription**(user_id, plan:free|pro_m|pro_y, status, provider, renews_at)  
- **Integration**(user_id, apple_health:json, health_connect:json)  
- **Audit**(id, user_id, action, meta, ts)

## API Shapes (examples)
`POST /auth/signup`, `POST /auth/login`, `POST /auth/verify` (OTP)  
`GET/POST /stool`, `GET/POST /meal`  
`POST /ai/stool:analyze` → `{bristol, color, confidence, summary}`  
`POST /ai/meal:analyze` → `[{food, qty, unit, kcal, macros, confidence}]`  
`GET /patterns` → `{regularity_heatmap, frequency, bristol_mix, correlations}`  
`GET/POST /people`, `POST /people/revoke`  
`GET /reports/weekly`, `POST /export/csv`  
`GET/POST /reminders`  
`GET/POST /settings`, `POST /settings/privacy`  
`POST /billing/create-checkout-session`, `POST /billing/webhook`

## Acceptance Criteria (samples)
- Public homepage remains open; any save/edit attempt → **Account/Subscription**.  
- **Stool AI** returns Bristol + color + summary ≤ **3s p95**; user can edit before save.  
- **Meal AI** returns top items with portions/calories; edits update totals live.  
- **Patterns** show a clear regularity band after ≥ **7 stool logs**.  
- **Reports** generate PDF/CSV within **10s**; share links expire in **7 days**.  
- With **auto‑delete ON**, original image blobs are removed immediately after analysis outputs persist.
