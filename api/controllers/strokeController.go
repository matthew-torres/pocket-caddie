package controllers

import (
	"database/sql"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/matthew-torres/pocket-caddie/api/db_queries"
	"github.com/matthew-torres/pocket-caddie/api/models"
)

type StrokeController struct {
	sRequests *db_queries.StrokeRequests
}

func (c *StrokeController) Init(db *sql.DB) {
	c.sRequests = &db_queries.StrokeRequests{}
	c.sRequests.Init(db)
}

func (d *StrokeController) AddStroke(c *gin.Context) {
	var stroke models.Stroke
	c.ShouldBindJSON(&stroke)

	status, err := d.sRequests.NewStroke(stroke)
	if err != nil {
		log.Println(err)
	}

	c.JSON(status, gin.H{
		"stroke": stroke,
		"code":   status,
	})
}

func (d *StrokeController) GetHolesByUID(c *gin.Context) {

	//var stroke models.Stroke

	UID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		log.Println(err)
	}

	strokes, err := d.sRequests.GetAllStrokesByUID(UID)
	if err != nil {
		log.Println(err)
	}

	//stroke.UID = UID
	c.JSON(200, gin.H{
		"strokes": strokes,
	})
}

func (d *StrokeController) GetHolesByRID(c *gin.Context) {

	//var stroke models.Stroke

	RID, err := strconv.Atoi(c.Param("rid"))
	if err != nil {
		log.Println(err)
	}

	strokes, err := d.sRequests.GetAllStrokesByUID(RID)
	if err != nil {
		log.Println(err)
	}

	//stroke.UID = UID
	c.JSON(200, gin.H{
		"strokes": strokes,
	})
}
