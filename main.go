package main

import (
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/matthew-torres/pocket-caddie/api/controllers"
	"github.com/matthew-torres/pocket-caddie/api/db_queries"
	"github.com/matthew-torres/pocket-caddie/api/middleware"
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
	clubController := controllers.ClubController{}
	clubController.Init(db)

	// r.GET("/", index)
	r.GET("/healthcheck", healthCheck)
	r.POST("/login", userController.UserLogin)

	protected := r.Group("/api")
	protected.Use(middleware.JwtAuthMiddleware())

	protected.POST("/round/newround", roundController.AddRound)
	protected.GET("/rounds", roundController.GetRounds)
	protected.PUT("/round/:rid", roundController.UpdateRound)
	protected.GET("/round/:rid", roundController.GetRound)
	protected.DELETE("/round/:rid", roundController.DeleteRound)
	protected.DELETE("/rounds", roundController.DeleteRounds)

	protected.GET("/user", userController.GetUser)
	r.POST("/newuser", userController.NewUser)
	//r.GET("/user/round/:uid", roundController.GetRoundUID)
	protected.GET("/user/rounds", userController.GetRoundAllUID)

	protected.POST("round/:rid/newhole", holeController.AddHole)
	protected.GET("/round/:rid/holes/:hid", holeController.GetHoleByHID)
	protected.GET("/round/:rid/holes", holeController.GetHolesByRID)
	protected.GET("/round/holes", holeController.GetHolesByUID)
	protected.DELETE("/round/:rid/holes/:hid", holeController.DeleteHole)
	protected.DELETE("/round/:rid/holes", holeController.DeleteHoles)

	protected.POST("/newstroke", strokeController.AddStroke)
	protected.GET("/user/strokes", strokeController.GetStrokesByUID)
	protected.GET("/round/strokes/:rid", strokeController.GetStrokesByRID)
	protected.GET("/round/hole/strokes/:hid", strokeController.GetStrokesByHID)

	protected.POST("/user/club", clubController.NewClub)
	protected.GET("/user/clubs", clubController.GetAllClubsByUID)
	protected.GET("/user/club/:clid", clubController.GetClub)
	protected.DELETE("/user/clubs", clubController.GetAllClubsByUID)
	protected.DELETE("/user/club/:clid", clubController.GetClub)

	r.Run() // listen and serve on 0.0.0.0:8080
}

//	func index(c *gin.Context) {
//		return
//	}
func healthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "status ok",
		"status":  200})
}
