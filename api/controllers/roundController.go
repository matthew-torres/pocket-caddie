package controllers

import (
	"github.com/gin-gonic/gin"
)

func AddRound(c *gin.Context) {
	return
}

func GetRound(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "your round",
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
