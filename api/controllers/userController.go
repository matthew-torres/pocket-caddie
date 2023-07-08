package controllers

import (
	"database/sql"
	"log"
	"net/http"

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
	UID, err := utils.ExtractTokenID(c)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract user id"})
		return
	}

	user, err = d.uRequests.GetUserByID(UID)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to get user by uid"})
		return
	}

	c.JSON(200, gin.H{
		"user": user,
	})
}

func (d *UserController) NewUser(c *gin.Context) {
	var user models.User
	var uid int
	c.ShouldBindJSON(&user)

	err := utils.HashPassword(&user, user.Password)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to hash password"})
		return
	}

	uid, err = d.uRequests.NewUser(user)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to insert new user", "message": err})
		return
	}

	token, err := utils.GenerateToken(uid)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to get user by uid"})
		return
	}

	c.JSON(200, gin.H{
		"token": token,
	})
}

func (d *UserController) GetRoundAllUID(c *gin.Context) {
	var rounds []models.Round

	UID, err := utils.ExtractTokenID(c)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract user id"})
		return
	}

	rounds, err = d.uRequests.GetAllRoundsByUID(UID)
	if err != nil {
		log.Println(err)
	}

	c.JSON(200, gin.H{
		"user id": UID,
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
