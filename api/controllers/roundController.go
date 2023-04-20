package controllers

import (
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/matthew-torres/pocket-caddie/api/db"
	"github.com/matthew-torres/pocket-caddie/api/models"
)

func AddRound(c *gin.Context) {
	var round models.Round
	c.ShouldBindJSON(&round)

	status, err := db.NewRound(round)
	if err != nil {
		log.Println(err)
	}

	c.JSON(status, gin.H{
		"round": round,
		"code":  status,
	})
}

func GetRound(c *gin.Context) {

	var round models.Round

	roundID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		log.Println(err)
	}

	round, err = db.GetRoundByID(roundID)
	if err != nil {
		log.Println(err)
	}

	c.JSON(200, gin.H{
		"round": round,
	})
}

func GetRounds(c *gin.Context) {

	var rounds []models.Round

	rounds, err := db.GetAllRounds()
	if err != nil {
		log.Println(err)
	}

	c.JSON(200, gin.H{
		"rounds": rounds,
	})
}

func UpdateRound(c *gin.Context) {
	var updateInfo map[string]interface{}
	roundID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		log.Println(err)
	}
	c.ShouldBindJSON(&updateInfo)

	status, err := db.UpdateRound(roundID, updateInfo)
	if err := nil {
		log.Println(err)
	}
	c.JSON(status, gin.H{
		"code": status,
	})

}
