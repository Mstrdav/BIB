-- create admin user if there is none
INSERT INTO tbl_static_user(user_name, user_mail, user_pwd, user_pp_url)
SELECT 'admin', 'admin@localhost', 'password', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y&d=identicon'
WHERE NOT EXISTS (SELECT 1 FROM tbl_static_user WHERE user_name = 'admin');

-- create admin role if there is none
INSERT INTO tbl_static_user_role(role_name)
SELECT 'admin'
WHERE NOT EXISTS (SELECT 1 FROM tbl_static_user_role WHERE role_name = 'admin');
