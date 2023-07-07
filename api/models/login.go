package models

type UserLogin struct {
	Password string `json:"Password" binding:"required"`
	Email    string `json:"Email" binding:"required"`
}
