<?php if (session_status() === PHP_SESSION_NONE) { session_start(); } ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuietGo Hub Login</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;family=Playfair+Display:wght@400;600;700&amp;display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/css/styles.css">
    <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
    <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
    <script src="/js/site.js" defer></script>
    <style>
        body {
            margin: 0;
            font-family: 'Inter', sans-serif;
            background: var(--bg-page, #0a0a0a);
            color: #fff;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .login-wrapper {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 48px 16px;
        }
        .login-card {
            background: var(--bg-section-1, #0d0d0d);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4);
            padding: 40px;
            max-width: 420px;
            width: 100%;
        }
        .login-card header {
            text-align: center;
            margin-bottom: 32px;
        }
        .login-card header img {
            width: 48px;
            height: 48px;
        }
        .login-card header h1 {
            margin: 16px 0 8px;
            font-size: 1.75rem;
            font-weight: 600;
        }
        .login-card header p {
            margin: 0;
            font-size: 0.95rem;
            color: rgba(255,255,255,0.7);
        }
        .form-field {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 20px;
        }
        .form-field label {
            font-size: 0.9rem;
            font-weight: 500;
            color: rgba(255,255,255,0.8);
        }
        .form-field input {
            padding: 12px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.1);
            background: rgba(10,10,10,0.6);
            color: #fff;
            font-size: 1rem;
        }
        .form-field input:focus {
            outline: none;
            border-color: var(--go-color, #cb978a);
            box-shadow: 0 0 0 3px rgba(203,151,138,0.25);
        }
        .error-message {
            color: #ff6b6b;
            font-size: 0.875rem;
            margin: 4px 0 16px;
            min-height: 18px;
        }
        .login-submit {
            width: 100%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 14px;
            border: none;
            border-radius: 10px;
            background: var(--go-color, #cb978a);
            color: #0a0a0a;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s ease, transform 0.2s ease;
        }
        .login-submit:hover:not([disabled]) {
            background: #dba69b;
            transform: translateY(-1px);
        }
        .login-submit[disabled] {
            cursor: not-allowed;
            opacity: 0.7;
        }
        .support-note {
            text-align: center;
            margin-top: 24px;
            font-size: 0.85rem;
            color: rgba(255,255,255,0.6);
        }
        .support-note a {
            color: var(--go-color, #cb978a);
            text-decoration: none;
            font-weight: 500;
        }
        .support-note a:hover {
            text-decoration: underline;
        }
        @media (max-width: 480px) {
            .login-card {
                padding: 32px 24px;
            }
        }
    </style>
</head>
<body>
    <?php include $_SERVER['DOCUMENT_ROOT'].'/includes/header-hub.php'; ?>
    <main class="login-wrapper">
        <section class="login-card" aria-labelledby="hub-login-title">
            <header>
                <img src="/assets/images/logo-graphic.png" alt="QuietGo logo">
                <h1 id="hub-login-title">QuietGo Hub</h1>
                <p>Sign in with your subscriber account to continue.</p>
            </header>
            <form id="hubLoginForm" novalidate>
                <div class="form-field">
                    <label for="hub-email">Email address</label>
                    <input type="email" id="hub-email" name="email" autocomplete="email" required placeholder="you@example.com">
                </div>
                <div class="form-field">
                    <label for="hub-password">Password</label>
                    <input type="password" id="hub-password" name="password" autocomplete="current-password" required placeholder="Enter your password">
                </div>
                <p id="hub-login-error" class="error-message" role="alert" aria-live="polite"></p>
                <button type="submit" class="login-submit" id="hub-login-submit">
                    <span>Sign In</span>
                </button>
            </form>
            <p class="support-note">Need help? Email <a href="mailto:support@quietgo.com">support@quietgo.com</a>.</p>
        </section>
    </main>
    <?php include $_SERVER['DOCUMENT_ROOT'].'/includes/footer-hub.php'; ?>
    <script>
        const loginForm = document.getElementById('hubLoginForm');
        const loginButton = document.getElementById('hub-login-submit');
        const errorContainer = document.getElementById('hub-login-error');

        async function handleLoginRedirect(event) {
            event.preventDefault();

            if (!loginForm) {
                return;
            }

            const formData = new FormData(loginForm);
            const email = (formData.get('email') || '').toString().trim();
            const password = (formData.get('password') || '').toString();

            errorContainer.textContent = '';

            if (!email || !password) {
                errorContainer.textContent = 'Email and password are required.';
                return;
            }

            loginButton.disabled = true;
            loginButton.innerHTML = '<span>Signing in…</span>';

            try {
                const response = await fetch('/hub/api/login.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json().catch(() => null);

                const success = Boolean(
                    response.ok && data && (
                        typeof data.success === 'undefined'
                            ? !data.error
                            : data.success
                    )
                );

                if (!success) {
                    const message = data?.message || data?.error || 'We could not sign you in. Check your details and try again.';
                    throw new Error(message);
                }

                window.location.href = '/hub/';
            } catch (error) {
                const fallback = 'Unable to sign in. Please verify your email and password and try again.';
                errorContainer.textContent = error instanceof Error && error.message ? error.message : fallback;
            } finally {
                loginButton.disabled = false;
                loginButton.innerHTML = '<span>Sign In</span>';
            }
        }

        loginForm?.addEventListener('submit', handleLoginRedirect);
    </script>
</body>
</html>
