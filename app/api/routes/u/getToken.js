const db = require("../../../../config/db");
const { createHash } = require("crypto");
const jwt = require("jsonwebtoken");

/**
 * Returns a SHA256 hash using SHA-3 for the given `content`.
 * @see https://en.wikipedia.org/wiki/SHA-3
 * @param {String} content
 * @returns {String}
 * */
const sha256 = (content) => createHash('sha3-256').update(content).digest('hex');


// Get a token for the user
// If email and password match, return a token
// Otherwise, return an error
module.exports = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Missing required fields");
  }

  // sanitize
  let sanitizedEmail = email.toLowerCase();

  // regex check for email
  if (!sanitizedEmail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
    return res.status(400).send("Invalid email");
  }

  let sanitizedPassword = sha256(password);

  // Check if the user exists
  db.query(
    "SELECT * FROM tbl_static_user WHERE user_mail = $1",
    [sanitizedEmail],
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving user from database");
      } else {
        // Check if the user exists
        if (results.rowCount === 0) {
          res.status(404).send("User not found");
        } else {
          // Check if the password matches
          if (results.rows[0].user_pwd === sanitizedPassword) {
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
          } else {
            res.status(401).send("Password invalid");
          }
        }
      }
    }
  );
};