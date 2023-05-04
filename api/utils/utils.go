package utils

import (
	"database/sql"

	"github.com/matthew-torres/pocket-caddie/api/models"
)

func GetRoundFromRows(rows *sql.Rows) ([]models.Round, error) {
	rounds := []models.Round{}
	for rows.Next() {
		var round models.Round
		//var tags string
		err := rows.Scan(&round.ID, &round.Course, &round.Score, &round.Duration, &round.WeatherCond, &round.Date)
		if err != nil {
			return nil, err
		}
		rounds = append(rounds, round)

	}
	return rounds, nil
}

// func FormatUpdateVars(updateName string, updateVar string) (, error) {
// 	switch {
// 	case updateName == "Score":
// 		updateVar, err := strconv.Atoi(updateVar)
// 		if err != nil {
// 			return "", err
// 		}
// 		return updateVar, nil
// 	}
// }
