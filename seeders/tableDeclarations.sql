CREATE SEQUENCE IF NOT EXISTS tbl_user_id_seq;

CREATE SEQUENCE IF NOT EXISTS tbl_tag_id_seq;

CREATE SEQUENCE IF NOT EXISTS tbl_user_roles_id_seq;

CREATE SEQUENCE IF NOT EXISTS tbl_item_id_seq;

CREATE SEQUENCE IF NOT EXISTS tbl_comment_id_seq;

CREATE TABLE IF NOT EXISTS tbl_user_role(
    role_id int DEFAULT nextval('tbl_user_roles_id_seq'::regclass) NOT NULL PRIMARY KEY,
    role_name varchar(255) NOT NULL
);

-- create admin role
INSERT INTO tbl_user_role(role_id, role_name) VALUES (1, 'admin') ON CONFLICT DO NOTHING;

-- create user role
INSERT INTO tbl_user_role(role_id, role_name) VALUES (2, 'user') ON CONFLICT DO NOTHING;

-- create official role
INSERT INTO tbl_user_role(role_id, role_name) VALUES (3, 'official') ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS tbl_tag(
    tag_id int DEFAULT nextval('tbl_tag_id_seq'::regclass) NOT NULL PRIMARY KEY,
    tag_name varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_user(
    user_id int DEFAULT nextval('tbl_item_id_seq'::regclass) NOT NULL PRIMARY KEY,
    user_name varchar(100) NOT NULL,
    user_mail varchar(255) NOT NULL,
    user_pwd varchar(255) NOT NULL,
    user_pp_url varchar(255)
);

-- Join USER and ROLE
CREATE TABLE IF NOT EXISTS tbl_user_join_role(
    user_id int NOT NULL REFERENCES tbl_user ON UPDATE CASCADE ON DELETE CASCADE,
    role_id int NOT NULL REFERENCES tbl_user_role ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS tbl_item(
    item_id int DEFAULT nextval('tbl_item_id_seq'::regclass) NOT NULL PRIMARY KEY,
    item_name varchar(100) NOT NULL,
    item_state int NOT NULL,
    CHECK (
        item_state BETWEEN 1
        AND 100
    ),
    item_user_id int NOT NULL REFERENCES tbl_user ON UPDATE CASCADE ON DELETE CASCADE,
    item_current_holder_id int NOT NULL REFERENCES tbl_user
);

-- Join ITEM and TAG
CREATE TABLE IF NOT EXISTS tbl_item_tag(
    item_id int NOT NULL REFERENCES tbl_item ON UPDATE CASCADE ON DELETE CASCADE,
    tag_id int NOT NULL REFERENCES tbl_tag ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (item_id, tag_id)
);

CREATE TABLE IF NOT EXISTS tbl_comment(
    comment_id int DEFAULT nextval('tbl_comment_id_seq'::regclass) NOT NULL PRIMARY KEY,
    comment_content varchar(1000) NOT NULL,
    comment_user_id int NOT NULL REFERENCES tbl_user ON UPDATE CASCADE ON DELETE CASCADE,
    comment_item_id int NOT NULL REFERENCES tbl_item ON UPDATE CASCADE ON DELETE CASCADE,
    comment_date timestamp NOT NULL,
    comment_last_update timestamp NOT NULL
);