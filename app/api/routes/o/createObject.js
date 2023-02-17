const db = require("../../../config/db");

module.exports = (req, res) => {
  const { name, description, price, image } = req.body;
  db.query(
    "INSERT INTO objects (name, description, price, image) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, description, price, image],
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
