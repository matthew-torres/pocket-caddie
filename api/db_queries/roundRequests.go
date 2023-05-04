package db_queries

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/matthew-torres/pocket-caddie/api/models"
	"github.com/matthew-torres/pocket-caddie/api/utils"
)

type RoundRequests struct {
	db *sql.DB
}

func (conn *RoundRequests) Init(db *sql.DB) {
	conn.db = db
}

func (conn *RoundRequests) NewRound(round models.Round) (int, error) {

	queryString := `INSERT INTO round(UID, Course, Score, Duration, WeatherCond, Date) VALUES ($1, $2, $3, $4, $5, $6)`
	err := conn.db.QueryRow(queryString, round.UID, round.Course, round.Score, round.Duration, round.WeatherCond, time.Now()).Err()
	if err != nil {
		fmt.Printf("%s", err)
		return 500, err
	}

	return 200, nil
}

func (conn *RoundRequests) GetRoundByID(roundID int) (models.Round, error) {
	var round models.Round

	// prob can make a view and view model for round
	queryString := `SELECT id, uid, course, score FROM round WHERE id = ($1)`
	err := conn.db.QueryRow(queryString, roundID).Scan(&round.ID, &round.UID, &round.Course, &round.Score)
	if err == sql.ErrNoRows {
		fmt.Printf("%s", err)
		return round, err
	}

	return round, nil
}

func (conn *RoundRequests) GetRoundByUID(UID int) (models.Round, error) {
	var round models.Round

	// prob can make a view and view model for round
	queryString := `SELECT course, score, duration, weathercond, date FROM round WHERE uid = ($1)`
	err := conn.db.QueryRow(queryString, UID).Scan(&round.Course, &round.Score, &round.Duration, &round.WeatherCond, &round.Date)
	if err == sql.ErrNoRows {
		fmt.Printf("%s", err)
		return round, err
	}
	return round, nil
}

func (conn *RoundRequests) GetAllRounds() ([]models.Round, error) {
	queryString := `SELECT ID, course, score, duration, weathercond, date FROM round`
	rows, err := conn.db.Query(queryString)
	if err == sql.ErrNoRows {
		fmt.Printf("%s", err)
		return nil, err
	}
	defer rows.Close()
	return utils.GetRoundFromRows(rows)

}

func (conn *RoundRequests) UpdateRound(roundID int, updateInfo map[string]interface{}) (int, error) {

	queryString := fmt.Sprintf("UPDATE round SET %s=($1) WHERE id=($2)", updateInfo["updateName"])
	err := conn.db.QueryRow(queryString, updateInfo["updateVar"], roundID).Err()
	if err != nil {
		fmt.Printf("%s", err)
		return 500, err
	}

	return 200, nil

}

func (conn *RoundRequests) DeleteRound(roundID int) (int, error) {
	queryString := `DELETE FROM round WHERE ID = ($1)`
	err := conn.db.QueryRow(queryString, roundID).Err()
	if err != nil {
		fmt.Printf("%s", err)
		return 500, err
	}

	return 200, nil
}
