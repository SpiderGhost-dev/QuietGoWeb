<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['hub_logged_in']) || $_SESSION['hub_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit();
}

if (!isset($_SESSION['hub_health_logs'])) {
    $_SESSION['hub_health_logs'] = [
        [
            'id' => 1,
            'type' => 'stool',
            'createdAt' => date(DATE_ATOM, strtotime('-2 hours')),
            'notes' => 'Routine check-in with healthy results.'
        ],
        [
            'id' => 2,
            'type' => 'meal',
            'createdAt' => date(DATE_ATOM, strtotime('-1 day')),
            'notes' => 'Logged dinner with photo analysis.'
        ],
        [
            'id' => 3,
            'type' => 'symptom',
            'createdAt' => date(DATE_ATOM, strtotime('-3 days')),
            'notes' => 'Mild bloating noted after lunch.'
        ]
    ];
}

echo json_encode($_SESSION['hub_health_logs']);
