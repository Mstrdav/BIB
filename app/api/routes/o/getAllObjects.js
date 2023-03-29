const db = require("../../../../config/db");
const Item = require("../../../../models/Item");

// get all items 
module.exports = (req, res) => {
  db.query("SELECT * FROM tbl_item", (error, results) => {
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
  });
};
