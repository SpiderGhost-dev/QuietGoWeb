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
<body>
<?php include __DIR__ . '/../includes/header-admin.php'; ?>
<main>
  <section class="section admin-hero">
    <div class="container">
      <h1>Operational snapshot</h1>
      <p class="lead">Monitor account activity, review flagged entries, and manage support escalations.</p>
      <div class="stat-row">
        <div class="stat-card">
          <span class="stat-label">Active subscriptions</span>
          <span class="stat-value">1,248</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Support tickets</span>
          <span class="stat-value">5</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Impersonations</span>
          <span class="stat-value">0</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section admin-grid">
    <div class="container grid two-columns">
      <article class="card">
        <header class="card-header">
          <h2>Flagged entries</h2>
          <a class="link" href="/admin/impersonate.php">Impersonate user</a>
        </header>
        <ul class="flag-list">
          <li>
            <span class="flag-title">Potential trigger detected</span>
            <span class="flag-meta">User: emily@quietgo.com • 2 hours ago</span>
          </li>
          <li>
            <span class="flag-title">Export delivery failed</span>
            <span class="flag-meta">User: sam@quietgo.com • 6 hours ago</span>
          </li>
          <li>
            <span class="flag-title">New clinician invite pending</span>
            <span class="flag-meta">User: casey@quietgo.com • 1 day ago</span>
          </li>
        </ul>
      </article>

      <article class="card">
        <header class="card-header">
          <h2>System status</h2>
          <button class="btn btn-outline" type="button">Refresh</button>
        </header>
        <dl class="status-list">
          <div>
            <dt>API uptime</dt>
            <dd>99.98%</dd>
          </div>
          <div>
            <dt>Sync queue</dt>
            <dd>12 pending</dd>
          </div>
          <div>
            <dt>Last release</dt>
            <dd>v2024.08.18</dd>
          </div>
        </dl>
      </article>
    </div>
  </section>

  <section class="section admin-grid">
    <div class="container grid two-columns">
      <article class="card">
        <header class="card-header">
          <h2>Support escalations</h2>
          <a class="link" href="mailto:support@quietgo.com">Email support</a>
        </header>
        <ul class="flag-list">
          <li>
            <span class="flag-title">Sync delay investigation</span>
            <span class="flag-meta">Assigned to Priya • ETA 2h</span>
          </li>
          <li>
            <span class="flag-title">Export formatting request</span>
            <span class="flag-meta">Assigned to Alex • ETA 1d</span>
          </li>
        </ul>
      </article>

      <article class="card">
        <header class="card-header">
          <h2>Recent logins</h2>
        </header>
        <table class="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Last active</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>mia@quietgo.com</td>
              <td>Support</td>
              <td>12 minutes ago</td>
            </tr>
            <tr>
              <td>fernando@quietgo.com</td>
              <td>Operations</td>
              <td>45 minutes ago</td>
            </tr>
            <tr>
              <td>zara@quietgo.com</td>
              <td>Analyst</td>
              <td>1 hour ago</td>
            </tr>
          </tbody>
        </table>
      </article>
    </div>
  </section>
</main>
<?php include __DIR__ . '/../includes/footer-admin.php'; ?>
</body>
</html>
