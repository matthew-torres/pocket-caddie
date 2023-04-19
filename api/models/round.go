package models

type Round struct {
	ID     int    `json:"ID"`
	UID    int    `json:"UID"`
	Course string `json:"Course"`
	Score  int    `json:"Score"`
}
