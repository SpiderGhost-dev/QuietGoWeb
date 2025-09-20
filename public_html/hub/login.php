<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

$submittedAction = $_POST['action'] ?? null;
$forgotSuccess = $_SERVER['REQUEST_METHOD'] === 'POST' && $submittedAction === 'forgot';
$emailValue = isset($_POST['email']) ? (string) $_POST['email'] : '';
?>
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
          <img src="/assets/images/logo-graphic.png" alt="QuietGo logo" width="56" height="56" loading="lazy">
          <h1>Access the QuietGo Hub</h1>
          <p>Use the same email and password you set in the QuietGo app to sign in.</p>
        </header>
        <form class="login-form" id="hubLoginForm" method="post" action="">
          <label for="loginEmail">Email address</label>
          <input id="loginEmail" type="email" name="email" required placeholder="you@example.com" value="<?php echo htmlspecialchars($emailValue, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); ?>">
          <label for="loginPassword">Password</label>
          <input id="loginPassword" type="password" name="password" required autocomplete="current-password" placeholder="Enter your password">
          <div class="login-actions" style="display: flex; flex-wrap: wrap; gap: var(--spacing-sm); align-items: center;">
            <button class="btn btn-primary btn-large" type="submit" name="action" value="login">Sign in</button>
            <button class="btn btn-outline" type="submit" name="action" value="forgot" formnovalidate>Forgot password?</button>
          </div>
<?php if ($forgotSuccess): ?>
          <p class="support-note" role="status" style="color: var(--accent-color); margin-top: var(--spacing-sm);">If your email is on file, we'll send password reset instructions shortly.</p>
<?php endif; ?>
        </form>
        <p class="support-note">Need help? Email <a href="mailto:support@quietgo.com">support@quietgo.com</a> and our team will respond within one business day.</p>
      </div>
    </div>
  </section>
</main>
<?php include __DIR__ . '/../includes/footer-hub.php'; ?>
<script>
  (function () {
    const form = document.getElementById('hubLoginForm');
    if (!form) {
      return;
    }

    form.addEventListener('submit', function (event) {
      const submitter = event.submitter;
      if (submitter && submitter.name === 'action' && submitter.value === 'forgot') {
        return;
      }

      event.preventDefault();
      if (typeof trackButtonClick === 'function') {
        trackButtonClick('hub_login_request');
      }
      alert('A secure sign-in link will be delivered once the integration is live.');
    });
  })();
</script>
</body>
</html>
