package models

type Hole struct {
	HID        int  `json:"HID"`
	RID        int  `json:"RID"`
	UID        int  `json:"UID"`
	HoleNumber int  `json:"HoleNumber"`
	Par        int  `json:"Par"`
	GIR        bool `json:"GIR"`
	FairwayHit bool `json:"FairwayHit"`
	Putts      int  `json:"Putts"`
	Score      int  `json:"Score"`
}
