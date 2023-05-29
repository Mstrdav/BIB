-- all procedures, views and helper functions
-- ===================================

-- USERS
---------------------------------------

-- getAllUsers
-- a view with all users, (id, name, pp_url, is_official)
CREATE OR REPLACE VIEW view_get_all_users AS
    SELECT
        u.user_id,
        u.user_name,
        u.user_pp_url,
        CASE
            WHEN EXISTS (
                SELECT
                    1
                FROM
                    tbl_user_join_role ur
                WHERE
                    ur.user_id = u.user_id
                    AND ur.role_id = 3
            ) THEN true
            ELSE false
        END AS is_official
    FROM
        tbl_user u;

-- getUserById
-- returns a user by id, (id, name, pp_url, is_official, created_at, bio)
CREATE OR REPLACE FUNCTION func_get_user_by_id(
    user_id int
) RETURNS TABLE(
    user_id int,
    user_name varchar(100),
    user_pp_url varchar(3000),
    is_official boolean,
    user_created_at timestamp,
    user_bio varchar(1000)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.user_id,
        u.user_name,
        u.user_pp_url,
        CASE
            WHEN EXISTS (
                SELECT
                    1
                FROM
                    tbl_user_join_role ur
                WHERE
                    ur.user_id = u.user_id
                    AND ur.role_id = 3
            ) THEN true
            ELSE false
        END AS is_official,
        u.user_created_at,
        u.user_bio
    FROM
        tbl_user u
    WHERE
        u.user_id = user_id
    LIMIT 1;
END;

-- fetchUsersMatching
-- returns all users matching a search string, (id, name, pp_url, is_official)
CREATE OR REPLACE FUNCTION func_fetch_users_matching(
    search_string varchar(255)
) RETURNS TABLE(
    user_id int,
    user_name varchar(100),
    user_pp_url varchar(3000),
    is_official boolean
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.user_id,
        u.user_name,
        u.user_pp_url,
        CASE
            WHEN EXISTS (
                SELECT
                    1
                FROM
                    tbl_user_join_role ur
                WHERE
                    ur.user_id = u.user_id
                    AND ur.role_id = 3
            ) THEN true
            ELSE false
        END AS is_official
    FROM
        tbl_user u
    WHERE
        u.user_name ILIKE '%' || search_string || '%';
END;

-- createUser
-- creates a new user, returns the id of the new user. password is hashed in the backend
CREATE OR REPLACE FUNCTION func_create_user(
    user_name varchar(100),
    user_mail varchar(255),
    user_pwd varchar(255)
) RETURNS int AS $$
DECLARE
    new_user_id int;
BEGIN
    -- hash password
    user_pwd := crypt(user_pwd, gen_salt('bf'));

    -- insert user
    INSERT INTO tbl_user(user_name, user_mail, user_pwd, user_created_at)
    VALUES (user_name, user_mail, user_pwd, NOW())
    RETURNING user_id INTO new_user_id;
    RETURN new_user_id;
END;

-- deleteUser
-- deletes a user by id
CREATE OR REPLACE PROCEDURE proc_delete_user(
    user_id int
) AS $$
BEGIN
    DELETE FROM tbl_user
    WHERE user_id = user_id;
END;

-- updateUserBio
-- updates the bio of a user
CREATE OR REPLACE PROCEDURE proc_update_user_bio(
    user_id int,
    user_bio varchar(1000)
) AS $$
BEGIN
    UPDATE tbl_user
    SET user_bio = user_bio
    WHERE user_id = user_id;
END;

-- updateUserPP
-- updates the profile picture of a user
CREATE OR REPLACE PROCEDURE proc_update_user_pp(
    user_id int,
    user_pp_url varchar(3000)
) AS $$
BEGIN
    UPDATE tbl_user
    SET user_pp_url = user_pp_url
    WHERE user_id = user_id;
END;

-- updateUserPassword
-- updates the password of a user
CREATE OR REPLACE PROCEDURE proc_update_user_password(
    user_id int,
    user_pwd varchar(255)
) AS $$
BEGIN
    -- hash password
    user_pwd := crypt(user_pwd, gen_salt('bf'));

    UPDATE tbl_user
    SET user_pwd = user_pwd
    WHERE user_id = user_id;
END;

-- updateUserMail
-- updates the mail of a user
CREATE OR REPLACE PROCEDURE proc_update_user_mail(
    user_id int,
    user_mail varchar(255)
) AS $$
BEGIN
    UPDATE tbl_user
    SET user_mail = user_mail
    WHERE user_id = user_id;
END;

-- updateUserName
-- updates the name of a user
CREATE OR REPLACE PROCEDURE proc_update_user_name(
    user_id int,
    user_name varchar(100)
) AS $$
BEGIN
    UPDATE tbl_user
    SET user_name = user_name
    WHERE user_id = user_id;
END;

-- ROLES
---------------------------------------

-- getAllRoles
-- view of all roles, (id, name)
CREATE OR REPLACE VIEW view_get_all_roles AS
    SELECT
        r.role_id,
        r.role_name
    FROM
        tbl_role r;

-- getRoleById
-- returns a role by id, (id, name)
CREATE OR REPLACE FUNCTION func_get_role_by_id(
    role_id int
) RETURNS TABLE(
    role_id int,
    role_name varchar(100)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        r.role_id,
        r.role_name
    FROM
        tbl_role r
    WHERE
        r.role_id = role_id
    LIMIT 1;
END;

-- fetchRolesMatching
-- returns all roles matching a search string, (id, name)
CREATE OR REPLACE FUNCTION func_fetch_roles_matching(
    search_string varchar(255)
) RETURNS TABLE(
    role_id int,
    role_name varchar(100)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        r.role_id,
        r.role_name
    FROM
        tbl_role r
    WHERE
        r.role_name ILIKE '%' || search_string || '%';
END;

-- createRole
-- creates a new role, returns the id of the new role
CREATE OR REPLACE FUNCTION func_create_role(
    role_name varchar(100)
) RETURNS int AS $$
DECLARE
    new_role_id int;
BEGIN
    -- insert role
    INSERT INTO tbl_role(role_name)
    VALUES (role_name)
    RETURNING role_id INTO new_role_id;
    RETURN new_role_id;
END;

-- deleteRole
-- deletes a role by id
CREATE OR REPLACE PROCEDURE proc_delete_role(
    role_id int
) AS $$
BEGIN
    -- delete all user-role relations
    DELETE FROM tbl_user_join_role
    WHERE role_id = role_id;

    -- delete role
    DELETE FROM tbl_role
    WHERE role_id = role_id;
END;

-- updateRoleName
-- updates the name of a role
CREATE OR REPLACE PROCEDURE proc_update_role_name(
    role_id int,
    role_name varchar(100)
) AS $$
BEGIN
    UPDATE tbl_role
    SET role_name = role_name
    WHERE role_id = role_id;
END;

-- USER-ROLE RELATIONS
---------------------------------------

-- getAllUserRoles
-- view of all user-role relations, (user_id, user_name, role_id, role_name)
CREATE OR REPLACE VIEW view_get_all_user_roles AS
    SELECT
        u.user_id,
        u.user_name,
        r.role_id,
        r.role_name
    FROM
        tbl_user u
        INNER JOIN tbl_user_join_role ur ON u.user_id = ur.user_id
        INNER JOIN tbl_role r ON ur.role_id = r.role_id;

-- getUserRolesByUserId
-- returns all roles of a user by id, (id, name)
CREATE OR REPLACE FUNCTION func_get_user_roles_by_user_id(
    user_id int
) RETURNS TABLE(
    role_id int,
    role_name varchar(100)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        r.role_id,
        r.role_name
    FROM
        tbl_role r
        INNER JOIN tbl_user_join_role ur ON r.role_id = ur.role_id
    WHERE
        ur.user_id = user_id;
END;

-- getUserRolesByUserName
-- returns all roles of a user by name, (id, name)
CREATE OR REPLACE FUNCTION func_get_user_roles_by_user_name(
    user_name varchar(100)
) RETURNS TABLE(
    role_id int,
    role_name varchar(100)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        r.role_id,
        r.role_name
    FROM
        tbl_role r
        INNER JOIN tbl_user_join_role ur ON r.role_id = ur.role_id
        INNER JOIN tbl_user u ON ur.user_id = u.user_id
    WHERE
        u.user_name = user_name;
END;

-- getUserRolesByUserMail
-- returns all roles of a user by mail, (id, name)
CREATE OR REPLACE FUNCTION func_get_user_roles_by_user_mail(
    user_mail varchar(255)
) RETURNS TABLE(
    role_id int,
    role_name varchar(100)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        r.role_id,
        r.role_name
    FROM
        tbl_role r
        INNER JOIN tbl_user_join_role ur ON r.role_id = ur.role_id
        INNER JOIN tbl_user u ON ur.user_id = u.user_id
    WHERE
        u.user_mail = user_mail;
END;

-- addUserRole
-- adds a role to a user
CREATE OR REPLACE PROCEDURE proc_add_user_role(
    user_id int,
    role_id int
) AS $$
BEGIN
    -- insert user-role relation if not exists
    INSERT INTO tbl_user_join_role(user_id, role_id)
    SELECT
        user_id,
        role_id
    WHERE
        NOT EXISTS (
            SELECT
                1
            FROM
                tbl_user_join_role
            WHERE
                user_id = user_id AND
                role_id = role_id
        );
END;

-- removeUserRole
-- removes a role from a user
CREATE OR REPLACE PROCEDURE proc_remove_user_role(
    user_id int,
    role_id int
) AS $$
BEGIN
    -- delete user-role relation
    DELETE FROM tbl_user_join_role
    WHERE
        user_id = user_id AND
        role_id = role_id;
END;

-- removeUserRoles
-- removes all roles from a user
CREATE OR REPLACE PROCEDURE proc_remove_user_roles(
    user_id int
) AS $$
BEGIN
    -- delete user-role relations
    DELETE FROM tbl_user_join_role
    WHERE
        user_id = user_id;
END;

-- USER LOGIC, AUTHENTICATION
---------------------------------------

-- login
-- check if the pair of username/mail and password exist and is correct,
-- returns the user id if the login was successful, otherwise null
CREATE OR REPLACE FUNCTION func_login(
    user_name_mail varchar(255),
    user_password varchar(255)
) RETURNS int AS $$
DECLARE
    user_id int;
BEGIN
    -- hash password
    user_password := crypt(user_password, gen_salt('bf'));

    -- check if user exists
    SELECT
        u.user_id
    INTO
        user_id
    FROM
        tbl_user u
    WHERE
        (u.user_name = user_name_mail OR u.user_mail = user_name_mail) AND
        u.user_password = user_password;

    -- return user id if exists
    RETURN user_id;
END;
