package main

import (
	"github.com/gin-gonic/gin"
	"github.com/matthew-torres/pocket-caddie/api/controllers"
)

func main() {
	r := gin.Default()
	r.GET("/", index)
	r.GET("/healthcheck", healthCheck)

	r.POST("/newround", controllers.AddRound)
	r.GET("/rounds", controllers.GetRounds)
	r.PUT("/round/:id", controllers.UpdateRound)
	r.GET("/round/:id", controllers.GetRound)
	r.DELETE("/round/:id", controllers.DeleteRound)

	r.GET("/user/:id", controllers.GetUser)
	r.POST("/newuser", controllers.NewUser)

	r.Run() // listen and serve on 0.0.0.0:8080
}

func index(c *gin.Context) {
	return
}
func healthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "status ok",
		"status":  200})
}
