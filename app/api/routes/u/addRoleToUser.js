const db = require("../../../../config/db");

// Add a role to a user
module.exports = (req, res) => {
    let user_id = req.params.id;
    let role_id = req.params.rid;

    // check if user has the right to add the role
    let jwt_id = req.user.id;
    db.query(
        "SELECT * FROM tbl_user_join_role WHERE user_id = '" + jwt_id + "' AND role_id = 1",
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    "role_id": role_id,
                    "error": "Error retrieving user roles from database",
                });
            } else {
                if (results.rowCount === 0/* && jwt_id !== user_id*/) { // only admin can remove roles, even from himself
                    return res.status(403).send("You don't have the right to remove this role from this user");
                }

                db.query(
                    "INSERT INTO tbl_user_join_role (user_id, role_id) VALUES ($1, $2)",
                    [user_id, role_id],
                    (err, results) => {
                        if (err) {
                            res.status(500).send("Error adding role to user");
                        } else {
                            res.status(200).send("Role added to user");
                        }
                    }
                );
            }
        }
    );
};