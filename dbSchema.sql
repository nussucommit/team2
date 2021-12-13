DROP TABLE IF EXISTS users;
CREATE TABLE users (
    uid		    INT PRIMARY KEY,
    name		TEXT,
    password	TEXT
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
    pid		    INT PRIMARY KEY,
    title		TEXT,
    description	TEXT,
    createdBy	INT REFERENCES users (uid) ON DELETE CASCADE,
    createdTime	TIME DEFAULT CURRENT_TIMESTAMP,
    likesCount	INT DEFAULT 0
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
    cid		    INT PRIMARY KEY,
    description	TEXT,
    pid		    INT REFERENCES posts (pid) ON DELETE CASCADE,
    createdBy	TEXT,
    createdTime	TIME DEFAULT CURRENT_TIMESTAMP,
    likesCount	INT DEFAULT 0
);