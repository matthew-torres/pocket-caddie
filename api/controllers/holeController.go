package controllers

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/matthew-torres/pocket-caddie/api/db_queries"
	"github.com/matthew-torres/pocket-caddie/api/models"
	"github.com/matthew-torres/pocket-caddie/api/utils"
)

type HoleController struct {
	hRequests *db_queries.HoleRequests
}

func (c *HoleController) Init(db *sql.DB) {
	c.hRequests = &db_queries.HoleRequests{}
	c.hRequests.Init(db)
}

func (d *HoleController) AddHole(c *gin.Context) {
	var hole models.Hole
	c.ShouldBindJSON(&hole)

	UID, err := utils.ExtractTokenID(c)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract user id"})
		return
	}

	RID, err := strconv.Atoi(c.Param("rid"))
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract round id"})
		return
	}

	hole.UID = UID
	hole.RID = RID

	status, err := d.hRequests.NewHole(hole)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to insert new hole"})
		return
	}

	c.JSON(status, gin.H{
		"hole": hole,
		"code": status,
	})
}

func (d *HoleController) DeleteHoles(c *gin.Context) {
	var req models.DeleteHolesType

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	for _, hole := range req.SelectionModel {
		_, err := d.hRequests.DeleteHole(hole)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "unable to delete hole using hole id"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"code": http.StatusOK})
}

func (d *HoleController) DeleteHole(c *gin.Context) {
	HID, err := strconv.Atoi(c.Param("hid"))
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract hole id"})
		return
	}
	fmt.Printf("%d", HID)

	status, err := d.hRequests.DeleteHole(HID)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to delete hole using hole id"})
		return
	}

	c.JSON(status, gin.H{
		"code": status,
	})
}

func (d *HoleController) GetHoleByHID(c *gin.Context) {

	var hole models.Hole

	HID, err := strconv.Atoi(c.Param("hid"))
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract hole id"})
		return
	}

	hole, err = d.hRequests.GetHoleByHID(HID)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to retrieve hole"})
		return
	}

	hole.HID = HID
	c.JSON(200, gin.H{
		"hole": hole,
	})
}

func (d *HoleController) GetHolesByRID(c *gin.Context) {

	var holes []models.Hole

	RID, err := strconv.Atoi(c.Param("rid"))
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract round id"})
		return
	}

	holes, err = d.hRequests.GetAllHolesByRID(RID)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract holes for rid"})
		return
	}

	c.JSON(200, gin.H{
		"holes": holes,
	})
}

func (d *HoleController) GetHolesByUID(c *gin.Context) {

	var holes []models.Hole

	UID, err := utils.ExtractTokenID(c)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract user id"})
		return
	}

	holes, err = d.hRequests.GetAllHolesByUID(UID)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "unable to extract holes for user id"})
		return
	}

	c.JSON(200, gin.H{
		"holes": holes,
	})
}
