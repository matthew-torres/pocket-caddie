package controllers

import (
	"database/sql"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/matthew-torres/pocket-caddie/api/db_queries"
	"github.com/matthew-torres/pocket-caddie/api/models"
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

	status, err := d.rRequests.NewRound(round)
	if err != nil {
		log.Println(err)
	}

	c.JSON(status, gin.H{
		"round": round,
		"code":  status,
	})
}

func (d *RoundController) GetRound(c *gin.Context) {

	var round models.Round

	roundID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		log.Println(err)
	}

	round, err = d.rRequests.GetRoundByID(roundID)
	if err != nil {
		log.Println(err)
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
	}

	c.JSON(200, gin.H{
		"rounds": rounds,
	})
}

func (d *RoundController) UpdateRound(c *gin.Context) {
	var updateInfo map[string]interface{}
	roundID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		log.Println(err)
	}
	c.ShouldBindJSON(&updateInfo)

	status, err := d.rRequests.UpdateRound(roundID, updateInfo)
	if err != nil {
		log.Println(err)
	}
	c.JSON(status, gin.H{
		"code": status,
	})

}

func (d *RoundController) DeleteRound(c *gin.Context) {
	roundID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		log.Println(err)
	}

	status, err := d.rRequests.DeleteRound(roundID)
	if err != nil {
		log.Println(err)
	}

	c.JSON(status, gin.H{
		"code": status,
	})
}
