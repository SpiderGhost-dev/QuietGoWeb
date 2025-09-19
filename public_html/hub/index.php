<?php $pageTitle = 'QuietGo Hub — Command center'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo $pageTitle; ?></title>
  <meta name="description" content="QuietGo Hub keeps your digestive health data organised, searchable, and ready to export.">
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/hub/css/hub.css">
  <script src="/js/site.js" defer></script>
</head>
<body>
<?php include __DIR__ . '/../includes/header-hub.php'; ?>
<main>
  <section class="section hub-hero" id="overview">
    <div class="container">
      <h1>Welcome back to your QuietGo Hub</h1>
      <p class="lead">Review synced entries, uncover trends, and prepare exports before every appointment. Everything captured on your phone is here—organised and private by default.</p>
      <div class="hero-summary">
        <div class="summary-card">
          <span class="summary-label">Entries this week</span>
          <span class="summary-value">18</span>
        </div>
        <div class="summary-card">
          <span class="summary-label">Flags to review</span>
          <span class="summary-value">3</span>
        </div>
        <div class="summary-card">
          <span class="summary-label">Exports queued</span>
          <span class="summary-value">1</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section hub-section" id="insights">
    <div class="container insights-layout">
      <div class="insights-column">
        <h2>Latest insights</h2>
        <article class="insight-card">
          <header>
            <h3>Stool frequency normalised</h3>
            <span class="insight-meta">From AI digest • 2 days ago</span>
          </header>
          <p>Average Bristol score moved from 4.5 to 3.8 after consistent fibre tracking. Continue monitoring hydration habits.</p>
        </article>
        <article class="insight-card">
          <header>
            <h3>Meal correlation</h3>
            <span class="insight-meta">Manual tag • 4 days ago</span>
          </header>
          <p>Dairy entries within 12 hours of discomfort events increased by 32%. Consider marking lactose-free substitutions.</p>
        </article>
      </div>
      <aside class="filters-panel">
        <h3>Timeline filters</h3>
        <ul>
          <li>Meals <span class="badge">24</span></li>
          <li>Stool observations <span class="badge">12</span></li>
          <li>Supplements <span class="badge">6</span></li>
          <li>Symptoms <span class="badge">8</span></li>
        </ul>
        <p class="panel-note">Adjust filters to focus on what matters this week. QuietGo keeps raw entries untouched.</p>
      </aside>
    </div>
  </section>

  <section class="section hub-section alt" id="exports">
    <div class="container exports-grid">
      <div class="exports-copy">
        <h2>Precision exports</h2>
        <p class="lead">Share only what is relevant. Build PDF or CSV packets tailored to each appointment without exposing the rest of your history.</p>
        <ul class="checklist">
          <li>Select date ranges, entry types, and notes.</li>
          <li>Auto-redact identifiers before sharing.</li>
          <li>Deliver securely via downloadable link or print-ready PDF.</li>
        </ul>
      </div>
      <div class="exports-card">
        <h3>Queued export</h3>
        <dl>
          <div>
            <dt>Recipient</dt>
            <dd>Dr. Li — GI Specialist</dd>
          </div>
          <div>
            <dt>Range</dt>
            <dd>Last 30 days • Meals, stool, notes</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd><span class="badge ready">Ready</span></dd>
          </div>
        </dl>
        <button class="btn btn-primary" type="button">Download packet</button>
      </div>
    </div>
  </section>

  <section class="section hub-section" id="support">
    <div class="container support-grid">
      <div>
        <h2>Need help?</h2>
        <p class="lead">Message us from the mobile app or email <a href="mailto:support@quietgo.com">support@quietgo.com</a>. We answer within one business day.</p>
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
  </section>
</main>
<?php include __DIR__ . '/../includes/footer-hub.php'; ?>
<script src="/js/hub.js" defer></script>
</body>
</html>
