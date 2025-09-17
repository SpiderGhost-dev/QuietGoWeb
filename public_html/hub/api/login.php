<?php
session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$email = strtolower(trim($data['email'] ?? ''));
$password = $data['password'] ?? '';

if ($email === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Email and password are required.']);
    exit();
}

$subscribers = [
    'demo@quietgo.com' => [
        'password' => '$2y$12$cqxtHWlh.Gey89DXz7B/ZOX/pUhHXfv2YEhiafut09yY/qFDkiFt6',
        'firstName' => 'Demo',
        'lastName' => 'User'
    ],
    'wellness@quietgo.com' => [
        'password' => '$2y$12$QU5nUPnx8GFvkvcZjYS1zu57EZWQV.d6M/pi4IczAHncUQf6zWlg2',
        'firstName' => 'Wellness',
        'lastName' => 'Member'
    ]
];

if (!isset($subscribers[$email]) || !password_verify($password, $subscribers[$email]['password'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid email or password.']);
    exit();
}

$subscriber = $subscribers[$email];

session_regenerate_id(true);
$_SESSION['hub_logged_in'] = true;
$_SESSION['hub_user'] = [
    'email' => $email,
    'firstName' => $subscriber['firstName'],
    'lastName' => $subscriber['lastName'],
    'subscriptionStatus' => 'active',
    'subscriptionPlan' => 'pro_monthly'
];

echo json_encode([
    'success' => true,
    'user' => $_SESSION['hub_user']
]);
