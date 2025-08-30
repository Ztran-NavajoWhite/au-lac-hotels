-- Database initialization script for Au-Lac Hotels
-- This script runs when the MySQL container starts for the first time

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `au_lac_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE `au_lac_db`;

-- Create additional user for WordPress (if needed)
-- CREATE USER IF NOT EXISTS 'wordpress_user'@'%' IDENTIFIED BY 'wordpress_password';
-- GRANT ALL PRIVILEGES ON `au_lac_db`.* TO 'wordpress_user'@'%';

-- Create additional user for Laravel (if needed)
-- CREATE USER IF NOT EXISTS 'laravel_user'@'%' IDENTIFIED BY 'laravel_password';
-- GRANT ALL PRIVILEGES ON `au_lac_db`.* TO 'laravel_user'@'%';

-- Flush privileges
FLUSH PRIVILEGES;

-- Show databases
SHOW DATABASES;

-- Show users
SELECT User, Host FROM mysql.user;
