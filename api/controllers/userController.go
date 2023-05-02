package controllers

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/matthew-torres/pocket-caddie/api/db"
	"github.com/matthew-torres/pocket-caddie/api/models"
)

func GetUser(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "this is a user",
	})
}

func NewUser(c *gin.Context) {
	var user models.User
	c.ShouldBindJSON(&user)

	status, err := db.NewUser(user)
	if err != nil {
		log.Println(err)
	}

	c.JSON(status, gin.H{
		"user": user,
		"code": status,
	})
}
