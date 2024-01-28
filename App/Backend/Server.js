const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1@Qwerty",
  database: "users",
});

// Connect to the database
db.connect(function (err) {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

app.get("/", (req, res) => {
  return res.send({ message: "From Backend" });
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM userdetails";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.send(data);
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
