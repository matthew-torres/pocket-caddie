package db

import (
	"fmt"
	"log"

	"github.com/matthew-torres/pocket-caddie/api/models"
	"github.com/matthew-torres/pocket-caddie/api/utils"
)

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

func GetAllRounds() ([]models.Round, error) {
	db, err := InitDB()
	if err != nil {
		log.Println(err)
	}

	queryString := `SELECT id, uid, course, score FROM round`
	rows, err := db.Query(queryString)
	if err != nil {
		fmt.Printf("%s", err)
		return nil, err
	}
	defer rows.Close()
	defer db.Close()
	return utils.GetRoundFromRows(rows)

}

func UpdateRound(roundID int, updateInfo map[string]interface{}) (int, error) {
	db, err := InitDB()
	if err != nil {
		log.Println(err)
	}

	queryString := fmt.Sprintf("UPDATE round SET %s=($1) WHERE id=($2)", updateInfo["updateName"])
	err = db.QueryRow(queryString, updateInfo["updateVar"], roundID).Err()
	if err != nil {
		fmt.Printf("%s", err)
		return 400, err
	}
	defer db.Close()
	return 200, nil

}
