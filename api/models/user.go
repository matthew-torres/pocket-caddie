package models

type User struct {
	UID       int    `json:"UID"`
	Firstname string `json:"Firstname"`
	Lastname  string `json:"Lastname"`
	Email     string `json:"Email"`
}
