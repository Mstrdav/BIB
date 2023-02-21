const db = require("../../../../config/db");

// update comment
module.exports = (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  db.query(
    "UPDATE comments SET comment = $1 WHERE id = $2",
    [comment, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ message: "Comment updated" });
      }
    }
  );
};
