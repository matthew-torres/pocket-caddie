package db_queries

import (
	"database/sql"
	"fmt"

	"github.com/matthew-torres/pocket-caddie/api/models"
	"github.com/matthew-torres/pocket-caddie/api/utils"
)

type HoleRequests struct {
	db *sql.DB
}

func (conn *HoleRequests) Init(db *sql.DB) {
	conn.db = db
}

func (conn *HoleRequests) NewHole(hole models.Hole) (int, error) {

	queryString := `INSERT INTO hole(RID, UID, HoleNumber, Par, GIR, FairwayHit, Putts, Score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
	err := conn.db.QueryRow(queryString, hole.RID, hole.UID, hole.HoleNumber, hole.Par, hole.GIR, hole.FairwayHit, hole.Putts, hole.Score).Err()
	if err != nil {
		fmt.Printf("%s", err)
		return 500, err
	}

	return 200, nil
}

func (conn *HoleRequests) GetHoleByID(HID int) (models.Hole, error) {
	var hole models.Hole

	// prob can make a view and view model for round
	queryString := `SELECT rid, holenumber, par, gir, fairwayhit, putts, score FROM hole WHERE hid = ($1)`
	err := conn.db.QueryRow(queryString, HID).Scan(&hole.RID, &hole.HoleNumber, &hole.Par, &hole.GIR, &hole.FairwayHit, &hole.Putts, &hole.Score)
	if err == sql.ErrNoRows {
		fmt.Printf("%s", err)
		return hole, err
	}

	return hole, nil
}

func (conn *HoleRequests) GetAllHolesByRID(RID int) ([]models.Hole, error) {
	queryString := `SELECT hid, rid, uid, holenumber, par, gir, fairwayhit, putts, score FROM hole WHERE rid = ($1)`
	rows, err := conn.db.Query(queryString, RID)
	if err == sql.ErrNoRows {
		fmt.Printf("%s", err)
		return nil, err
	}
	defer rows.Close()
	return utils.GetHoleFromRows(rows)

}
