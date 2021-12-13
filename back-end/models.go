package main

type Post struct {
	Pid         int    `json:"pid"`
	Title       string `json:"title"`
	Description string `json:"description"`
	CreatedBy   int    `json:"createdBy"`
	CreatedTime string `json:"createdTime"`
	LikesCount  int    `json:"likesCount"`
}

type Comment struct {
	Cid         int    `json:"cid"`
	Description string `json:"description"`
	Pid         int    `json:"pid"`
	CreatedBy   int    `json:"createdBy"`
	CreatedTime string `json:"createdTime"`
	LikesCount  int    `json:"likesCount"`
}

type User struct {
	Uid      int    `json:"uid"`
	Name     string `json:"name"`
	Password string `json:"password"`
}