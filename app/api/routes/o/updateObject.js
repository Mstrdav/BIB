const db = require("../../../../config/db");

module.exports = (req, res) => {
  const { id } = req.params;


  db.query("SELECT * FROM tbl_item WHERE id = $1", [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
};
