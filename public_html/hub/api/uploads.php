<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['hub_logged_in']) || $_SESSION['hub_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_SESSION['hub_uploads'])) {
        $_SESSION['hub_uploads'] = [
            [
                'id' => uniqid('upload_', true),
                'originalName' => 'quietgo-tracking-data.csv',
                'size' => 18432,
                'createdAt' => date(DATE_ATOM, strtotime('-4 hours')),
                'type' => 'csv'
            ],
            [
                'id' => uniqid('upload_', true),
                'originalName' => 'breakfast-log.json',
                'size' => 4096,
                'createdAt' => date(DATE_ATOM, strtotime('-2 days')),
                'type' => 'json'
            ]
        ];
    }

    echo json_encode(array_values($_SESSION['hub_uploads']));
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
