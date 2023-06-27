package controllers

import (
	"database/sql"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/matthew-torres/pocket-caddie/api/db_queries"
	"github.com/matthew-torres/pocket-caddie/api/models"
	"github.com/matthew-torres/pocket-caddie/api/utils"
)

type UserController struct {
	uRequests *db_queries.UserRequests
}

func (c *UserController) Init(db *sql.DB) {
	c.uRequests = &db_queries.UserRequests{}
	c.uRequests.Init(db)
}

// TODO: fix error handling for bad id
func (d *UserController) GetUser(c *gin.Context) {
	var user models.User
	userID, err := strconv.Atoi(c.Param("uid"))
	if err != nil {
		log.Println(err)
	}

	user, err = d.uRequests.GetUserByID(userID)
	if err != nil {
		log.Println(err)
	}

	c.JSON(200, gin.H{
		"user": user,
	})
}

func (d *UserController) NewUser(c *gin.Context) {
	var user models.User
	var status int
	c.ShouldBindJSON(&user)

	err := utils.HashPassword(&user, user.Password)
	if err != nil {
		log.Println(err)
		return
	}

	status, err = d.uRequests.NewUser(user)
	if err != nil {
		log.Println(err)
	}

	c.JSON(status, gin.H{
		"user": user,
		"code": status,
	})
}

func (d *UserController) GetRoundAllUID(c *gin.Context) {
	var rounds []models.Round

	userID, err := strconv.Atoi(c.Param("uid"))
	if err != nil {
		log.Println(err)
	}

	rounds, err = d.uRequests.GetAllRoundsByUID(userID)
	if err != nil {
		log.Println(err)
	}

	c.JSON(200, gin.H{
		"user id": userID,
		"rounds":  rounds,
	})
}
