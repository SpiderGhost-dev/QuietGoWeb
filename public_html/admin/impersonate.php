<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/includes/impersonation.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
  if ($email) {
    $_SESSION['impersonated_email'] = $email;
    header('Location: /hub/');
    exit;
  }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Impersonate User</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/admin/css/admin.css">
  <script src="/js/site.js" defer></script>
</head>
<body>
<?php include __DIR__ . '/../includes/header-admin.php'; ?>
<main>
  <section class="section admin-form">
    <div class="container narrow">
      <h1>Impersonate user</h1>
      <p class="lead">Temporarily view the Hub exactly as a subscriber sees it. All activity is audited.</p>
      <form class="impersonate-form" method="post" action="/admin/impersonate.php">
        <label for="email">User email</label>
        <input id="email" name="email" type="email" required placeholder="user@example.com">
        <button class="btn btn-primary" type="submit">Start impersonation</button>
      </form>
      <?php if (is_impersonating()): ?>
        <div class="impersonation-active">
          <p>Currently impersonating <strong><?php echo htmlspecialchars(impersonated_email()); ?></strong></p>
          <a class="btn btn-outline" href="/admin/stop-impersonation.php">Stop impersonation</a>
        </div>
      <?php endif; ?>
    </div>
  </section>
</main>
<?php include __DIR__ . '/../includes/footer-admin.php'; ?>
</body>
</html>
