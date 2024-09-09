const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = require("express")();

const port = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass",
  database: "user",
});

connection.connect((err) => {
  if (err) throw err;

  console.log("Connected to MySQL");
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  connection.query(
    `INSERT INTO users (name, email) VALUES (?, ?)`,
    [name, email],
    (err, results) => {
      if (err) throw err;

      res.send("User created successfully!");
    }
  );
});

app.get("/users", (req, res) =>
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;

    res.json(results);
  })
);

app.get("/users/:id", (req, res) =>
  connection.query(
    `SELECT * FROM users WHERE id = ?`,
    [req.params.id],
    (err, results) => {
      if (err) throw err;

      res.json(results);
    }
  )
);

app.delete("/users/:id", (req, res) =>
  connection.query(
    `DELETE FROM users WHERE id = ?`,
    [req.params.id],
    (err, results) => {
      if (err) throw err;

      res.json(results);
    }
  )
);

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  connection.query(
    `UPDATE users SET name=?, email=? WHERE id=?`,
    [name, email, userId],
    (err, results) => {
      if (err) throw err;

      res.send("User updated successfully!");
    }
  );
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
