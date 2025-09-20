<?php $pageTitle = 'QuietGo Privacy & Terms'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo $pageTitle; ?></title>
  <meta name="description" content="QuietGo Privacy Policy, Terms of Service, and HIPAA compliance information.">
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/css/public.css">
  <script src="/js/site.js" defer></script>
</head>
<body>
<?php include __DIR__ . '/includes/header-public.php'; ?>
<main>
  <section class="section-hero legal-hero">
    <div class="container text-center">
      <h1 class="hero-title">Privacy &amp; Legal</h1>
      <p class="hero-subtitle">Your privacy and security are our top priorities</p>
    </div>
  </section>

  <section id="privacy" class="section legal-section">
    <div class="container narrow">
      <h2>Privacy Policy</h2>
      <p class="subheading">Last updated: January 2024</p>

      <div>
        <h3>Data Collection</h3>
        <p>QuietGo collects only the minimum data necessary to provide our digestive health tracking services. This includes:</p>
        <ul>
          <li>Health data you voluntarily log (stool observations, meal photos, symptoms)</li>
          <li>Account information (email address, subscription status)</li>
          <li>App usage analytics (anonymized and aggregated)</li>
        </ul>

        <h3>Data Protection</h3>
        <p>Your health data is protected with:</p>
        <ul>
          <li>End-to-end encryption for all sensitive information</li>
          <li>Photos automatically deleted after AI analysis (unless you choose to save them)</li>
          <li>No sharing with third parties without explicit consent</li>
          <li>HIPAA-aware design principles</li>
        </ul>

        <h3>Your Rights</h3>
        <p>You have the right to:</p>
        <ul>
          <li>Access all your stored data</li>
          <li>Export your data in standard formats</li>
          <li>Delete your account and all associated data</li>
          <li>Revoke sharing permissions at any time</li>
        </ul>
      </div>
    </div>
  </section>

  <section id="terms" class="section legal-section">
    <div class="container narrow">
      <h2>Terms of Service</h2>
      <p class="subheading">Last updated: January 2024</p>

      <div>
        <h3>Service Description</h3>
        <p>QuietGo provides digital tools for tracking digestive health patterns. Our service is for general wellness purposes and is not intended as medical advice, diagnosis, or treatment.</p>

        <h3>User Responsibilities</h3>
        <p>By using QuietGo, you agree to:</p>
        <ul>
          <li>Use the service for personal, non-commercial purposes</li>
          <li>Provide accurate information</li>
          <li>Consult healthcare professionals for medical decisions</li>
          <li>Not share your account credentials</li>
        </ul>

        <h3>Subscription Terms</h3>
        <p>Subscription details:</p>
        <ul>
          <li>Monthly and annual billing options available</li>
          <li>Cancel anytime through the app or by contacting support</li>
          <li>Refunds processed according to app store policies</li>
          <li>Features may change with notice to subscribers</li>
        </ul>
      </div>
    </div>
  </section>

  <section id="hipaa" class="section legal-section">
    <div class="container narrow">
      <h2>HIPAA Compliance</h2>
      <p class="subheading">Healthcare privacy standards</p>

      <div>
        <h3>HIPAA-Aware Design</h3>
        <p>While QuietGo is not a covered entity under HIPAA, we follow HIPAA-inspired practices:</p>
        <ul>
          <li>Minimal data collection and storage</li>
          <li>Strong encryption and security measures</li>
          <li>Clear consent processes for data sharing</li>
          <li>User control over data retention and deletion</li>
        </ul>

        <h3>Data Sharing</h3>
        <p>When you choose to share data with friends, family, trainers, or healthcare providers:</p>
        <ul>
          <li>You control what data is shared and with whom</li>
          <li>Sharing can be revoked at any time</li>
          <li>Data is provided in formats useful for clinical review</li>
          <li>No photos are shared by default</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section legal-section">
    <div class="container text-center narrow">
      <h2>Questions?</h2>
      <p>If you have questions about these policies or need to exercise your data rights, contact us at:</p>
      <p class="subheading" style="margin-top: var(--space-md);"><strong>privacy@quietgo.com</strong></p>
      <a href="/index.php" class="btn btn-primary" style="margin-top: var(--space-lg);">Back to Home</a>
    </div>
  </section>
</main>
<?php include __DIR__ . '/includes/footer-public.php'; ?>
</body>
</html>
