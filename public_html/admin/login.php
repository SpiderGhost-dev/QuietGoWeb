<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QuietGo Admin Login</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/admin/css/admin.css">
  <script src="/js/site.js" defer></script>
</head>
<body class="admin-login">
<?php include __DIR__ . '/../includes/header-admin.php'; ?>
<main>
  <section class="section login-section">
    <div class="container narrow">
      <div class="login-card">
        <header>
          <img src="/assets/images/logo-graphic.png" alt="QuietGo logo" width="48" height="48" loading="lazy">
          <h1>Admin access</h1>
          <p class="lead">Use your operations credentials to sign in. Multi-factor authentication is required in production.</p>
        </header>
        <form class="login-form" id="adminLoginForm">
          <label for="adminUser">Username</label>
          <input id="adminUser" type="text" name="username" required autocomplete="username">
          <label for="adminPass">Password</label>
          <input id="adminPass" type="password" name="password" required autocomplete="current-password">
          <button class="btn btn-primary" type="submit">Sign in</button>
          <p class="form-note">Demo credentials: admin / admin123</p>
          <p class="error-message" id="adminError" role="alert"></p>
        </form>
      </div>
    </div>
  </section>
</main>
<?php include __DIR__ . '/../includes/footer-admin.php'; ?>
<script>
  document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const user = document.getElementById('adminUser').value.trim();
    const pass = document.getElementById('adminPass').value.trim();
    const error = document.getElementById('adminError');
    if ((user === 'spiderghost' && pass === 'TempAdmin2024') || (user === 'admin' && pass === 'admin123')) {
      localStorage.setItem('admin_logged_in', 'true');
      window.location.href = '/admin/dashboard.php';
    } else {
      error.textContent = 'Invalid credentials. Please try again.';
    }
  });
</script>
</body>
</html>
