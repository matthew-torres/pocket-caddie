package models

type Stroke struct {
	STID         int    `json:"STID"`
	HID          int    `json:"HID"`
	Club         string `json:"Club"`
	Distance     int    `json:"Distance"`
	Lie          string `json:"Lie"`
	ResultingLie string `json:"ResultingLie"`
}
