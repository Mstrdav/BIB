const db = require("../../../../config/db");

module.exports = (req, res) => {
  const { name, state } = req.body;
  const user_id = req.user.id;

  // check if all required fields are present
  if (!name || !state) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  db.query(
    "INSERT INTO tbl_item (item_name, item_state, item_user_id, item_current_holder_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, state, user_id, user_id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        let item = new Item(results.rows[0]).short();
        res.status(200).json({ "msg": "success", "item": item });
      }
    }
  );
};
