const { BrowserWindow } = require("electron"); 
const DB = require("./dataBase/connect.js");
const { taskSchema } = require("./dataBase/schema/taskSchema.js");
const mongoose = require("mongoose");


class Task {
    constructor(taskName, description) {
        this.collection = mongoose.model("Task", taskSchema);
        DB(); 
    }

    async getAll(){
        const models = await this.collection.find({});
        const tasks = models.map(model => {
            return {
                taskName: model.taskName,
                description: model.description
            }
        })
        return tasks
    }
}


let window; 
function createWindow(){
    window = new BrowserWindow({
        width: 800,
        height:600,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false 
        }
    })

    window.loadFile("./UI/index.html"); 
}

module.exports ={
    createWindow,
    Task
}