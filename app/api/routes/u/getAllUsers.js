const db = require("../../../config/db");

// Retrieve all users from the database
module.exports = (req, res) => {
  db.query("SELECT * FROM users", (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};
