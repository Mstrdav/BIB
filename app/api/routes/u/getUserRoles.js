const db = require("../../../../config/db");

// get user roles
module.exports = (req, res) => {
    let user_id = req.params.id;

    db.query(
        "SELECT * FROM tbl_user INNER JOIN tbl_user_join_role ON tbl_user.user_id = tbl_user_join_role.user_id WHERE tbl_user.user_id = $1",
        [user_id],
        (err, results) => {
            if (err) {
                res.status(500).send("Error retrieving user roles from database");
            } else {
                let roles = [];
                for (let i = 0; i < results.rowCount; i++) {
                    roles.push(results.rows[i].role_id);
                }
                return res.status(200).json({ 
                    "user_id" : user_id,    
                    "roles" : roles 
                });
            }
        }
    );
};

