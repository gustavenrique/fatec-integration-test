CREATE DATABASE user;

USE user;

CREATE TABLE user.users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);
