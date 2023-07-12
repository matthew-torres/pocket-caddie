package utils

import (
	"database/sql"

	"github.com/matthew-torres/pocket-caddie/api/models"
	"golang.org/x/crypto/bcrypt"
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

// combine the two fucntions into a generic one
func GetHoleFromRows(rows *sql.Rows) ([]models.Hole, error) {
	holes := []models.Hole{}
	for rows.Next() {
		var hole models.Hole
		//var tags string
		err := rows.Scan(&hole.HID, &hole.RID, &hole.UID, &hole.HoleNumber, &hole.Par, &hole.GIR, &hole.FairwayHit, &hole.Putts, &hole.Score)
		if err != nil {
			return nil, err
		}
		holes = append(holes, hole)

	}
	return holes, nil
}

// combine the two fucntions into a generic one
func GetStrokeFromRows(rows *sql.Rows) ([]models.Stroke, error) {
	strokes := []models.Stroke{}
	for rows.Next() {
		var stroke models.Stroke
		//var tags string
		err := rows.Scan(&stroke.STID, &stroke.HID, &stroke.UID, &stroke.RID, &stroke.Club, &stroke.Distance, &stroke.Lie, &stroke.ResultingLie, &stroke.ShotNum)
		if err != nil {
			return nil, err
		}
		strokes = append(strokes, stroke)

	}
	return strokes, nil
}

func GetClubsFromRows(rows *sql.Rows) ([]models.Club, error) {
	clubs := []models.Club{}
	for rows.Next() {
		var club models.Club
		//var tags string
		err := rows.Scan(&club.CLID, &club.Brand, &club.Name, &club.Type)
		if err != nil {
			return nil, err
		}
		clubs = append(clubs, club)

	}
	return clubs, nil
}

func HashPassword(user *models.User, password string) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return err
	}
	user.Password = string(bytes)
	return nil
}
func CheckPassword(user models.User, providedPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(providedPassword))
	if err != nil {
		return err
	}
	return nil
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
