<?php

require_once __DIR__ . '/Database.php';

class PresentationService
{
    private Database $database;

    public function __construct(Database $database)
    {
        $this->database = $database;
    }

    public function fetchSlides(): array
    {
        $pdo = $this->database->pdo();
        $query = <<<'SQL'
            SELECT s.id, s.title, s.body, s.background_image, s.accent_color, s.layout_type, s.sequence
            FROM slides s
            ORDER BY s.sequence ASC;
        SQL;

        $stmt = $pdo->query($query);

        return $stmt->fetchAll();
    }
}
