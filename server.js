
require("dotenv").config();zconst express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

/*
/* DATABASE CONNECTION */

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "portfolio_db"
});

/* CONNECT DATABASE */

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("MySQL Connected");
  }
});

/* API ROUTE */
app.get("/", (req, res) => {
  res.send("Portfolio API is running...");
});

app.post("/contact", (req, res) => {

  const { name, email, message } = req.body;

  const sql =
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {

    if (err) {

      res.json({
        status: "error",
        message: "Failed to save message"
      });

    } else {

      res.json({
        status: "success",
        message: "Message saved successfully!"
      });

    }

  });

});

/* SERVER */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});