const db = require("../../../../config/db");
const User = require("../../../models/User");

// Retrieve all users from the database
module.exports = (req, res) => {
  // Get all users and their roles
  db.query(
    "SELECT * FROM tbl_static_user INNER JOIN tbl_static_user_join_role ON tbl_static_user.user_id = tbl_static_user_join_role.user_id",
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving users from database");
      } else {
        console.log(results);

        // Create an array of users
        let users = [];
        // Loop through the results
        for (let i = 0; i < results.rowCount; i++) {
          // Create a new user object
          let user = new User(
            results.rows[i].user_id,
            results.rows[i].user_mail,
            results.rows[i].user_pwd,
            results.rows[i].user_role_id
          );
          // Add the user to the array
          users.push(user);
        }
        // Send the array of users
        res.status(200).send(users);
      }
    }
  );
};
