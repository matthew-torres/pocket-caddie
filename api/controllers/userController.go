package controllers

import (
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/matthew-torres/pocket-caddie/api/db"
	"github.com/matthew-torres/pocket-caddie/api/models"
)

// TODO: fix error handling for bad id
func GetUser(c *gin.Context) {

	var user models.User

	userID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		log.Println(err)
	}

	user, err = db.GetUserByID(userID)
	if err != nil {
		log.Println(err)
	}

	c.JSON(200, gin.H{
		"user": user,
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
