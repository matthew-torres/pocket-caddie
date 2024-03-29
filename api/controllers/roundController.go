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

type RoundController struct {
	rRequests *db_queries.RoundRequests
}

func (c *RoundController) Init(db *sql.DB) {
	c.rRequests = &db_queries.RoundRequests{}
	c.rRequests.Init(db)
}

func (d *RoundController) AddRound(c *gin.Context) {
	var round models.Round
	c.ShouldBindJSON(&round)

	UID, err := utils.ExtractTokenID(c)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract user id"})
		return
	}

	round.UID = UID
	status, err := d.rRequests.NewRound(round)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to insert new round"})
		return
	}

	c.JSON(status, gin.H{
		"round": round,
		"code":  status,
	})
}

func (d *RoundController) GetRound(c *gin.Context) {

	var round models.Round

	roundID, err := strconv.Atoi(c.Param("rid"))
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract round id"})
		return
	}

	round, err = d.rRequests.GetRoundByID(roundID)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to retrieve round from id"})
		return
	}

	c.JSON(200, gin.H{
		"round": round,
	})
}

func (d *RoundController) GetRounds(c *gin.Context) {

	var rounds []models.Round

	rounds, err := d.rRequests.GetAllRounds()
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to retrieve rounds"})
		return
	}

	c.JSON(200, gin.H{
		"rounds": rounds,
	})
}

func (d *RoundController) UpdateRound(c *gin.Context) {
	var updateInfo map[string]interface{}
	roundID, err := strconv.Atoi(c.Param("rid"))
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract round id"})
		return
	}
	c.ShouldBindJSON(&updateInfo)

	status, err := d.rRequests.UpdateRound(roundID, updateInfo)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to update round with round id"})
		return
	}
	c.JSON(status, gin.H{
		"code": status,
	})

}

func (d *RoundController) DeleteRounds(c *gin.Context) {
	var req models.DeleteRoundsType

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	for _, round := range req.SelectionModel {
		_, err := d.rRequests.DeleteRound(round)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "unable to delete round using round id"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"code": http.StatusOK})
}

func (d *RoundController) DeleteRound(c *gin.Context) {
	roundID, err := strconv.Atoi(c.Param("rid"))
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract round id"})
		return
	}

	status, err := d.rRequests.DeleteRound(roundID)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to delete round using round id"})
		return
	}

	c.JSON(status, gin.H{
		"code": status,
	})
}

func (d *RoundController) GetRoundUID(c *gin.Context) {

	var round models.Round

	UID, err := utils.ExtractTokenID(c)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract user id"})
		return
	}

	round, err = d.rRequests.GetRoundByUID(UID)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to retrieve round id"})
		return
	}

	round.UID = UID
	c.JSON(200, gin.H{
		"round": round,
	})
}
