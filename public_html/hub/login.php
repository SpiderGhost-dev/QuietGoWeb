<?php
if (session_status() === PHP_SESSION_NONE) { session_start(); }

require_once __DIR__ . '/../includes/hub-auth.php';
require_once __DIR__ . '/../includes/impersonation.php';

$feedback = [
  'error' => null,
  'success' => null,
];

$ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

if (isset($_GET['logout'])) {
  hub_logout();
  if (is_impersonating()) {
    unset($_SESSION['impersonated_email']);
  }
  $feedback['success'] = 'You have been signed out of the QuietGo Hub.';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action = $_POST['action'] ?? 'login';
  $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);

  if (!$email) {
    $feedback['error'] = 'Enter a valid email address to continue.';
    hub_record_audit($_POST['email'] ?? '', 'invalid_email');
  } elseif ($action === 'forgot') {
    hub_dispatch_password_reset($email);
    $feedback['success'] = 'If that email is on file, you’ll receive reset instructions through the QuietGo app shortly.';
  } else {
    if (hub_rate_limit_exceeded($ipAddress)) {
      $feedback['error'] = 'Too many login attempts. Please wait 15 minutes before trying again.';
      hub_record_audit($email, 'rate_limited');
    } else {
      $password = $_POST['password'] ?? '';

      if (!$password) {
        $feedback['error'] = 'Enter your password to sign in.';
        hub_record_audit($email, 'missing_password');
      } else {
        $subscriber = hub_find_subscriber($email);

        if (!$subscriber) {
          hub_register_login_attempt($ipAddress);
          $feedback['error'] = 'That email or password didn’t match our records. Please try again.';
          hub_record_audit($email, 'unknown_user');
        } elseif ($subscriber['subscription_status'] !== 'active') {
          hub_register_login_attempt($ipAddress);
          $feedback['error'] = 'QuietGo Hub is for subscribers. Please subscribe in the QuietGo app first.';
          hub_record_audit($email, 'inactive_subscription', ['plan' => $subscriber['subscription_plan']]);
        } elseif (!password_verify($password, $subscriber['password_hash'])) {
          hub_register_login_attempt($ipAddress);
          $feedback['error'] = 'That email or password didn’t match our records. Please try again.';
          hub_record_audit($email, 'invalid_password');
        } else {
          hub_login($subscriber, $email);
          hub_clear_attempts($ipAddress);
          hub_record_audit($email, 'login_success', [
            'plan' => $subscriber['subscription_plan'],
          ]);
          header('Location: /hub/');
          exit;
        }
      }
    }
  }
}

$loginEmail = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
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
          <p>Use the same email and password you created in the QuietGo mobile app to continue to your Hub dashboard.</p>
        </header>
        <?php if ($feedback['error']): ?>
          <div class="alert alert-error" role="alert"><?php echo htmlspecialchars($feedback['error']); ?></div>
        <?php endif; ?>
        <?php if ($feedback['success']): ?>
          <div class="alert alert-success" role="status"><?php echo htmlspecialchars($feedback['success']); ?></div>
        <?php endif; ?>
        <form class="login-form" method="post" action="/hub/login.php" onsubmit="trackButtonClick('hub_login_submit');">
          <label for="loginEmail">Email address</label>
          <input id="loginEmail" type="email" name="email" required placeholder="you@example.com" autocomplete="username" value="<?php echo $loginEmail; ?>">
          <label for="loginPassword">Password</label>
          <input id="loginPassword" type="password" name="password" required placeholder="Enter your password" autocomplete="current-password">
          <div class="form-actions">
            <button class="btn btn-primary btn-large" type="submit" name="action" value="login">Sign in</button>
            <button class="btn btn-ghost" type="submit" name="action" value="forgot" formnovalidate>Forgot password?</button>
          </div>
        </form>
        <p class="support-note">QuietGo Hub access is available to current subscribers. Need help? Email <a href="mailto:support@quietgo.com">support@quietgo.com</a> and our team will respond within one business day.</p>
      </div>
    </div>
  </section>
</main>
<?php include __DIR__ . '/../includes/footer-hub.php'; ?>
</body>
</html>
