const db = require("../../../../config/db");
const User = require("../../../models/User");

// Retrieve all users from the database
module.exports = (req, res) => {
  db.query("SELECT * FROM tbl_static_user", (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      let users = [];
      results.rows.forEach((user) => {
        users.push(new User(user).short());
      });
      res.status(200).json(users);
    }
  });
};
