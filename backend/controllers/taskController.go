package controllers

import (
    "net/http"
    "backend/database"
    "backend/models"
    "github.com/gin-gonic/gin"
)

func CreateTask(c *gin.Context) {
    var task models.Task
    if err := c.ShouldBindJSON(&task); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    config.DB.Create(&task)
    c.JSON(http.StatusOK, task)
}

func GetTasks(c *gin.Context) {
    var tasks []models.Task
    config.DB.Find(&tasks)
    c.JSON(http.StatusOK, tasks)
}

func GetTask(c *gin.Context) {
    id := c.Param("id")
    var task models.Task
    if config.DB.First(&task, id).RecordNotFound() {
        c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
        return
    }
    c.JSON(http.StatusOK, task)
}

func UpdateTask(c *gin.Context) {
    id := c.Param("id")
    var task models.Task
    if config.DB.First(&task, id).RecordNotFound() {
        c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
        return
    }

    if err := c.ShouldBindJSON(&task); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    config.DB.Save(&task)
    c.JSON(http.StatusOK, task)
}

func PartialUpdateTask(c *gin.Context) {
    id := c.Param("id")
    var task models.Task
    if config.DB.First(&task, id).RecordNotFound() {
        c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
        return
    }

    var updates map[string]interface{}
    if err := c.ShouldBindJSON(&updates); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    config.DB.Model(&task).Updates(updates)
    c.JSON(http.StatusOK, task)
}

func DeleteTask(c *gin.Context) {
    id := c.Param("id")
    var task models.Task
    if config.DB.First(&task, id).RecordNotFound() {
        c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
        return
    }

    config.DB.Delete(&task)
    c.JSON(http.StatusOK, gin.H{"message": "Task deleted"})
}
