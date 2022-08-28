const taskSchema = require("../dataBase/schema/taskModel.js");
const mongoose = require("mongoose"); 
const configDB = requiere("../dataBase/config.js")

const dataBase = mongoose.connect(configDB.url,configDB.options);

class Task{
    constructor(collection,schema){
        this.collection = mongoose.model("task",taskSchema); 
    }
}