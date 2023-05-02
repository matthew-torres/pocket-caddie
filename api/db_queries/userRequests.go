package db_queries

import (
	"database/sql"
	"fmt"

	"github.com/matthew-torres/pocket-caddie/api/models"
)

type UserRequests struct {
	db *sql.DB
}

func (conn *UserRequests) Init(db *sql.DB) {
	conn.db = db
}

func (conn *UserRequests) NewUser(user models.User) (int, error) {

	queryString := `INSERT INTO users(Firstname, Lastname, Email) VALUES ($1, $2, $3)`
	err := conn.db.QueryRow(queryString, user.Firstname, user.Lastname, user.Email).Err()
	if err != nil {
		fmt.Printf("%s", err)
		return 400, err
	}

	//defer db.Close()
	return 200, nil
}

func (conn *UserRequests) GetUserByID(userID int) (models.User, error) {
	var user models.User

	// prob can make a view and view model for users
	queryString := `SELECT uid, firstname, lastname, email FROM users WHERE uid = ($1)`
	err := conn.db.QueryRow(queryString, userID).Scan(&user.UID, &user.Firstname, &user.Lastname, &user.Email)
	if err != nil {
		fmt.Printf("%s", err)
		return user, err
	}

	//defer db.Close()
	return user, nil
}
