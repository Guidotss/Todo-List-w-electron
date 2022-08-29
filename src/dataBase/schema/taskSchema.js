const mongoose = require("mongoose"); 

const taskSchema = new mongoose.Schema({
    taskId:{
        type: Number,
        required: true,
    },
    taskName:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required: true,
    }
}); 



module.exports = {
    taskSchema
};
