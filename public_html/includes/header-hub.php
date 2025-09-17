<?php require_once $_SERVER['DOCUMENT_ROOT'].'/includes/impersonation.php'; ?>
<?php if (is_impersonating()): ?>
<div style="background:#222; color:#fff; padding:8px 12px; text-align:center;">
  Impersonating <strong><?php echo htmlspecialchars(impersonated_email()); ?></strong>
  — <a href="/admin/stop-impersonation.php" style="color:#cb978a; text-decoration:underline;">Stop</a>
</div>
<?php endif; ?>
<header></header>