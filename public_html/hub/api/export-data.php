<?php
session_start();

if (!isset($_SESSION['hub_logged_in']) || $_SESSION['hub_logged_in'] !== true) {
    http_response_code(401);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Not authenticated']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="quietgo-export.csv"');

echo "Entry ID,Type,Logged At,Notes\n";

$logs = $_SESSION['hub_health_logs'] ?? [];
if (empty($logs)) {
    $logs = [
        [
            'id' => 1,
            'type' => 'stool',
            'createdAt' => date(DATE_ATOM),
            'notes' => 'Baseline entry generated for export.'
        ]
    ];
}

foreach ($logs as $log) {
    $row = [
        $log['id'] ?? '',
        $log['type'] ?? '',
        $log['createdAt'] ?? '',
        str_replace(["\r", "\n"], ' ', $log['notes'] ?? '')
    ];

    $escaped = array_map(function ($value) {
        $value = (string) $value;
        return '"' . str_replace('"', '""', $value) . '"';
    }, $row);

    echo implode(',', $escaped) . "\n";
}
