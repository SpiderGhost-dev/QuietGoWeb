<header>
  <nav class="navbar" aria-label="Admin navigation">
    <div class="container">
      <div class="nav-content">
        <a class="nav-brand" href="/admin/dashboard.php">
          <img src="/assets/images/logo-graphic.png" alt="QuietGo logo" width="36" height="36" loading="lazy">
          <div class="brand-stack">
            <span class="quietgo-brand">
              <span class="quiet">Quiet</span><span class="go">Go</span>
            </span>
            <span class="brand-subtitle">Admin</span>
          </div>
        </a>

        <div class="nav-links" role="navigation">
          <a href="/hub/" class="nav-link">View Hub</a>
          <a href="/admin/impersonate.php" class="nav-link">Impersonate User</a>
          <a href="/" class="nav-link">Public Site</a>
        </div>

        <div class="nav-actions">
          <span class="admin-identity" id="admin-info">Admin User</span>
          <button class="btn btn-outline" type="button" onclick="logout()">Logout</button>
        </div>

        <button class="mobile-menu-btn" type="button" aria-expanded="false" aria-controls="mobileMenu" onclick="toggleMobileMenu(this)">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span class="sr-only">Toggle navigation</span>
        </button>
      </div>

      <div class="mobile-menu" id="mobileMenu">
        <a href="/hub/" class="nav-link">View Hub</a>
        <a href="/admin/impersonate.php" class="nav-link">Impersonate User</a>
        <a href="/" class="nav-link">Public Site</a>
        <button class="btn btn-outline" type="button" onclick="logout()">Logout</button>
      </div>
    </div>
  </nav>
</header>
