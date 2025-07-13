-- Script untuk membuat database dan tabel Toko Kelontong
-- Jalankan script ini di MySQL untuk setup database

-- Membuat database
CREATE DATABASE IF NOT EXISTS toko_kelontong;
USE toko_kelontong;

-- Tabel untuk produk
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    min_stock INT NOT NULL DEFAULT 0,
    supplier VARCHAR(255) NOT NULL,
    barcode VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel untuk transaksi
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    total INT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Selesai',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk item transaksi
CREATE TABLE IF NOT EXISTS transaction_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    subtotal INT NOT NULL,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE
);

-- Insert data sample produk
INSERT INTO products (name, category, price, stock, min_stock, supplier, barcode, description) VALUES
('Beras Premium', 'Sembako', 15000, 45, 10, 'CV Beras Sejahtera', '8991002123456', 'Beras premium kualitas terbaik, pulen dan wangi'),
('Minyak Goreng', 'Sembako', 25000, 8, 15, 'PT Minyak Nusantara', '8991002123457', 'Minyak goreng berkualitas untuk memasak sehari-hari'),
('Gula Pasir', 'Sembako', 12000, 30, 10, 'Pabrik Gula Manis', '8991002123458', 'Gula pasir putih bersih untuk kebutuhan dapur'),
('Telur Ayam', 'Protein', 28000, 25, 20, 'Peternakan Ayam Jaya', '8991002123459', 'Telur ayam segar langsung dari peternakan'),
('Susu UHT', 'Minuman', 8000, 50, 15, 'PT Susu Sehat', '8991002123460', 'Susu UHT full cream kaya nutrisi'),
('Roti Tawar', 'Makanan', 15000, 12, 10, 'Toko Roti Sari', '8991002123461', 'Roti tawar lembut untuk sarapan keluarga'),
('Sabun Mandi', 'Kebersihan', 5000, 35, 10, 'PT Kebersihan Indonesia', '8991002123462', 'Sabun mandi dengan formula lembut untuk kulit'),
('Pasta Gigi', 'Kebersihan', 12000, 20, 8, 'PT Oral Care', '8991002123463', 'Pasta gigi dengan fluoride untuk kesehatan gigi');

-- Insert data sample transaksi
INSERT INTO transactions (customer_name, total, payment_method, status, date) VALUES
('Ibu Sari', 55000, 'Tunai', 'Selesai', '2024-01-15 10:30:00'),
('Pak Budi', 54000, 'Transfer', 'Selesai', '2024-01-15 11:15:00'),
('Ibu Ani', 28000, 'Tunai', 'Selesai', '2024-01-15 14:20:00');

-- Insert data sample item transaksi
INSERT INTO transaction_items (transaction_id, product_name, quantity, price, subtotal) VALUES
-- Transaksi 1 (Ibu Sari)
(1, 'Beras Premium', 2, 15000, 30000),
(1, 'Minyak Goreng', 1, 25000, 25000),
-- Transaksi 2 (Pak Budi)
(2, 'Susu UHT', 3, 8000, 24000),
(2, 'Roti Tawar', 2, 15000, 30000),
-- Transaksi 3 (Ibu Ani)
(3, 'Telur Ayam', 1, 28000, 28000);

-- Query untuk melihat data
SELECT 'Products:' as Info;
SELECT * FROM products;

SELECT 'Transactions:' as Info;
SELECT * FROM transactions;

SELECT 'Transaction Items:' as Info;
SELECT * FROM transaction_items;

-- Query untuk statistik dashboard
SELECT 'Dashboard Statistics:' as Info;
SELECT 
    (SELECT COUNT(*) FROM products) as total_products,
    (SELECT COUNT(*) FROM transactions WHERE DATE(date) = CURDATE()) as transactions_today,
    (SELECT COALESCE(SUM(total), 0) FROM transactions WHERE DATE(date) = CURDATE()) as sales_today;
