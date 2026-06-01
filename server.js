require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

/* DATABASE CONNECTION */

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("DB Connection Failed:", err.message);
  } else {
    console.log("MySQL Connected Successfully");
    connection.release();
  }
});

/* ROUTES */

app.get("/", (req, res) => {
  res.send("Portfolio API is running...");
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql =
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err) => {
    if (err) {
      return res.json({
        status: "error",
        message: "Failed to save message"
      });
    }

    res.json({
      status: "success",
      message: "Message saved successfully!"
    });
  });
});

/* SERVER */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});