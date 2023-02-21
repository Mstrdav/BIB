const db = require("../../../../config/db").default;

// create a new comment
module.exports = (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  db.query(
    "INSERT INTO comments (object_id, comment) VALUES ($1, $2)",
    [id, comment],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(201).json({ message: "Comment added" });
      }
    }
  );
};
