const db = require("../../../../config/db");
const User = require("../../../models/User");

// Retrieve a specific user by ID from the database
module.exports = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM tbl_static_user WHERE user_id = $1", [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      let user = new User(results.rows[0]);
      res.status(200).json(user.long());
    }
  });
};
