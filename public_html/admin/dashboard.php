<?php $pageTitle = 'QuietGo Admin Dashboard'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo $pageTitle; ?></title>
  <meta name="description" content="Operational overview for QuietGo administrators.">
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/admin/css/admin.css">
  <script src="/js/site.js" defer></script>
</head>
<body class="admin-dashboard-page">
<?php include __DIR__ . '/../includes/header-admin.php'; ?>
<main class="admin-dashboard-main">
  <div class="container">
    <div class="admin-layout">
      <aside class="admin-sidebar" aria-label="Admin navigation">
        <div class="sidebar-section">
          <p class="sidebar-title">Overview</p>
          <button type="button" class="nav-item active" data-target="analytics" aria-current="true">
            <span class="nav-item-icon" aria-hidden="true">📊</span>
            Analytics Dashboard
          </button>
          <button type="button" class="nav-item" data-target="users">
            <span class="nav-item-icon" aria-hidden="true">👥</span>
            User Management
          </button>
        </div>
        <div class="sidebar-section">
          <p class="sidebar-title">Content</p>
          <button type="button" class="nav-item" data-target="content">
            <span class="nav-item-icon" aria-hidden="true">📝</span>
            Content Management
          </button>
        </div>
        <div class="sidebar-section">
          <p class="sidebar-title">System</p>
          <button type="button" class="nav-item" data-target="settings">
            <span class="nav-item-icon" aria-hidden="true">⚙️</span>
            System Settings
          </button>
        </div>
      </aside>
      <section class="admin-content">
        <div id="analytics" class="content-section active" aria-hidden="false">
          <div class="content-header">
            <h1 class="content-title">Analytics Dashboard</h1>
            <p class="content-subtitle">Monitor your <span class="quietgo-brand"><span class="quiet">Quiet</span><span class="go">Go</span></span> platform performance and user engagement.</p>
          </div>
          <div class="stats-grid">
            <div class="stat-card featured">
              <div class="stat-header">
                <div class="stat-icon">👥</div>
              </div>
              <div class="stat-value">247</div>
              <div class="stat-label">Total Users</div>
              <div class="stat-change positive">+12% this month</div>
            </div>
            <div class="stat-card">
              <div class="stat-header">
                <div class="stat-icon">📈</div>
              </div>
              <div class="stat-value">23</div>
              <div class="stat-label">New Users (30 days)</div>
              <div class="stat-change positive">+8% vs last month</div>
            </div>
            <div class="stat-card">
              <div class="stat-header">
                <div class="stat-icon">📋</div>
              </div>
              <div class="stat-value">1,543</div>
              <div class="stat-label">Total Health Logs</div>
              <div class="stat-change positive">+25% this month</div>
            </div>
            <div class="stat-card">
              <div class="stat-header">
                <div class="stat-icon">📁</div>
              </div>
              <div class="stat-value">89</div>
              <div class="stat-label">File Uploads</div>
              <div class="stat-change positive">+5% this week</div>
            </div>
          </div>
          <div class="data-section">
            <div class="section-header">
              <h3 class="section-title">Recent User Activity</h3>
            </div>
            <div class="loading-state">Real-time analytics data will display here when connected to your backend systems.</div>
          </div>
        </div>

        <div id="users" class="content-section" aria-hidden="true">
          <div class="content-header">
            <h1 class="content-title">User Management</h1>
            <p class="content-subtitle">Manage <span class="quietgo-brand"><span class="quiet">Quiet</span><span class="go">Go</span></span> user accounts and subscriptions.</p>
          </div>
          <div class="data-section">
            <div class="section-header">
              <h3 class="section-title">All Users</h3>
            </div>
            <div class="section-content">
              <table class="data-table">
                <thead>
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Name</th>
                    <th scope="col">Subscription</th>
                    <th scope="col">Meal AI</th>
                    <th scope="col">Created</th>
                    <th scope="col">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>user1@example.com</td>
                    <td>John Doe</td>
                    <td><span class="status-badge status-pro">Pro</span></td>
                    <td>✅</td>
                    <td>Jan 15, 2024</td>
                    <td>2 hours ago</td>
                  </tr>
                  <tr>
                    <td>user2@example.com</td>
                    <td>Jane Smith</td>
                    <td><span class="status-badge status-free">Free</span></td>
                    <td>❌</td>
                    <td>Feb 20, 2024</td>
                    <td>1 day ago</td>
                  </tr>
                  <tr>
                    <td>user3@example.com</td>
                    <td>Mike Johnson</td>
                    <td><span class="status-badge status-pro">Pro</span></td>
                    <td>✅</td>
                    <td>Mar 10, 2024</td>
                    <td>5 minutes ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div id="content" class="content-section" aria-hidden="true">
          <div class="content-header">
            <h1 class="content-title">Content Management</h1>
            <p class="content-subtitle">Manage <span class="quietgo-brand"><span class="quiet">Quiet</span><span class="go">Go</span></span> website content and configuration.</p>
          </div>
          <div class="data-section">
            <div class="section-header">
              <h3 class="section-title">Site Configuration</h3>
            </div>
            <div class="management-grid">
              <button class="management-btn" type="button" onclick="manageHomepage()">
                <span class="management-btn-icon" aria-hidden="true">🏠</span>
                Homepage Content
              </button>
              <button class="management-btn" type="button" onclick="manageFeatures()">
                <span class="management-btn-icon" aria-hidden="true">✨</span>
                Features Section
              </button>
              <button class="management-btn" type="button" onclick="manageTestimonials()">
                <span class="management-btn-icon" aria-hidden="true">💬</span>
                Testimonials
              </button>
              <button class="management-btn" type="button" onclick="manageFAQ()">
                <span class="management-btn-icon" aria-hidden="true">❓</span>
                FAQ Section
              </button>
            </div>
          </div>
        </div>

        <div id="settings" class="content-section" aria-hidden="true">
          <div class="content-header">
            <h1 class="content-title">System Settings</h1>
            <p class="content-subtitle">Configure <span class="quietgo-brand"><span class="quiet">Quiet</span><span class="go">Go</span></span> system settings and administration.</p>
          </div>
          <div class="data-section">
            <div class="section-header">
              <h3 class="section-title">Admin Accounts</h3>
            </div>
            <div class="section-content">
              <table class="data-table">
                <thead>
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Last Login</th>
                    <th scope="col">Created</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>admin</td>
                    <td>admin@quietgo.app</td>
                    <td>System Administrator</td>
                    <td><span class="status-badge status-active">Active</span></td>
                    <td>Now</td>
                    <td>Jan 1, 2024</td>
                  </tr>
                  <tr>
                    <td>spiderghost</td>
                    <td>spiderghost@quietgo.app</td>
                    <td>Spider Ghost</td>
                    <td><span class="status-badge status-active">Active</span></td>
                    <td>Now</td>
                    <td>Jan 1, 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="data-section">
            <div class="section-header">
              <h3 class="section-title">System Configuration</h3>
            </div>
            <div class="management-grid">
              <button class="management-btn" type="button" onclick="manageDatabase()">
                <span class="management-btn-icon" aria-hidden="true">🗄️</span>
                Database Status
              </button>
              <button class="management-btn" type="button" onclick="manageBackups()">
                <span class="management-btn-icon" aria-hidden="true">💾</span>
                Backup System
              </button>
              <button class="management-btn" type="button" onclick="manageLogs()">
                <span class="management-btn-icon" aria-hidden="true">📋</span>
                System Logs
              </button>
              <button class="management-btn" type="button" onclick="manageAPI()">
                <span class="management-btn-icon" aria-hidden="true">🔌</span>
                API Settings
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</main>
<?php include __DIR__ . '/../includes/footer-admin.php'; ?>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    let loggedIn = false;
    try {
      loggedIn = localStorage.getItem('admin_logged_in') === 'true';
    } catch (e) {
      loggedIn = false;
    }

    if (!loggedIn) {
      window.location.href = '/admin/login.php';
      return;
    }

    const adminInfo = document.getElementById('admin-info');
    if (adminInfo) {
      adminInfo.textContent = 'Admin User';
    }

    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(function (item) {
      item.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = item.getAttribute('data-target');
        if (!targetId) {
          return;
        }

        navItems.forEach(function (btn) {
          btn.classList.remove('active');
          btn.setAttribute('aria-current', 'false');
        });

        sections.forEach(function (section) {
          section.classList.remove('active');
          section.setAttribute('aria-hidden', 'true');
        });

        item.classList.add('active');
        item.setAttribute('aria-current', 'true');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.classList.add('active');
          targetSection.setAttribute('aria-hidden', 'false');
        }
      });
    });
  });

  function manageHomepage() {
    alert('Homepage content management will open here. This connects to your content management system.');
  }

  function manageFeatures() {
    alert('Features section management will open here. Edit feature descriptions and benefits.');
  }

  function manageTestimonials() {
    alert('Testimonials management will open here. Add, edit, or remove user testimonials.');
  }

  function manageFAQ() {
    alert('FAQ management will open here. Manage frequently asked questions and answers.');
  }

  function manageDatabase() {
    alert('Database management will open here. Monitor database health and performance.');
  }

  function manageBackups() {
    alert('Backup system will open here. Schedule and manage data backups.');
  }

  function manageLogs() {
    alert('System logs will open here. View application logs and error reports.');
  }

  function manageAPI() {
    alert('API settings will open here. Manage API keys and integration settings.');
  }
</script>
</body>
</html>
