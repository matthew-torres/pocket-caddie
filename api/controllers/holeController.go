package controllers

import (
	"database/sql"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/matthew-torres/pocket-caddie/api/db_queries"
	"github.com/matthew-torres/pocket-caddie/api/models"
)

type HoleController struct {
	hRequests *db_queries.HoleRequests
}

func (c *HoleController) Init(db *sql.DB) {
	c.hRequests = &db_queries.HoleRequests{}
	c.hRequests.Init(db)
}

func (d *HoleController) AddRound(c *gin.Context) {
	var hole models.Hole
	c.ShouldBindJSON(&hole)

	status, err := d.hRequests.NewHole(hole)
	if err != nil {
		log.Println(err)
	}

	c.JSON(status, gin.H{
		"hole": hole,
		"code": status,
	})
}

func (d *HoleController) GetHoleByID(c *gin.Context) {

	var hole models.Hole

	HID, err := strconv.Atoi(c.Param("hid"))
	if err != nil {
		log.Println(err)
	}

	hole, err = d.hRequests.GetHoleByID(HID)
	if err != nil {
		log.Println(err)
	}

	hole.HID = HID
	c.JSON(200, gin.H{
		"hole": hole,
	})
}

func (d *HoleController) GetHoles(c *gin.Context) {

	var holes []models.Hole

	RID, err := strconv.Atoi(c.Param("rid"))
	if err != nil {
		log.Println(err)
	}

	holes, err = d.hRequests.GetAllHolesByRID(RID)
	if err != nil {
		log.Println(err)
	}

	c.JSON(200, gin.H{
		"holes": holes,
	})
}
