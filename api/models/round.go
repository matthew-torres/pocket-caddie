package models

type Round struct {
	ID     int64  `json:"ID"`
	UID    int64  `json:"UID"`
	Course string `json:"Course"`
	Score  int16  `json:"Score"`
}
