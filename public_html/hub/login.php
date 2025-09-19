<?php if (session_status() === PHP_SESSION_NONE) { session_start(); } ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QuietGo Hub Login</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/hub/css/hub.css">
  <script src="/js/site.js" defer></script>
</head>
<body class="hub-login">
<?php include __DIR__ . '/../includes/header-hub.php'; ?>
<main>
  <section class="section login-section">
    <div class="container narrow">
      <div class="login-card">
        <header>
          <img src="/assets/images/logo-graphic.png" alt="QuietGo logo" width="48" height="48" loading="lazy">
          <h1>Access the QuietGo Hub</h1>
          <p class="lead">Enter your email to receive a secure sign-in link. We use passwordless authentication for privacy.</p>
        </header>
        <form class="login-form" method="post" action="#" onsubmit="event.preventDefault(); trackButtonClick('hub_login_request'); alert('A secure sign-in link will be delivered once the integration is live.');">
          <label for="loginEmail">Email address</label>
          <input id="loginEmail" type="email" name="email" required placeholder="you@example.com">
          <button class="btn btn-primary" type="submit">Send link</button>
        </form>
        <p class="support-note">Need help? Email <a href="mailto:support@quietgo.com">support@quietgo.com</a>.</p>
      </div>
    </div>
  </section>
</main>
<?php include __DIR__ . '/../includes/footer-hub.php'; ?>
</body>
</html>
