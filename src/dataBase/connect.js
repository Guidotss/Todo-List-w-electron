const mongoose = require('mongoose');
const configDB = require('./config.js');

const connectDB = () => {
    try{
        mongoose.connect(configDB.url, configDB.options)
    }catch(err){
        console.log(err);
    }
}

module.exports=connectDB;