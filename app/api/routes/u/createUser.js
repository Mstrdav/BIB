const db = require("../../../../config/db");

// Create a new user in the database
module.exports = (req, res) => {
  const { name, email, password } = req.body;
  db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(201).json(results.rows[0]);
      }
    }
  );
};
