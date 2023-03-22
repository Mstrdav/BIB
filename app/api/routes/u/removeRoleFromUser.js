const db = require("../../../../config/db");

// remove role from user
module.exports = (req, res) => {
    let user_id = req.params.id;
    let role_id = req.params.rid;

    // check if user has the right to remove the role
    let jwt_id = req.user.id;

    db.query(
        "SELECT * FROM tbl_static_user_join_role WHERE user_id = '" + jwt_id + "' AND role_id = 1",
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
                    "DELETE FROM tbl_static_user_join_role WHERE user_id = $1 AND role_id = $2",
                    [user_id, role_id],
                    (err, results) => {
                        if (err) {
                            return res.status(500).json({
                                "role_id": role_id,
                                "error": "Error removing role from user",
                            });
                        } else {
                            return res.status(200).json({ 
                                "user_id" : user_id,    
                                "message" : "Role removed from user" 
                            });
                        }
                    }
                );
            }
        }
    );
}