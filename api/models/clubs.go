package models

type Club struct {
	CLID  int    `json:"CLID"`
	UID   int    `json:"UID"`
	Brand string `json:"Brand"`
	Type  string `json:"Type"`
	Name  string `json:"Name"`
}
