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
	strokeController := controllers.StrokeController{}
	strokeController.Init(db)

	r.GET("/", index)
	r.GET("/healthcheck", healthCheck)

	r.POST("/round/:uid/newround", roundController.AddRound)
	r.GET("/rounds", roundController.GetRounds)
	r.PUT("/:uid/round/:rid", roundController.UpdateRound)
	r.GET("/:uid/round/:rid", roundController.GetRound)
	r.DELETE("/:uid/round/:rid", roundController.DeleteRound)

	r.GET("/user/:uid", userController.GetUser)
	r.POST("/newuser", userController.NewUser)
	//r.GET("/user/round/:uid", roundController.GetRoundUID)
	r.GET("/user/:uid/rounds", userController.GetRoundAllUID)

	r.POST("/newhole", holeController.AddHole)
	r.GET("/round/:uid/:rid/holes/:hid", holeController.GetHoleByHID)
	r.GET("/round/:uid/:rid/holes", holeController.GetHolesByRID)
	r.GET("/round/:uid/holes", holeController.GetHolesByUID)

	r.POST("/newstroke", strokeController.AddStroke)
	r.GET("/user/:uid/strokes", strokeController.GetStrokesByUID)
	r.GET("/round/:uid/strokes/:rid", strokeController.GetStrokesByRID)
	r.GET("/round/:uid/hole/strokes/:hid", strokeController.GetStrokesByHID)

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
