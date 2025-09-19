DROP DATABASE IF EXISTS Campusdeals;

-- 2) Create it fresh
CREATE DATABASE Campusdeals;
USE Campusdeals;

-- Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(150) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    role ENUM('buyer','seller','admin') DEFAULT 'buyer',
    user_phone VARCHAR(15),
    user_studyyear VARCHAR(50),
    user_branch VARCHAR(50),
    user_section VARCHAR(50),
    user_residency VARCHAR(50),
    payment_received DECIMAL(10,2),
    amount_given DECIMAL(10,2)
);

-- Products table
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name ENUM('drafter','white_lab_coat','brown_lab_coat','calculator') NOT NULL,
    product_variant ENUM('premium_drafter','standard_drafter','budget_drafter',
                         'S','M','L','XL','XXL',
                         'MS','ES','ES-Plus') NOT NULL,
    product_code VARCHAR(50) UNIQUE,
    product_price DECIMAL(10,2) NOT NULL,
    product_images TEXT,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Cart table
CREATE TABLE cart (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Orders table
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,              -- FK from users
    serial_no VARCHAR(50) UNIQUE NOT NULL, -- Example: CLC001
    product_id INT,           -- FK from products
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('cash','upi') NOT NULL,
    status ENUM('pending','completed','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cart_user_id INT,         -- FK from cart
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (user_id) REFERENCES cart(user_id)
);
