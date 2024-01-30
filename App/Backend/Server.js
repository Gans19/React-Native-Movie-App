const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser"); // Import body-parser

const app = express();

app.use(bodyParser.json()); // Parse JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse 

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

app.post("/users/add", (req, res) => {
  const fullName = req.body.fullName
  const email = req.body.email
  const password = req.body.password
  // const { fullName, password } = req.body;

  if (!fullName || !password || !email) {
    return res.status(400).json({ error: "Full name and password are required" });
  }

  const sql = "INSERT INTO signin (UserName,Email, Pword) VALUES (?, ?,?)";
  db.query(sql, [fullName,email,password], (err, result) => {
    if (err) {
      console.error("Error inserting data into database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(201).json({ message: "User added successfully" });
  });
});


app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sql = "SELECT * FROM signin WHERE Email = ? AND Pword = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // User found, authentication successful
    return res.status(200).json({ message: "Login successful" });
  });
});


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
