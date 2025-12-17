<?php

declare(strict_types=1);

header('Content-Type: application/json');

$config = require __DIR__ . '/config.php';
require_once __DIR__ . '/PresentationService.php';

try {
    $database = new Database($config);
    $service = new PresentationService($database);
    $slides = $service->fetchSlides();

    echo json_encode([
        'slides' => $slides,
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
} catch (Throwable $exception) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Unable to load slides',
        'details' => $exception->getMessage(),
    ]);
}
