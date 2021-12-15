CREATE TABLE posts (
    pid		    INT PRIMARY KEY,
    title		TEXT,
    description	TEXT,
    createdBy	INT REFERENCES users (uid) ON DELETE CASCADE,
    createdTime	TIME DEFAULT CURRENT_TIMESTAMP,
    likesCount	INT DEFAULT 0
);