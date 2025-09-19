<?php $pageTitle = 'QuietGo — Your gut talks. QuietGo translates.'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo $pageTitle; ?></title>
  <meta name="description" content="Discover digestive health insights with private, AI-powered stool and meal tracking. Download QuietGo on iOS and Android.">
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/css/public.css">
  <script src="/js/site.js" defer></script>
</head>
<body>
<?php include __DIR__ . '/includes/header-public.php'; ?>
<main>
  <section class="section hero" id="top">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Digestive health, decoded</p>
        <h1>Your gut talks.<br><span class="quietgo-brand"><span class="quiet">Quiet</span><span class="go">Go</span></span> translates.</h1>
        <p class="lead">Capture every stool and meal in seconds. QuietGo transforms your notes, photos, and questions into patterns you can trust.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="/hub/login.php">Get started in the Hub</a>
          <a class="btn btn-outline" href="/#features">See features</a>
        </div>
        <ul class="hero-list">
          <li>Fast capture on iOS &amp; Android</li>
          <li>On-device privacy with secure sync</li>
          <li>Insights designed with clinicians</li>
        </ul>
      </div>
      <div class="hero-visual">
        <figure class="hero-card">
          <img src="/assets/images/logo.png" alt="QuietGo mark" loading="lazy">
          <figcaption>Your command center for gut health.</figcaption>
        </figure>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">82%</span>
            <span class="stat-label">Log within 30 seconds</span>
          </div>
          <div class="stat">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Insights wherever you are</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="features">
    <div class="container">
      <div class="section-header">
        <h2>Everything from plate to pattern</h2>
        <p class="lead">QuietGo captures every detail, then surfaces what matters with compassionate, clinician-informed language.</p>
      </div>
      <div class="feature-grid">
        <article class="card">
          <h3>Capture</h3>
          <p>Log stool, meals, symptoms, and context in seconds. Attach photos, voice notes, or quick taps—QuietGo keeps up with real life.</p>
        </article>
        <article class="card">
          <h3>Connect</h3>
          <p>Automatic timelines, pattern highlights, and correlations make it clear what your body is trying to say.</p>
        </article>
        <article class="card">
          <h3>Act</h3>
          <p>Download clinician-ready exports, set nudges, and share select entries without exposing the rest of your story.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section alt" id="insights">
    <div class="container insights-grid">
      <div class="insights-copy">
        <h2>Designed for living, trusted by pros</h2>
        <p class="lead">QuietGo is the companion to our full-featured mobile apps. The Hub extends your data with richer context, analytics, and export tools.</p>
        <ul class="checklist">
          <li>Timeline filters for food, stool, supplements, and mood</li>
          <li>AI summaries tuned for GI specialists</li>
          <li>HIPAA-aware infrastructure, encrypted at rest and in transit</li>
        </ul>
      </div>
      <div class="insights-panel">
        <div class="panel-card">
          <h3>Weekly digest</h3>
          <p>Get a Monday-morning recap highlighting trends, outliers, and suggested follow-ups before your appointment.</p>
        </div>
        <div class="panel-card">
          <h3>Precision exports</h3>
          <p>Generate PDFs and CSVs that focus on what your clinician needs—complete histories stay private by default.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="download">
    <div class="container download-grid">
      <div class="download-copy">
        <h2>Download QuietGo</h2>
        <p class="lead">Available on iOS and Android. Sign in to the Hub to organise, annotate, and export everything you capture on the go.</p>
        <div class="store-buttons">
          <a class="store" href="#" onclick="handleAppStore(); return false;" aria-label="Download QuietGo on the App Store">
            <span class="store-label">Download on the</span>
            <span class="store-name">App Store</span>
          </a>
          <a class="store" href="#" onclick="handlePlayStore(); return false;" aria-label="Download QuietGo on Google Play">
            <span class="store-label">Get it on</span>
            <span class="store-name">Google Play</span>
          </a>
        </div>
      </div>
      <div class="download-card">
        <h3>Stay in sync</h3>
        <ul class="checklist">
          <li>Private cloud backup with offline-first mobile apps</li>
          <li>Two-way sync between Hub and phone</li>
          <li>Export snapshots before every appointment</li>
        </ul>
        <a class="btn btn-primary" href="/hub/login.php">Open the Hub</a>
      </div>
    </div>
  </section>
</main>
<?php include __DIR__ . '/includes/footer-public.php'; ?>
</body>
</html>
