<?php $pageTitle = 'QuietGo Hub — Sync & Manage Your Data'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo $pageTitle; ?></title>
  <meta name="description" content="QuietGo Hub helps you review insights, manage exports, and stay on top of your digestive health data.">
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/hub/css/hub.css">
  <script src="/js/site.js" defer></script>
</head>
<body>
<?php include __DIR__ . '/../includes/header-hub.php'; ?>
<main>
  <div id="loadingState" class="section text-center" hidden>
    <div class="container">
      <p class="muted">Loading your QuietGo Hub data…</p>
    </div>
  </div>

  <div id="hubContent">
    <section class="section section-hero" id="overview">
      <div class="container">
        <div class="hero-wrap">
          <div class="hero-content">
            <p class="hero-kicker">QuietGo Hub</p>
            <h1 class="hero-title">Welcome back, <span id="welcomeName">Friend</span>!</h1>
            <p class="hero-subtitle">Your digestive health insights are ready when you are. Sync entries, surface AI trends, and keep your care team up to date.</p>
            <div class="hero-metrics">
              <span id="lastVisit">Last visit: Today</span>
              <span id="healthStreak">🔥 3 day tracking streak</span>
            </div>
          </div>
          <aside class="hero-card" aria-label="Insights summary">
            <div class="metric-icon" aria-hidden="true">📊</div>
            <div class="metric-value" id="totalInsights">12</div>
            <div class="metric-label">Health insights</div>
          </aside>
        </div>
      </div>
    </section>

    <section class="section" id="insights">
      <div class="container">
        <h2 class="section-title">Your Health Dashboard</h2>
        <div class="grid grid-3 dashboard-actions">
          <article class="card card-featured" data-testid="card-log-stool">
            <div class="card-icon" aria-hidden="true">💧</div>
            <h3>Log stool entry</h3>
            <p>Track Bristol score, hydration, and flags with one tap.</p>
            <button type="button" class="btn btn-blue btn-large">Quick log</button>
            <span class="status-badge status-premium">Pro Feature</span>
          </article>
          <article class="card card-premium" data-testid="card-log-meal">
            <div class="card-icon" aria-hidden="true">🍽️</div>
            <h3>Log meal</h3>
            <p>Capture meals, photos, and reactions to surface AI correlations.</p>
            <button type="button" class="btn btn-primary btn-large">Add meal</button>
            <span class="status-badge status-pro">+ Meal AI</span>
          </article>
          <article class="card" data-testid="card-insights">
            <div class="card-icon" aria-hidden="true">🧠</div>
            <h3>View insights</h3>
            <p>See patterns across stool, meals, symptoms, and notes.</p>
            <button type="button" class="btn btn-accent btn-large">See patterns</button>
            <p class="muted">Available to all subscribers</p>
          </article>
        </div>

        <div class="grid grid-3 data-management">
          <article class="card" data-testid="card-upload">
            <h3>Upload data</h3>
            <p>Sync entries from the QuietGo mobile app in minutes.</p>
            <button type="button" class="btn btn-outline">Upload files</button>
          </article>
          <article class="card" data-testid="card-export">
            <h3>Export data</h3>
            <p>Download CSV or PDF packets tailored for appointments.</p>
            <button type="button" class="btn btn-outline">Export CSV</button>
          </article>
          <article class="card" data-testid="card-share">
            <h3>Smart sharing</h3>
            <p>Create reports for specialists without exposing your full history.</p>
            <button type="button" class="btn btn-outline">Create report</button>
          </article>
        </div>

        <div class="overview-grid">
          <article class="card card-premium" data-testid="card-overview">
            <header>
              <h2>📊 Your health overview</h2>
              <button type="button" class="btn btn-outline">Refresh</button>
            </header>
            <div class="stat-grid">
              <div class="stat-item" data-testid="stat-entries">
                <div class="stat-value" id="totalEntries">24</div>
                <div class="stat-label">Health entries</div>
                <div class="muted">This month</div>
              </div>
              <div class="stat-item" data-testid="stat-sync">
                <div class="stat-value" id="lastSync">2h</div>
                <div class="stat-label">Last sync</div>
                <div class="muted">From mobile app</div>
              </div>
              <div class="stat-item" data-testid="stat-data-size">
                <div class="stat-value" id="dataSize">512MB</div>
                <div class="stat-label">Secure storage</div>
                <div class="muted">Encrypted & private</div>
              </div>
            </div>
            <div class="progress-card">
              <div class="text-right muted">24/30 entries this month</div>
              <div class="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                <span style="width: 80%"></span>
              </div>
            </div>
          </article>
          <aside class="card card-featured" data-testid="card-subscription">
            <div class="card-icon" aria-hidden="true">✨</div>
            <h3>Upgrade to Pro</h3>
            <p>Unlock unlimited tracking, deeper AI analysis, and premium exports.</p>
            <div class="status-badge status-free" id="subscriptionTier">Free plan</div>
            <div class="subscription-details">
              <span><strong>Daily entries</strong><span>3 / 5 used</span></span>
              <span><strong>AI analysis</strong><span>1 / 2 used</span></span>
              <span><strong>Export sharing</strong><span class="muted">Limited</span></span>
            </div>
            <button type="button" class="btn btn-blue btn-large">Upgrade in app</button>
            <p class="muted">Manage subscription from the QuietGo mobile app.</p>
          </aside>
        </div>

        <div class="card recent-files">
          <h3>Recent files</h3>
          <div class="recent-files-list" id="filesList">
            <div class="text-center muted">No files uploaded yet. Use the upload button above to sync your first data.</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="exports">
      <div class="container">
        <div class="grid grid-2">
          <article class="card card-premium">
            <h2>Precision exports</h2>
            <p>Create tailored packets with timelines, notes, and highlights for every appointment.</p>
            <ul class="checklist">
              <li>Select the entry types and date ranges that matter.</li>
              <li>Auto-redact personal identifiers before sharing.</li>
              <li>Deliver securely via download links or print-ready PDF.</li>
            </ul>
            <button type="button" class="btn btn-primary btn-large">Prepare export</button>
          </article>
          <aside class="card card-featured">
            <h3>Queued export</h3>
            <div class="recent-files-list">
              <div class="file-row">
                <span>Dr. Li — GI Specialist</span>
                <span class="status-badge status-premium">Ready</span>
              </div>
              <div class="file-row">
                <span>Range: Last 30 days · Meals, stool, notes</span>
                <span class="muted">Generated 5 minutes ago</span>
              </div>
            </div>
            <button type="button" class="btn btn-accent btn-large">Download packet</button>
          </aside>
        </div>
      </div>
    </section>

    <section class="section" id="support">
      <div class="container">
        <div class="hub-support-grid">
          <div>
            <h2>Need help?</h2>
            <p class="muted">Message us from the QuietGo mobile app or email <a href="mailto:support@quietgo.com">support@quietgo.com</a>. We respond within one business day.</p>
            <p class="muted">Our team can walk through exports, troubleshoot syncs, or connect you with a digestive health specialist.</p>
          </div>
          <div class="support-card">
            <h3>Live status</h3>
            <ul>
              <li>API uptime: 99.98%</li>
              <li>Last sync: 4 minutes ago</li>
              <li>Scheduled maintenance: None</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>
<?php include __DIR__ . '/../includes/footer-hub.php'; ?>
<script src="/js/hub.js" defer></script>
</body>
</html>
