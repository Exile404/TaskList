package models

type Task struct {
    ID          uint   `gorm:"primary_key" json:"id"`
    Title       string `json:"title"`
    Description string `json:"description"`
    Completed   bool   `json:"completed"`
}
