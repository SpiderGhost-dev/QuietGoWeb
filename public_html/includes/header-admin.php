<header class="site-header">
        <div class="container">
            <div class="header-content">
                <div class="header-brand">
                    <img src="../assets/logo-graphic_1757613896603.png" alt="QuietGo Logo">
                    <div class="brand-text">
                        <span class="quiet">Quiet</span><span class="go">Go</span>
                    </div>
                    <span class="hub-text">Hub • Admin</span>
                </div>
                
                <div class="header-nav">
                    
                    <button class="header-nav-link active">Admin</button>
                    <a href="../index.php" class="header-nav-link">Main Site</a>
                    
                    <div class="admin-user-info">
                        <span id="admin-info">Admin User</span>
                        <button class="logout-btn" onclick="logout()">Logout</button>
                    </div>
                </div>
                
                <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>

            <!-- Mobile Menu -->
            <div class="mobile-nav" id="mobileNav">
                <a href="/admin/dashboard.php" class="header-nav-link">Dashboard</a>
                <button class="header-nav-link active">Admin</button>
                <a href="../index.php" class="header-nav-link">Main Site</a>
                <div style="margin-top: var(--spacing-md); padding-top: var(--spacing-md); border-top: 1px solid var(--border-color);">
                    <button class="logout-btn" onclick="logout()">Logout</button>
                </div>
            </div>
        </div>
    </header>