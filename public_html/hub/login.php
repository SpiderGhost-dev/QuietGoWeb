<?php
session_start();

if (isset($_SESSION['hub_logged_in']) && $_SESSION['hub_logged_in'] === true) {
    header('Location: /hub.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuietGo Hub Login</title>
    <link rel="stylesheet" href="/css/styles.css">
    <link rel="icon" type="image/png" href="/assets/logo-graphic_1757613896603.png">
    <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
    <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
    <style>
        body {
            background: var(--bg-color, #f9fafb);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            margin: 0;
            padding: 24px;
        }

        .login-wrapper {
            width: 100%;
            max-width: 420px;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
            padding: 32px;
        }

        .login-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-bottom: 24px;
        }

        .login-header img {
            width: 56px;
            height: 56px;
            margin-bottom: 12px;
        }

        .login-header h1 {
            margin: 0;
            font-size: 1.5rem;
            color: var(--heading-color, #0f172a);
        }

        .login-header p {
            margin: 8px 0 0;
            color: var(--muted-text, #6b7280);
            font-size: 0.95rem;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        label {
            font-weight: 600;
            font-size: 0.9rem;
            color: var(--heading-color, #0f172a);
        }

        input[type="email"],
        input[type="password"] {
            width: 100%;
            padding: 12px 14px;
            border-radius: 10px;
            border: 1px solid var(--border-color, #e2e8f0);
            font-size: 1rem;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        input[type="email"]:focus,
        input[type="password"]:focus {
            outline: none;
            border-color: var(--accent-color, #2563eb);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        button[type="submit"] {
            padding: 12px;
            border-radius: 10px;
            border: none;
            background: linear-gradient(135deg, var(--accent-color, #2563eb), var(--accent-dark, #1d4ed8));
            color: #ffffff;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        button[type="submit"]:hover {
            transform: translateY(-1px);
            box-shadow: 0 12px 24px rgba(37, 99, 235, 0.18);
        }

        .help-text {
            margin-top: 16px;
            font-size: 0.85rem;
            color: var(--muted-text, #6b7280);
            text-align: center;
        }

        .help-text a {
            color: var(--accent-color, #2563eb);
            text-decoration: none;
            font-weight: 600;
        }

        .error-message {
            display: none;
            padding: 12px 14px;
            border-radius: 10px;
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.2);
            color: #b91c1c;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="login-wrapper">
        <div class="login-header">
            <img src="/assets/logo-graphic_1757613896603.png" alt="QuietGo logo">
            <h1>QuietGo Hub</h1>
            <p>Sign in with your subscriber account to access your dashboard.</p>
        </div>

        <div id="errorMessage" class="error-message"></div>

        <form id="hubLoginForm">
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" name="email" autocomplete="email" required>
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" autocomplete="current-password" required>
            </div>
            <button type="submit" id="loginButton">Sign In</button>
        </form>

        <div class="help-text">
            Need admin access? <a href="/admin/login.php">Go to the admin console</a>.<br>
            <a href="/">Return to quietgo.com</a>
        </div>
    </div>

    <script>
        const loginForm = document.getElementById('hubLoginForm');
        const errorMessage = document.getElementById('errorMessage');
        const loginButton = document.getElementById('loginButton');

        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';

            const formData = {
                email: loginForm.email.value.trim(),
                password: loginForm.password.value
            };

            if (!formData.email || !formData.password) {
                errorMessage.textContent = 'Please provide both your email address and password.';
                errorMessage.style.display = 'block';
                return;
            }

            loginButton.disabled = true;
            loginButton.textContent = 'Signing In…';

            try {
                const response = await fetch('/hub/api/login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    const payload = await response.json().catch(() => ({ error: 'Unable to sign in.' }));
                    throw new Error(payload.error || 'Invalid login credentials.');
                }

                window.location.href = '/hub.php';
            } catch (error) {
                errorMessage.textContent = error.message || 'Unable to sign in. Please try again.';
                errorMessage.style.display = 'block';
            } finally {
                loginButton.disabled = false;
                loginButton.textContent = 'Sign In';
            }
        });
    </script>
</body>
</html>
