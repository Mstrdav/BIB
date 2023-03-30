const db = require("../../../../config/db");
const Item = require("../../../../models/Item");

module.exports = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM item WHERE item_id = $1", [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      let item = new Item(results.rows[0]).short();

      // get object tags
      db.query("SELECT * FROM item_tag WHERE item_id = $1", [id], (tagError, tagResults) => {
        if (tagError) {
          console.error(tagError);
          res.status(500).json({ error: "Internal server error" });
        } else {
          let tags = [];
          tagResults.rows.forEach((tag) => {
            tags.push(tag.tag_id);
          });
          item.tags = tags;
          res.status(200).json({ item: item });
        }
      });
    }
  });
};
