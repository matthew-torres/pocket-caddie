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

	queryString := `INSERT INTO stroke(HID, UID, RID, Club, Distance, Lie, ResultingLie, ShotNum) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
	err := conn.db.QueryRow(queryString, stroke.HID, stroke.UID, stroke.RID, stroke.Club, stroke.Distance, stroke.Lie, stroke.ResultingLie, stroke.ShotNum).Err()
	if err != nil {
		fmt.Printf("%s", err)
		return 500, err
	}

	return 200, nil
}

func (conn *StrokeRequests) GetAllStrokesByHID(HID int) ([]models.Stroke, error) {
	// prob can make a view and view model for round
	queryString := `SELECT STID, HID, UID, RID, Club, Distance, Lie, ResultingLie, ShotNum FROM stroke WHERE hid = ($1)`
	rows, err := conn.db.Query(queryString, HID)
	if err == sql.ErrNoRows {
		fmt.Printf("%s", err)
		return nil, err
	}
	defer rows.Close()
	return utils.GetStrokeFromRows(rows)

}

func (conn *StrokeRequests) GetAllStrokesByRID(RID int) ([]models.Stroke, error) {
	queryString := `SELECT STID, HID, UID, RID, Club, Distance, Lie, ResultingLie, ShotNum FROM stroke WHERE rid = ($1)`
	rows, err := conn.db.Query(queryString, RID)
	if err == sql.ErrNoRows {
		fmt.Printf("%s", err)
		return nil, err
	}
	defer rows.Close()
	return utils.GetStrokeFromRows(rows)

}

func (conn *StrokeRequests) GetAllStrokesByUID(UID int) ([]models.Stroke, error) {
	queryString := `SELECT STID, HID, UID, RID, Club, Distance, Lie, ResultingLie, ShotNum FROM stroke WHERE uid = ($1)`
	rows, err := conn.db.Query(queryString, UID)
	if err == sql.ErrNoRows {
		fmt.Printf("%s", err)
		return nil, err
	}
	defer rows.Close()
	return utils.GetStrokeFromRows(rows)

}
