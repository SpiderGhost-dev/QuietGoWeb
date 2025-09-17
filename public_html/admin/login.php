<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuietGo Admin Login</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 50px; background: #f0f0f0; }
        .login-card { background: white; padding: 30px; border-radius: 8px; max-width: 400px; margin: 0 auto; }
        input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; }
        button { width: 100%; padding: 10px; background: #2563eb; color: white; border: none; border-radius: 4px; }
    </style>
<link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
<link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
<script src="/js/site.js" defer></script>
</head>
<body>
    <div class="login-card">
        <h1>QuietGo Admin</h1>
        <form id="loginForm">
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    </div>
    
    <script>
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if ((username === 'spiderghost' && password === 'TempAdmin2024') || 
                (username === 'admin' && password === 'admin123')) {
                localStorage.setItem('admin_logged_in', 'true');
                window.location.href="/admin/dashboard.php";
            } else {
                alert('Invalid credentials');
            }
        });
    </script>
</body>
</html>