const db = require("../../../../config/db");
const { createHash } = require('node:crypto');
const jwt = require("jsonwebtoken");

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

// Create a new user in the database
module.exports = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Missing required fields");
  }

  let sanitizedName = name;
  let sanitizedEmail = email.toLowerCase();

  // regex check for email
  if (!sanitizedEmail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
    return res.status(400).send("Invalid email");
  }

  let hashedPassword = sha256(password);

  // Check if the user already exists
  db.query(
    "SELECT * FROM tbl_static_user WHERE user_mail = $1",
    [sanitizedEmail],
    (selectError, selectResults) => {
      if (selectError) {
        res.status(500).send("Error retrieving user from database");
      } else {
        // Check if the user exists
        if (selectResults.rows.length === 0) {
          // Create the user
          db.query(
            "INSERT INTO tbl_static_user (user_name, user_mail, user_pwd) VALUES ($1, $2, $3)",
            [sanitizedName, sanitizedEmail, hashedPassword],
            (insertError, insertResults) => {
              if (insertError) {
                res.status(500).send("Error creating user");
              } else {
                // Generate a token
                const token = jwt.sign(
                  { email: sanitizedEmail },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "1w"
                  }
                );

                // Send the token to the user
                res.status(200).send({ token });
              }
            }
          );
        } else {
          res.status(409).send("Username or email already exists");
        }
      }
    }
  );
};
