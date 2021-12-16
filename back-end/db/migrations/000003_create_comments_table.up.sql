CREATE TABLE comments (
    cid		    SERIAL PRIMARY KEY,
    description	TEXT,
    pid		    INT REFERENCES posts (pid) ON DELETE CASCADE,
    createdBy	TEXT,
    createdTime	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likesCount	INT DEFAULT 0
);