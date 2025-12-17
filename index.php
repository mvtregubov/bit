<?php
declare(strict_types=1);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Интерактивная презентация</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<header class="app-header">
    <div class="branding">
        <span class="logo">⚡</span>
        <div>
            <div class="subtitle">Готовый шаблон</div>
            <div class="title">Интерактивная презентация</div>
        </div>
    </div>
    <div class="header-actions">
        <button class="ghost" id="toggle-overview" aria-expanded="false">Карта слайдов</button>
        <button class="primary" id="start-presentation">Старт ▶</button>
    </div>
</header>

<main class="layout">
    <aside class="overview" id="overview" aria-hidden="true">
        <h2>Карточки</h2>
        <div class="overview-grid" id="overview-grid"></div>
    </aside>
    <section class="slides" id="slides" aria-live="polite">
        <div class="loader">Загружаем слайды…</div>
    </section>
</main>

<footer class="app-footer">
    <div class="progress">
        <div id="progress-bar"></div>
    </div>
    <div class="footer-hint">Используйте стрелки клавиатуры или свайпы для навигации</div>
</footer>

<script>
    const API_URL = 'slides.php';
</script>
<script src="app.js"></script>
</body>
</html>
