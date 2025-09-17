<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['hub_logged_in']) || $_SESSION['hub_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

if (!isset($_FILES['files'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No files uploaded.']);
    exit();
}

if (!isset($_SESSION['hub_uploads'])) {
    $_SESSION['hub_uploads'] = [];
}

$storedUploads = &$_SESSION['hub_uploads'];
$uploads = [];

foreach ($_FILES['files']['name'] as $index => $name) {
    $tmpName = $_FILES['files']['tmp_name'][$index];
    $size = (int) $_FILES['files']['size'][$index];
    $type = $_FILES['files']['type'][$index];

    if (!is_uploaded_file($tmpName)) {
        continue;
    }

    // Clean up the temporary upload immediately
    @unlink($tmpName);

    $fileType = 'unknown';
    if (stripos($type, 'json') !== false) {
        $fileType = 'json';
    } elseif (stripos($type, 'csv') !== false) {
        $fileType = 'csv';
    }

    $entry = [
        'id' => uniqid('upload_', true),
        'originalName' => $name,
        'size' => $size,
        'createdAt' => date(DATE_ATOM),
        'type' => $fileType
    ];

    $storedUploads[] = $entry;
    $uploads[] = $entry;
}

if (empty($uploads)) {
    http_response_code(400);
    echo json_encode(['error' => 'Unable to process uploads.']);
    exit();
}

echo json_encode(['uploads' => $uploads]);
