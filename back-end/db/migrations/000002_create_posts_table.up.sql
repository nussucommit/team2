CREATE TABLE posts (
    pid		    SERIAL PRIMARY KEY,
    title		TEXT,
    description	TEXT,
    createdBy	INT REFERENCES users (uid) ON DELETE CASCADE,
    createdTime	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likesCount	INT DEFAULT 0
);