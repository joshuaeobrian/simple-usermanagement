CREATE TABLE IF NOT EXISTS user_groups
(
    id        INT AUTO_INCREMENT PRIMARY KEY,
    group_name varchar(255) NOT NULL,
    UNIQUE (group_name)
);

CREATE TABLE IF NOT EXISTS roles
(
    id       INT PRIMARY KEY,
    role_name VARCHAR(70) NOT NULL,
    UNIQUE (id, role_name)
);

INSERT INTO roles (id, role_name)
VALUES (1, 'admin');
INSERT INTO roles (id, role_name)
VALUES (2, 'employee');
INSERT INTO roles (id, role_name)
VALUES (3, 'vendor');

CREATE TABLE IF NOT EXISTS users
(
    id        INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) default '',
    last_name  VARCHAR(100) default '',
    email     VARCHAR(100) default '',
    password  VARCHAR(20)  default '',
    role_id   INT DEFAULT 2,
    UNIQUE (email),
    FOREIGN KEY (role_id)
        REFERENCES roles (id)

);

INSERT INTO users (first_name, last_name, email, password, role_id)
VALUES ('admin', 'admin', 'admin', 'password', 1);

CREATE TABLE IF NOT EXISTS user_groups_users
(
    user_group_id INT,
    users_id  INT,
    UNIQUE (users_id),
    FOREIGN KEY (users_id)
        REFERENCES users (id)
        ON DELETE CASCADE,
    FOREIGN KEY (user_group_id)
        REFERENCES user_groups(id)
        ON DELETE CASCADE
);
