<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/includes/impersonation.php';
?>
<?php if (is_impersonating()): ?>
<div class="impersonation-banner">
  Impersonating <strong><?php echo htmlspecialchars(impersonated_email()); ?></strong>
  <a href="/admin/stop-impersonation.php" class="impersonation-stop">Stop</a>
</div>
<?php endif; ?>
<header>
  <nav class="navbar" aria-label="Hub navigation">
    <div class="container">
      <div class="nav-content">
        <a class="nav-brand" href="/hub/">
          <img src="/assets/images/logo-graphic.png" alt="QuietGo logo" width="40" height="40" loading="lazy">
          <div class="brand-stack">
            <span class="quietgo-brand"><span class="quiet">Quiet</span><span class="go">Go</span></span>
            <span class="brand-subtitle">Hub</span>
          </div>
        </a>
        <div class="nav-links" role="navigation">
          <a href="/hub/" class="nav-link">Overview</a>
          <a href="/hub/#insights" class="nav-link">Insights</a>
          <a href="/hub/#exports" class="nav-link">Exports</a>
          <a href="/hub/#support" class="nav-link">Support</a>
        </div>
        <div class="nav-profile" id="userProfile">
          <img id="userAvatar" src="" alt="" aria-hidden="true">
          <div class="nav-profile-info">
            <span id="userName" class="muted"></span>
            <span id="userSubscription" class="status-badge status-free">Free</span>
          </div>
        </div>
        <a class="btn btn-outline" href="/hub/login.php">Switch Account</a>
        <button class="mobile-menu-btn" type="button" aria-expanded="false" aria-controls="mobileMenu" onclick="toggleMobileMenu(this)">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span class="sr-only">Toggle navigation</span>
        </button>
      </div>
      <div class="mobile-menu" id="mobileMenu">
        <a href="/hub/" class="nav-link">Overview</a>
        <a href="/hub/#insights" class="nav-link">Insights</a>
        <a href="/hub/#exports" class="nav-link">Exports</a>
        <a href="/hub/#support" class="nav-link">Support</a>
        <div class="nav-profile" id="userProfileMobile">
          <img id="userAvatarMobile" src="" alt="" aria-hidden="true">
          <div class="nav-profile-info">
            <span id="userNameMobile" class="muted"></span>
            <span id="userSubscriptionMobile" class="status-badge status-free">Free</span>
          </div>
        </div>
        <a class="btn btn-outline" href="/hub/login.php">Switch Account</a>
      </div>
    </div>
  </nav>
</header>
