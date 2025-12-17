-- MySQL 5.7 compatible dump
CREATE DATABASE IF NOT EXISTS presentation_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE presentation_db;

CREATE TABLE IF NOT EXISTS slides (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    background_image VARCHAR(1024) DEFAULT NULL,
    accent_color VARCHAR(32) DEFAULT '#7c3aed',
    layout_type VARCHAR(64) DEFAULT 'hero',
    sequence INT UNSIGNED NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO slides (title, body, background_image, accent_color, layout_type, sequence) VALUES
('Добро пожаловать в шаблон', 'Каждый слайд занимает весь экран, адаптируется под любое устройство и готов для кастомизации.', 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80', '#7c3aed', 'hero', 1),
('Данные из MySQL', 'Слайды загружаются с сервера через PHP 8.2 и PDO. В комплекте идёт SQL дамп с тестовым наполнением.', 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=80', '#0ea5e9', 'feature', 2),
('Готовые интеракции', 'Навигация по стрелкам, кликом и через мини-карту. Прогресс-бар синхронизирован с текущим слайдом.', 'https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?auto=format&fit=crop&w=1800&q=80', '#22d3ee', 'callout', 3);
