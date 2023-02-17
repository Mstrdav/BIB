const db = require("../../../config/db");

// delete comment
module.exports = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM comments WHERE id = $1", [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json({ message: "Comment deleted" });
    }
  });
};
