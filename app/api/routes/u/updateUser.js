const db = require("../../../../config/db");
const { createHash } = require('node:crypto');
const jwt = require("jsonwebtoken");
const User = require("../../../models/User");

/**
 * Returns a SHA256 hash using SHA-3 for the given `content`.
 *
 * @see https://en.wikipedia.org/wiki/SHA-3
 *
 * @param {String} content
 *
 * @returns {String}
 */
const sha256 = (content) => createHash('sha3-256').update(content).digest('hex');

// Update a specific user by ID in the database
module.exports = (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  // get the previous user information
  db.query("SELECT * FROM tbl_user WHERE user_id = $1", [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      // check if the user is modifying their own account
      if (req.user.id !== results.rows[0].user_id) {
        return res.status(403).send("You are not authorized to modify this user");
      }

      // update the user information
      // if the user didn't provide a new name, use the old one
      let sanitizedName = name ? name : results.rows[0].user_name;

      // if the user didn't provide a new email, use the old one
      let sanitizedEmail = email ? email.toLowerCase() : results.rows[0].user_mail;

      // if the user didn't provide a new password, use the old one
      let hashedPassword = password ? sha256(password) : results.rows[0].user_pwd;

      // regex check for email
      if (!sanitizedEmail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        return res.status(400).send("Invalid email");
      }

      // check if email is already taken
      db.query(
        "SELECT * FROM tbl_user WHERE user_mail = $1 AND user_id != $2",
        [sanitizedEmail, id],
        (selectError, selectResults) => {
          if (selectError) {
            res.status(500).send("Error retrieving user from database");
          } else {
            // Check if the user exists
            if (selectResults.rows.length === 0) {
              // Update the user
              db.query(
                "UPDATE tbl_user SET user_name = $1, user_mail = $2, user_pwd = $3 WHERE user_id = $4 RETURNING *",
                [sanitizedName, sanitizedEmail, hashedPassword, id],
                (error, results) => {
                  if (error) {
                    console.error(error);
                    res.status(500).json({ error: "Internal server error" });
                  } else if (results.rows.length === 0) {
                    res.status(404).json({ error: "User not found" });
                  } else {
                    // Generate a token
                    const token = jwt.sign(
                      { id: results.rows[0].user_id },
                      process.env.JWT_SECRET,
                      {
                        expiresIn: "1w"
                      }
                    );

                    // send the token back to the client
                    res.status(200).json({ token });
                  }
                }
              );
            } else {
              res.status(400).send("Email already taken");
            }
          }
        }
      );
    }
  });
};