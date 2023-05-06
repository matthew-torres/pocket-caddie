package models

type User struct {
	UID       int     `json:"UID"`
	Firstname string  `json:"Firstname"`
	Lastname  string  `json:"Lastname"`
	Password  string  `json:"Password"`
	Email     string  `json:"Email"`
	Handicap  float32 `json:"Handicap"`
}
