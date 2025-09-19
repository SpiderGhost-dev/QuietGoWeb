<?php require_once $_SERVER['DOCUMENT_ROOT'].'/includes/impersonation.php'; ?>
<?php if (is_impersonating()): ?>
<div style="background:#222; color:#fff; padding:8px 12px; text-align:center;">
  Impersonating <strong><?php echo htmlspecialchars(impersonated_email()); ?></strong>
  — <a href="/admin/stop-impersonation.php" style="color:#cb978a; text-decoration:underline;">Stop</a>
</div>
<?php endif; ?>
<header>
  <nav class="navbar">
    <div class="container">
      <div class="nav-content">
        <div class="nav-brand">
          <img src="/assets/images/logo-graphic.png" alt="QuietGo Logo" style="width: 40px; height: 40px;" loading="lazy">
          <div>
            <span class="quietgo-brand">
              <span class="quiet">Quiet</span><span class="go">Go</span>
            </span>
            <span class="muted" style="margin-left: 8px; font-size: 0.875rem;">Hub</span>
          </div>
        </div>

        <div class="nav-links">
          <a href="/hub/" class="nav-link">Dashboard</a>
          <span id="userProfile" class="nav-profile" style="display: flex; align-items: center; gap: 12px;">
            <img
              id="userAvatar"
              src=""
              alt="Profile avatar"
              style="width: 32px; height: 32px; border-radius: 50%; display: none;"
            >
            <div style="display: flex; flex-direction: column; align-items: flex-end;">
              <span id="userName" class="muted" style="font-size: 0.875rem; font-weight: 500;"></span>
              <span id="userSubscription" class="status-badge status-free" style="font-size: 0.625rem;">Free</span>
            </div>
          </span>
          <button class="btn btn-outline" onclick="handleSignOut()">Sign Out</button>
        </div>

        <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="mobile-menu" id="mobileMenu">
        <a href="/hub/" class="nav-link">Dashboard</a>
        <div style="padding: 16px 0; border-bottom: 1px solid var(--border-color);">
          <div id="userProfileMobile" style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <img
              id="userAvatarMobile"
              src=""
              alt="Profile avatar"
              style="width: 32px; height: 32px; border-radius: 50%; display: none;"
            >
            <span id="userNameMobile" class="muted"></span>
          </div>
          <span id="userSubscriptionMobile" class="status-badge status-free">Free</span>
        </div>
        <button class="btn btn-outline" onclick="handleSignOut()" style="margin-top: 16px;">Sign Out</button>
      </div>
    </div>
  </nav>
</header>
