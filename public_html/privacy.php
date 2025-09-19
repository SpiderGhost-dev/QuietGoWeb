<?php $pageTitle = 'QuietGo Privacy & Terms'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo $pageTitle; ?></title>
  <meta name="description" content="QuietGo Privacy Policy, Terms of Service, and HIPAA notice.">
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/css/public.css">
  <script src="/js/site.js" defer></script>
</head>
<body>
<?php include __DIR__ . '/includes/header-public.php'; ?>
<main>
  <section class="section hero legal-hero" id="privacy">
    <div class="container narrow">
      <p class="eyebrow">Privacy &amp; legal</p>
      <h1>We keep your health story yours</h1>
      <p class="lead">QuietGo protects your data with HIPAA-aware infrastructure, encrypted storage, and strict sharing controls. These policies explain how.</p>
    </div>
  </section>

  <section class="section legal-section" id="policy">
    <div class="container narrow">
      <h2>Privacy Policy</h2>
      <p class="subhead">Last updated: January 2024</p>
      <h3>Data we collect</h3>
      <p>We collect only what is necessary to deliver QuietGo services:</p>
      <ul>
        <li>Entries you log in the mobile apps or Hub, including stool observations, meals, symptoms, photos, and notes.</li>
        <li>Account details such as your name, email address, and subscription plan.</li>
        <li>Usage metrics that help us improve performance and reliability.</li>
      </ul>
      <h3>How we use data</h3>
      <p>Your information is used to sync entries across devices, surface personalised insights, and power exports you explicitly generate. We never sell your data or use it for advertising.</p>
      <h3>Data retention &amp; deletion</h3>
      <p>You control your data. Delete an entry to remove it from all surfaces. Contact <a href="mailto:privacy@quietgo.com">privacy@quietgo.com</a> for account deletion requests.</p>
    </div>
  </section>

  <section class="section legal-section alt" id="terms">
    <div class="container narrow">
      <h2>Terms of Service</h2>
      <p>QuietGo is a general wellness tool. It does not diagnose, treat, cure, or prevent disease, and it should not replace guidance from qualified healthcare professionals.</p>
      <ul>
        <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
        <li>Exports are intended for sharing with clinicians you trust. Always review before distributing.</li>
        <li>We may update these terms as our services evolve; material changes will be communicated in-app or via email.</li>
      </ul>
    </div>
  </section>

  <section class="section legal-section" id="hipaa">
    <div class="container narrow">
      <h2>HIPAA Notice</h2>
      <p>QuietGo implements administrative, physical, and technical safeguards aligned with HIPAA guidelines. We sign BAAs with partners that receive Protected Health Information from QuietGo customers.</p>
      <p>If you believe your privacy has been compromised, notify us immediately at <a href="mailto:security@quietgo.com">security@quietgo.com</a>.</p>
    </div>
  </section>
</main>
<?php include __DIR__ . '/includes/footer-public.php'; ?>
</body>
</html>
