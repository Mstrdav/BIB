const db = require("../../../../config/db");
const Item = require("../../../../models/Item");

// get user objects
module.exports = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM objects WHERE item_user_id = $1",
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        let items = [];
        results.rows.forEach((item) => {
          items.push(new Item(item).short());
        });
        res.status(200).json({ items: items });
      }
    }
  );
};
