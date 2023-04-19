package db

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
	"github.com/matthew-torres/pocket-caddie/api/models"
)

var db *sql.DB

func InitDB() (*sql.DB, error) {
	connectionString := os.Getenv("POSTGRES_CONNECTION_STRING")
	if connectionString == "" {
		return nil, errors.New("'POSTGRES_CONNECTION_STRING' environment variable not set")
	}
	conn, err := sql.Open("postgres", connectionString)
	if err != nil {
		panic(fmt.Sprintf("DB: %v", err))
	}
	return conn, nil
}

func NewRound(round models.Round) (int, error) {
	db, err := InitDB()
	if err != nil {
		log.Fatal(err)
	}

	queryString := `INSERT INTO round(UID, Course, Score) VALUES ($1, $2, $3)`
	err = db.QueryRow(queryString, round.UID, round.Course, round.Score).Err()
	if err != nil {
		fmt.Printf("%s", err)
		return 400, err
	}
	defer db.Close()
	return 200, nil
}

func GetRoundByID(roundID int) (models.Round, error) {
	var round models.Round

	db, err := InitDB()
	if err != nil {
		log.Println(err)
	}

	// prob can make a view and view model for round
	queryString := `SELECT id, uid, course, score FROM round WHERE id = ($1)`
	err = db.QueryRow(queryString, roundID).Scan(&round.ID, &round.UID, &round.Course, &round.Score)
	if err != nil {
		fmt.Printf("%s", err)
		return round, err
	}

	defer db.Close()
	return round, nil
}
