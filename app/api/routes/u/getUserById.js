const db = require("../../../../config/db");

// Retrieve a specific user by ID from the database
module.exports = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
};
