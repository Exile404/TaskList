package main

import (
    "backend/database"
    "backend/models"
    "backend/routes"
)

func main() {
    config.InitDB()
    defer config.DB.Close()

    config.DB.AutoMigrate(&models.Task{})

    router := routers.SetupRouter()
    router.Run(":8080")
}
