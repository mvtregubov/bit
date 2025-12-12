(function ($) {
    const chatLog = $('#chat-log');
    const form = $('#chat-form');
    const input = $('#user-message');

    const replyTemplates = [
        {
            keywords: ['привет', 'здравствуй', 'добрый день', 'доброе утро', 'добрый вечер'],
            answers: [
                'Привет! Чем могу помочь?',
                'Здравствуйте! Готов ответить на вопросы.',
                'Приветствую! Что бы вы хотели узнать?'
            ]
        },
        {
            keywords: ['как дела', 'как ты'],
            answers: [
                'У меня всё отлично, спасибо!',
                'Работаю без выходных и всегда готов ответить :)'
            ]
        },
        {
            keywords: ['погода', 'температура'],
            answers: [
                'Жаль, что у меня нет доступа к интернету, но хорошая прогулка всегда в тему!',
                'Погоду точно не знаю, но желаю вам солнечного дня.'
            ]
        },
        {
            keywords: ['спасибо', 'благодарю'],
            answers: [
                'Рад помочь!',
                'Обращайтесь, если появятся новые вопросы!'
            ]
        },
        {
            keywords: ['пока', 'до свидания'],
            answers: [
                'До встречи! Буду ждать новых сообщений.',
                'Хорошего дня!'
            ]
        }
    ];

    function addMessage(text, sender) {
        const message = $('<li>', { class: 'message' });
        const senderLabel = $('<span>', { class: 'message__sender', text: sender });
        const bubble = $('<div>', {
            class: `bubble ${sender === 'Бот' ? 'bubble--bot' : 'bubble--user'}`,
            text
        });

        if (sender === 'Вы') {
            bubble.addClass('bubble--user');
            message.addClass('message--user');
        }

        message.append(senderLabel, bubble);
        chatLog.append(message);
        chatLog.scrollTop(chatLog.prop('scrollHeight'));
    }

    function pickAnswer(message) {
        const normalized = message.toLowerCase();

        for (const template of replyTemplates) {
            const matches = template.keywords.some((keyword) => normalized.includes(keyword));
            if (matches) {
                return template.answers[Math.floor(Math.random() * template.answers.length)];
            }
        }

        return 'Я пока знаю только базовые фразы, но всегда готов поболтать!';
    }

    function handleSubmit(event) {
        event.preventDefault();
        const value = input.val().trim();
        if (!value) return;

        addMessage(value, 'Вы');
        input.val('');

        setTimeout(() => {
            addMessage(pickAnswer(value), 'Бот');
        }, 350);
    }

    form.on('submit', handleSubmit);

    // Приветственное сообщение
    addMessage('Привет! Я простой чат-бот. Спросите меня о погоде, настроении или просто поздоровайтесь.', 'Бот');
})(jQuery);
