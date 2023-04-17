package controllers

import (
	"fmt"
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

	return
}

func GetRound(c *gin.Context) {

	var round models.Round

	roundID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		log.Println(err)
	}

	fmt.Printf("%d", roundID)

	round, err = db.GetRoundByID(int64(roundID))

	c.JSON(200, gin.H{
		"round": round,
	})
}

func GetRounds(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "multiple rounds",
	})
}

func UpdateRound(c *gin.Context) {
	return
}
