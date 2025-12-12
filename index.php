<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Простой чат-бот</title>
    <link rel="stylesheet" href="css/ui-lightness/jquery-ui-1.10.3.custom.min.css">
    <link rel="stylesheet" href="css/chat.css">
    <script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.10.3.custom.js"></script>
</head>
<body>
    <div class="page">
        <header class="header">
            <h1>Чат-бот</h1>
            <p>Простой офлайн-бот, который отвечает на типовые вопросы.</p>
        </header>
        <main class="chat" aria-live="polite">
            <ul id="chat-log" class="chat__log"></ul>
            <form id="chat-form" class="chat__input" autocomplete="off">
                <label for="user-message" class="sr-only">Ваше сообщение</label>
                <input id="user-message" type="text" name="message" placeholder="Напишите что-нибудь..." required>
                <button type="submit" class="ui-button ui-widget ui-corner-all">Отправить</button>
            </form>
        </main>
    </div>
    <script type="text/javascript" src="js/chat.js"></script>
</body>
</html>
