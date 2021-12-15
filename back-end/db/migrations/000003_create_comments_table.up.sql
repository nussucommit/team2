CREATE TABLE comments (
    cid		    INT PRIMARY KEY,
    description	TEXT,
    pid		    INT REFERENCES posts (pid) ON DELETE CASCADE,
    createdBy	TEXT,
    createdTime	TIME DEFAULT CURRENT_TIMESTAMP,
    likesCount	INT DEFAULT 0
);