const db = require("../../../../config/db");

// delete object
module.exports = (req, res) => {
  const { id } = req.params;

  // check if object exists
  db.query("SELECT * FROM tbl_item WHERE item_id = $1", [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.rowCount === 0) {
      res.status(404).json({ error: "Object not found" });
    }

    // check if user is owner of object
    if (results.rows[0].item_user_id !== req.user.id) {
      // check if user is admin
      db.query("SELECT * FROM tbl_user_join_role WHERE user_id = $1 AND role_id = 1", [req.user.id], (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        } else if (results.rowCount === 0) {
          res.status(403).json({ error: "Forbidden" });
        }

        // delete object
        db.query("DELETE FROM objects WHERE id = $1", [id], (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
          } else {
            res.status(200).json({ message: "Object deleted" });
          }
        });
      });
    }
  });
};
