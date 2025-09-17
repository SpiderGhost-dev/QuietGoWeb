<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/includes/impersonation.php';
// Basic form handler
if ($_SERVER['REQUEST_METHOD']==='POST') {
  $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
  if ($email) {
    $_SESSION['impersonated_email'] = $email;
    header("Location: /hub.php");
    exit;
  }
}
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Impersonate User</title>
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
  <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
  <link rel="stylesheet" href="/css/styles.css">
  <script src="/js/site.js" defer></script>
</head>
<body>
<?php include $_SERVER['DOCUMENT_ROOT'].'/includes/header-admin.php'; ?>
<main class="container section-dark-2" style="padding:24px; margin-top:24px; border-radius:12px;">
  <h1 style="margin-bottom:16px;">Impersonate User</h1>
  <form method="post" action="/admin/impersonate.php">
    <label for="email">User Email</label><br>
    <input id="email" name="email" type="email" placeholder="user@example.com" required style="padding:8px; margin:8px 0; width:300px;"><br>
    <button type="submit" style="padding:8px 16px;">Start Impersonation</button>
  </form>
  <?php if (is_impersonating()): ?>
    <p style="margin-top:16px;">Currently impersonating: <strong><?php echo htmlspecialchars(impersonated_email()); ?></strong></p>
    <p><a href="/admin/stop-impersonation.php">Stop impersonating</a></p>
  <?php endif; ?>
</main>
<?php include $_SERVER['DOCUMENT_ROOT'].'/includes/footer-admin.php'; ?>
</body>
</html>
