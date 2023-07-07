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
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to insert new stroke"})
		return
	}

	c.JSON(status, gin.H{
		"stroke": stroke,
		"code":   status,
	})
}

func (d *StrokeController) GetStrokesByUID(c *gin.Context) {

	//var stroke models.Stroke

	UID, err := utils.ExtractTokenID(c)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract user id"})
		return
	}

	strokes, err := d.sRequests.GetAllStrokesByUID(UID)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to retrieve strokes from user id"})
		return
	}

	//stroke.UID = UID
	c.JSON(200, gin.H{
		"strokes": strokes,
	})
}

func (d *StrokeController) GetStrokesByRID(c *gin.Context) {

	//var stroke models.Stroke

	RID, err := strconv.Atoi(c.Param("rid"))
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract round id"})
		return
	}

	strokes, err := d.sRequests.GetAllStrokesByRID(RID)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to retrieve strokes from round id"})
		return
	}
	//stroke.UID = UID
	c.JSON(200, gin.H{
		"strokes": strokes,
	})
}

func (d *StrokeController) GetStrokesByHID(c *gin.Context) {

	//var stroke models.Stroke

	HID, err := strconv.Atoi(c.Param("hid"))
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract hole id"})
		return
	}

	strokes, err := d.sRequests.GetAllStrokesByHID(HID)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to retrieve strokes from hole id"})
		return
	}

	//stroke.UID = UID
	c.JSON(200, gin.H{
		"strokes": strokes,
	})
}
