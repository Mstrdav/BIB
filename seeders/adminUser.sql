-- create admin user if there is none
INSERT INTO tbl_static_user(user_name, user_mail, user_pwd, user_pp_url)
SELECT 'admin', 'admin@example.com', 'password', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y&d=identicon'
WHERE NOT EXISTS (SELECT 1 FROM tbl_static_user_join_role WHERE role_id = 1);

-- create admin role if there is none
INSERT INTO tbl_static_user_role(role_name)
SELECT 'admin'
WHERE NOT EXISTS (SELECT 1 FROM tbl_static_user_role WHERE role_id = 1);

-- create admin user role if there is none
INSERT INTO tbl_static_user_join_role(user_id, role_id)
SELECT u.user_id, r.role_id
FROM tbl_static_user u
INNER JOIN tbl_static_user_role r ON r.role_name = 'admin'
WHERE NOT EXISTS (SELECT 1 FROM tbl_static_user_join_role WHERE user_id = u.user_id AND role_id = r.role_id);
