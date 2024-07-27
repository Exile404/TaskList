package routers

import (
    "backend/controllers"
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
)

func SetupRouter() *gin.Engine {
    router := gin.Default()

    config := cors.DefaultConfig()
    config.AllowOrigins = []string{"http://localhost:3000", "https://task-list-frontend-app.vercel.app"}
    router.Use(cors.New(config))

    router.POST("/tasks", controllers.CreateTask)
    router.GET("/tasks", controllers.GetTasks)
    router.GET("/tasks/:id", controllers.GetTask)
    router.PUT("/tasks/:id", controllers.UpdateTask)
    router.PATCH("/tasks/:id", controllers.PartialUpdateTask)
    router.DELETE("/tasks/:id", controllers.DeleteTask)

    return router
}
