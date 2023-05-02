package db

import (
	"fmt"
	"log"

	"github.com/matthew-torres/pocket-caddie/api/models"
)

func NewUser(user models.User) (int, error) {
	db, err := InitDB()
	if err != nil {
		log.Fatal(err)
	}

	queryString := `INSERT INTO users(Firstname, Lastname, Email) VALUES ($1, $2, $3)`
	err = db.QueryRow(queryString, user.Firstname, user.Lastname, user.Email).Err()
	if err != nil {
		fmt.Printf("%s", err)
		return 400, err
	}

	defer db.Close()
	return 200, nil
}

func GetUserByID(userID int) (models.User, error) {
	var user models.User

	db, err := InitDB()
	if err != nil {
		log.Println(err)
	}

	// prob can make a view and view model for users
	queryString := `SELECT uid, firstname, lastname, email FROM users WHERE uid = ($1)`
	err = db.QueryRow(queryString, userID).Scan(&user.UID, &user.Firstname, &user.Lastname, &user.Email)
	if err != nil {
		fmt.Printf("%s", err)
		return user, err
	}

	defer db.Close()
	return user, nil
}
