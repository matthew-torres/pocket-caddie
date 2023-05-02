package db

import (
	"database/sql"
	"errors"
	"fmt"
	"os"

	_ "github.com/lib/pq"
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
