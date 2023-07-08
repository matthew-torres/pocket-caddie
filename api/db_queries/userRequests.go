package db_queries

import (
	"database/sql"
	"fmt"

	"github.com/matthew-torres/pocket-caddie/api/models"
	"github.com/matthew-torres/pocket-caddie/api/utils"
)

type UserRequests struct {
	db *sql.DB
}

func (conn *UserRequests) Init(db *sql.DB) {
	conn.db = db
}

func (conn *UserRequests) NewUser(user models.User) (int, error) {

	var uid int
	queryString := `INSERT INTO users(Firstname, Lastname, Email, Password, Handicap) VALUES ($1, $2, $3, $4, $5) RETURNING UID`
	err := conn.db.QueryRow(queryString, user.Firstname, user.Lastname, user.Email, user.Password, user.Handicap).Scan(&uid)
	if err != nil {
		fmt.Printf("%s", err)
		return 0, err
	}

	//defer db.Close()
	return uid, nil
}

func (conn *UserRequests) GetUserByID(userID int) (models.User, error) {
	var user models.User

	// prob can make a view and view model for users
	queryString := `SELECT uid, firstname, lastname, email, handicap FROM users WHERE uid = ($1)`
	err := conn.db.QueryRow(queryString, userID).Scan(&user.UID, &user.Firstname, &user.Lastname, &user.Email, &user.Handicap)
	if err != nil {
		fmt.Printf("%s", err)
		return user, err
	}

	//defer db.Close()
	return user, nil
}

func (conn *UserRequests) GetUserByEmail(email string) (models.User, error) {
	var user models.User

	// prob can make a view and view model for users
	queryString := `SELECT uid, firstname, lastname, email, password, handicap FROM users WHERE email = ($1)`
	err := conn.db.QueryRow(queryString, email).Scan(&user.UID, &user.Firstname, &user.Lastname, &user.Email, &user.Password, &user.Handicap)
	if err != nil {
		fmt.Printf("%s", err)
		return user, err
	}

	//defer db.Close()
	return user, nil
}

func (conn *UserRequests) GetAllRoundsByUID(userID int) ([]models.Round, error) {

	queryString := `SELECT ID, course, score, duration, weathercond, date FROM round WHERE uid = ($1)`
	rows, err := conn.db.Query(queryString, userID)
	if err == sql.ErrNoRows {
		fmt.Printf("%s", err)
		return nil, err
	}
	defer rows.Close()
	return utils.GetRoundFromRows(rows)
}
