package main

import (
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/matthew-torres/pocket-caddie/api/controllers"
	"github.com/matthew-torres/pocket-caddie/api/db_queries"
)

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "DELETE", "POST", "PUT", "PATCH"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"Content-Length, Content-Length, Accept-Encoding, XMLHttpRequest, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "https://github.com"
		},
		MaxAge: 12 * time.Hour,
	}))

	db, err := db_queries.InitDB()
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	userController := controllers.UserController{}
	userController.Init(db)
	roundController := controllers.RoundController{}
	roundController.Init(db)
	holeController := controllers.HoleController{}
	holeController.Init(db)

	r.GET("/", index)
	r.GET("/healthcheck", healthCheck)

	r.POST("/newround", roundController.AddRound)
	r.GET("/rounds", roundController.GetRounds)
	r.PUT("/round/:id", roundController.UpdateRound)
	r.GET("/round/:id", roundController.GetRound)
	r.DELETE("/round/:id", roundController.DeleteRound)

	r.GET("/user/:id", userController.GetUser)
	r.POST("/newuser", userController.NewUser)
	r.GET("/user/round/:id", roundController.GetRoundUID)
	r.GET("/user/rounds/:id", userController.GetRoundAllUID)

	r.POST("/newhole", holeController.AddRound)
	r.GET("/round/hole/:hid", holeController.GetHoleByID)
	r.GET("/round/:id/holes/:rid", holeController.GetHoles)

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
