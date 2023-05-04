package models

import "time"

type Round struct {
	ID          int       `json:"ID"`
	UID         int       `json:"UID"`
	Course      string    `json:"Course"`
	Score       int       `json:"Score"`
	Duration    float32   `json:"Duration"`
	WeatherCond string    `json:"WeatherCond"`
	Date        time.Time `json:"Date"`
}

// type RoundView struct {
// 	ID          int       `json:"ID"`
// 	Course      string    `json:"Course"`
// 	Score       int       `json:"Score"`
// 	Duration    float32   `json:"Duration"`
// 	WeatherCond string    `json:"WeatherCond"`
// 	Date        time.Time `json:"Date"`
// }
