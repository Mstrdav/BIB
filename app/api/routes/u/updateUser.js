const db = require("../../../../config/db").default;

// Update a specific user by ID in the database
module.exports = (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  db.query(
    "UPDATE tbl_static_user SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
    [name, email, password, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      } else if (results.rows.length === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  );
};