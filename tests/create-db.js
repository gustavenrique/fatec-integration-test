const mysql = require("mysql2/promise");
require("dotenv").config();

const openConnection = () =>
  mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

async function createDatabase() {
  try {
    const connection = await openConnection();

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`
    );

    console.log("DB created.");

    connection.close();
  } catch (error) {
    console.error("An error occurred while creating the database: ", error);
  }
}

async function createTables() {
  try {
    const connection = await openConnection();

    await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
        )
    `);

    console.log("Table created.");

    connection.close();
  } catch (error) {
    console.error("An error occurred while creating the tables: ", error);
  }
}

createDatabase()
  .then(() => createTables())
  .catch((error) => console.error(error));
