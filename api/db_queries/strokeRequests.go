package db_queries

import (
	"database/sql"
	"fmt"

	"github.com/matthew-torres/pocket-caddie/api/models"
	"github.com/matthew-torres/pocket-caddie/api/utils"
)

type StrokeRequests struct {
	db *sql.DB
}

func (conn *StrokeRequests) Init(db *sql.DB) {
	conn.db = db
}

func (conn *StrokeRequests) NewStroke(stroke models.Stroke) (int, error) {

	queryString := `INSERT INTO stroke(HID, UID, Club, Distance, Lie, ResultingLie, ShotNum) VALUES ($1, $2, $3, $4, $5, $6, $7)`
	err := conn.db.QueryRow(queryString, stroke.HID, stroke.UID, stroke.Club, stroke.Distance, stroke.Lie, stroke.ResultingLie, stroke.ShotNum).Err()
	if err != nil {
		fmt.Printf("%s", err)
		return 500, err
	}

	return 200, nil
}

// func (conn *StrokeRequests) GetStrokesByHID(HID int) (models.Stroke, error) {
// 	var stroke models.Stroke

// 	// prob can make a view and view model for round
// 	queryString := `SELECT HID, UID, Club, Distance, Lie, ResultingLie FROM stroke WHERE hid = ($1)`
// 	err := conn.db.QueryRow(queryString, HID).Scan(&stroke.HID, &stroke.UID, &stroke.Club, &stroke.Distance, &stroke.Lie, &stroke.ResultingLie)
// 	if err == sql.ErrNoRows {
// 		fmt.Printf("%s", err)
// 		return stroke, err
// 	}

// 	return stroke, nil
// }

func (conn *HoleRequests) GetAllStrokesByRID(RID int) ([]models.Stroke, error) {
	queryString := `SELECT STID, HID, UID, Club, Distance, Lie, ResultingLie, ShotNum FROM stroke WHERE rid = ($1)`
	rows, err := conn.db.Query(queryString, RID)
	if err == sql.ErrNoRows {
		fmt.Printf("%s", err)
		return nil, err
	}
	defer rows.Close()
	return utils.GetStrokeFromRows(rows)

}

func (conn *StrokeRequests) GetAllStrokesByUID(UID int) ([]models.Stroke, error) {
	queryString := `SELECT STID, HID, UID, Club, Distance, Lie, ResultingLie, ShotNum FROM stroke WHERE uid = ($1)`
	rows, err := conn.db.Query(queryString, UID)
	if err == sql.ErrNoRows {
		fmt.Printf("%s", err)
		return nil, err
	}
	defer rows.Close()
	return utils.GetStrokeFromRows(rows)

}
