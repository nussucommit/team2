package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func setUpDBConnection() *sql.DB {
	const (
		host     = "localhost"
		port     = 8080 // default set to 5432
		user     = "postgres"
		password = "password"
		dbname   = "commitWinterProject"
	)

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	var db *sql.DB
	var err error
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully connected!")

	return db
}

//------------------------------------------------- POSTS----------------------------------------------

func getPosts(c *gin.Context) {
	var posts []Post

	rows, err := db.Query("SELECT * FROM posts")
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	for rows.Next() {
		var post Post
		if err := rows.Scan(&post.Pid, &post.Title, &post.Description, &post.CreatedBy, &post.CreatedTime, &post.LikesCount); err != nil {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
			return
		}

		posts = append(posts, post)
	}

	c.IndentedJSON(http.StatusOK, posts)
	defer rows.Close()
}

func getPostById(c *gin.Context) {
	pid := c.Param("pid")
	var post Post

	row := db.QueryRow("SELECT * FROM posts WHERE pid = $1", pid)

	if err := row.Scan(&post.Pid, &post.Title, &post.Description, &post.CreatedBy, &post.CreatedTime, &post.LikesCount); err != nil {
		if err == sql.ErrNoRows {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": "no row"})
			return
		}

		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}
	c.IndentedJSON(http.StatusOK, post)
}

func getPostsByAuthor(c *gin.Context) {
	name := c.Param("name")
	var posts []Post

	rows, err := db.Query("SELECT Pid, Title, Description, CreatedBy, CreatedTime, LikesCount FROM posts p JOIN users u ON p.createdBy = u.uid WHERE u.name = $1", name)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	for rows.Next() {
		var post Post
		if err := rows.Scan(&post.Pid, &post.Title, &post.Description, &post.CreatedBy, &post.CreatedTime, &post.LikesCount); err != nil {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
			return
		}

		posts = append(posts, post)
	}

	c.IndentedJSON(http.StatusOK, posts)
	defer rows.Close()
}

func getPostsByContent(c *gin.Context) {
	desc := c.Param("desc")
	var posts []Post

	rows, err := db.Query("SELECT * FROM posts WHERE title LIKE '%' || $1 || '%' OR description LIKE '%' || $1 || '%'", desc)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	for rows.Next() {
		var post Post
		if err := rows.Scan(&post.Pid, &post.Title, &post.Description, &post.CreatedBy, &post.CreatedTime, &post.LikesCount); err != nil {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
			return
		}

		posts = append(posts, post)
	}

	c.IndentedJSON(http.StatusOK, posts)
	defer rows.Close()
}

func postPost(c *gin.Context) {
	var post Post
	if err := c.BindJSON(&post); err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	result, err := db.Exec("INSERT INTO posts (pid, title, description, createdBy) VALUES ($1, $2, $3, $4)", post.Pid, post.Title, post.Description, post.CreatedBy)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}
	_, err = result.LastInsertId()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	c.IndentedJSON(http.StatusOK, post)
}

func updatePost(c *gin.Context) {
	id := c.Param("pid")
	var post Post
	if err := c.BindJSON(&post); err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	result, err := db.Exec("UPDATE posts SET title = $1, description = $2 WHERE pid = $3", post.Title, post.Description, id)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}
	_, err = result.LastInsertId()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	c.IndentedJSON(http.StatusOK, post)
}

func updatePostLikes(c *gin.Context) {
	id := c.Param("pid")
	var post Post
	if err := c.BindJSON(&post); err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	result, err := db.Exec("UPDATE posts SET likesCount = $1 WHERE pid = $2", post.LikesCount, id)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}
	_, err = result.LastInsertId()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	c.IndentedJSON(http.StatusOK, post)
}

func deletePost(c *gin.Context) {
	id := c.Param("pid")
	var post Post
	if err := c.BindJSON(&post); err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	result, err := db.Exec("DELETE FROM posts WHERE pid = $1", id)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}
	_, err = result.LastInsertId()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	c.IndentedJSON(http.StatusOK, post)
}

//------------------------------------------------- COMMENTS----------------------------------------------

func getCommentsByPid(c *gin.Context) {
	pid := c.Param("pid")
	var comments []Comment

	rows, err := db.Query("SELECT * FROM comments WHERE pid = $1", pid)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	for rows.Next() {
		var comment Comment
		if err := rows.Scan(&comment.Cid, &comment.Description, &comment.Pid, &comment.CreatedBy, &comment.CreatedTime, &comment.LikesCount); err != nil {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
			return
		}

		comments = append(comments, comment)
	}

	c.IndentedJSON(http.StatusOK, comments)
	defer rows.Close()
}

func postCommentByPid(c *gin.Context) {
	pid := c.Param("pid")
	var comment Comment
	if err := c.BindJSON(&comment); err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	result, err := db.Exec("INSERT INTO comments (cid, description, pid, createdBy) VALUES ($1, $2, $3, $4)", comment.Cid, comment.Description, pid, comment.CreatedBy)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}
	_, err = result.LastInsertId()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	c.IndentedJSON(http.StatusOK, comment)
}

func updateComment(c *gin.Context) {
	id := c.Param("cid")
	var comment Comment
	if err := c.BindJSON(&comment); err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	result, err := db.Exec("UPDATE comments SET description = $1 WHERE cid = $2", comment.Description, id)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}
	_, err = result.LastInsertId()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	c.IndentedJSON(http.StatusOK, comment)
}

func updateCommentLikes(c *gin.Context) {
	id := c.Param("cid")
	var comment Comment
	if err := c.BindJSON(&comment); err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	result, err := db.Exec("UPDATE comments SET likesCount = $1 WHERE pid = $2", comment.LikesCount, id)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}
	_, err = result.LastInsertId()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	c.IndentedJSON(http.StatusOK, comment)
}

func deleteComment(c *gin.Context) {
	id := c.Param("cid")
	var comment Comment
	if err := c.BindJSON(&comment); err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	result, err := db.Exec("DELETE FROM comments WHERE pid = $1", id)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}
	_, err = result.LastInsertId()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		return
	}

	c.IndentedJSON(http.StatusOK, comment)
}

//------------------------------------------------- USERS----------------------------------------------

func getUsers(c *gin.Context) {
	var users []User

	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "error"})
		return
	}

	for rows.Next() {
		var user User
		if err := rows.Scan(&user.Uid, &user.Name, &user.Password); err != nil {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": "error"})
			return
		}

		users = append(users, user)
	}

	c.IndentedJSON(http.StatusOK, users)
	defer rows.Close()
}
