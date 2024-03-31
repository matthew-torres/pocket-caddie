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
)

type ClubController struct {
	cRequests *db_queries.ClubRequests
}

func (c *ClubController) Init(db *sql.DB) {
	c.cRequests = &db_queries.ClubRequests{}
	c.cRequests.Init(db)
}

func (d *ClubController) GetClub(c *gin.Context) {
	var club models.Club
	CLID, err := strconv.Atoi(c.Param("clid"))
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract club id"})
		return
	}
	c.ShouldBindJSON(&club)
	club, err = d.cRequests.GetClubByCLID(CLID)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to get Club by uid"})
		return
	}

	c.JSON(200, gin.H{
		"Club": club,
	})
}

func (d *ClubController) NewClub(c *gin.Context) {
	var club models.Club
	c.ShouldBindJSON(&club)

	UID, err := utils.ExtractTokenID(c)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract user id"})
		return
	}

	club.UID = UID

	_, err = d.cRequests.NewClub(club)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to insert new Club", "message": err})
		return
	}

	c.JSON(200, gin.H{
		"club": club,
	})
}

func (d *ClubController) GetAllClubsByUID(c *gin.Context) {
	var clubs []models.Club

	UID, err := utils.ExtractTokenID(c)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract Club id"})
		return
	}

	clubs, err = d.cRequests.GetAllClubsByUID(UID)
	if err != nil {
		log.Println(err)
	}

	c.JSON(200, gin.H{
		"User ID": UID,
		"clubs":   clubs,
	})
}
