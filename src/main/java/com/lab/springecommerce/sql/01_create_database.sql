-- Carpooling Database Setup Script
-- Версія: 1.0.0
-- Дата: 16.12.2025

-- Створення бази даних
CREATE DATABASE IF NOT EXISTS carpooling_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE carpooling_db;

-- Таблиця Customer (користувачі)
CREATE TABLE IF NOT EXISTS Customer (
    name VARCHAR(50) PRIMARY KEY,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    phone VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    image_url VARCHAR(500),
    role VARCHAR(20) NOT NULL DEFAULT 'PASSENGER',
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Перевірка структури таблиці
DESCRIBE Customer;

-- Показати всіх користувачів
SELECT name, email, role, created_at FROM Customer;

-- Статистика по ролях
SELECT 
    role,
    COUNT(*) as count
FROM Customer
GROUP BY role;
