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
        try{
            const models = await this.collection.find({});
            const tasks = models.map(model => {
                return {
                    taskId:model.taskId,
                    taskName: model.taskName,
                    description: model.description
                }
            }); 

            return tasks; 

        }catch(err){
            console.log(err);
        }
    }
    async createNewTask(obj){
        try{
            
            const newTask = this.collection.create(obj); 
            return newTask;

        }catch(err){
            console.log(err);
        }
    }
    async deleteTask(id){
        try{
            const task = await this.collection.deleteOne({taskId:id});
            return task;
        }catch(err){
            console.log(err);
        }
    }

    async editTask(id,task){
        try{
            const task = await this.collection.updateOne({taskId:id},{
                $set:{
                    taskName:task.taskName,
                    description:task.description
                }
            }); 
    
            return task 
        }catch(err){
            console.log(err);
        }
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