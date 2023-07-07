package controllers

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/matthew-torres/pocket-caddie/api/db_queries"
	"github.com/matthew-torres/pocket-caddie/api/models"
	"github.com/matthew-torres/pocket-caddie/api/utils"
	"golang.org/x/crypto/bcrypt"
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

func (d *UserController) UserLogin(c *gin.Context) {

	var login models.UserLogin
	if err := c.ShouldBindJSON(&login); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := models.User{}
	user.Email = login.Email
	user.Password = login.Password

	token, err := d.checkLogin(user.Email, user.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "username or password is incorrect."})
		return
	}
	c.JSON(http.StatusOK, gin.H{"token": token})
}

func (d *UserController) checkLogin(email string, password string) (string, error) {

	user, err := d.uRequests.GetUserByEmail(email)
	if err != nil {
		return "", err
	}

	err = utils.CheckPassword(user, password)
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		return "", err
	}
	token, err := utils.GenerateToken(user.UID)
	if err != nil {
		return "", err
	}

	return token, nil
}
