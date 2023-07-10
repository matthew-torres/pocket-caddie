package models

type User struct {
	UID       int     `json:"UID"`
	Firstname string  `json:"Firstname"`
	Lastname  string  `json:"Lastname"`
	Password  string  `json:"Password" binding:"required"`
	Email     string  `json:"Email" binding:"required"`
	Handicap  float32 `json:"Handicap"`
}
