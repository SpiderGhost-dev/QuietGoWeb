<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['hub_logged_in']) || $_SESSION['hub_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit();
}

$user = $_SESSION['hub_user'] ?? null;

if (!$user) {
    http_response_code(500);
    echo json_encode(['error' => 'Unable to load account details.']);
    exit();
}

echo json_encode($user);
