package main

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

var db *sql.DB

func main() {
    db = setUpDBConnection()
    router := gin.Default()

    router.GET("/posts", getPosts)
    router.GET("/posts/:pid", getPostById)
    router.GET("/posts/author/:name", getPostsByAuthor)
    router.GET("/posts/content/:desc", getPostsByContent) //TODO: CANNOT USE % URGH
    router.POST("/posts", postPost)
    router.PUT("/posts/:pid", updatePost)
    router.PUT("/posts/likes/:pid", updatePostLikes)
    router.DELETE("/posts/:pid", deletePost)

    router.GET("/comments/:pid", getCommentsByPid)
    router.POST("/comments/:pid", postCommentByPid)
    router.PUT("/comments/:cid", updateComment)
    router.PUT("/comments/likes/:cid", updateCommentLikes)
    router.DELETE("/comments/:cid", deleteComment)

    router.GET("/users", getUsers)

    router.Run("localhost:8080")

    defer db.Close()
}