package db_queries

import (
	"database/sql"
	"fmt"

	"github.com/matthew-torres/pocket-caddie/api/models"
	"github.com/matthew-torres/pocket-caddie/api/utils"
)

type ClubRequests struct {
	db *sql.DB
}

func (conn *ClubRequests) Init(db *sql.DB) {
	conn.db = db
}

func (conn *ClubRequests) NewClub(club models.Club) (int, error) {

	var CLID int

	queryString := `INSERT INTO Clubs(Brand, Name, Type, UID) VALUES ($1, $2, $3, $4) RETURNING CLID`
	err := conn.db.QueryRow(queryString, club.Brand, club.Name, club.Type, club.UID).Scan(&CLID)
	if err != nil {
		fmt.Printf("%s", err)
		return 0, err
	}

	//defer db.Close()
	return CLID, nil
}

func (conn *ClubRequests) GetClubByCLID(clubID int) (models.Club, error) {
	var club models.Club

	// prob can make a view and view model for clubs
	queryString := `SELECT CLID, brand, name, type, uid FROM clubs WHERE clid = ($1)`
	err := conn.db.QueryRow(queryString, clubID).Scan(&club.CLID, &club.Brand, &club.Name, &club.Type, &club.UID)
	if err != nil {
		fmt.Printf("%s", err)
		return club, err
	}

	//defer db.Close()
	return club, nil
}

func (conn *ClubRequests) GetAllClubsByUID(UID int) ([]models.Club, error) {

	queryString := `SELECT CLID, Brand, Name, Type FROM clubs WHERE uid = ($1)`
	rows, err := conn.db.Query(queryString, UID)
	if err == sql.ErrNoRows {
		fmt.Printf("%s", err)
		return nil, err
	}
	defer rows.Close()
	return utils.GetClubsFromRows(rows)
}
