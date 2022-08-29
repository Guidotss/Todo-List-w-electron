const mongoose = require('mongoose');
const configDB = require('./config.js');

const connectDB = () => {
    try{
        mongoose.connect(configDB.local.url, configDB.local.options)
            .then(() => console.log('DB Connected')).
            catch(err => console.log(err));
    }catch(err){
        console.log(err);
    }
}

module.exports=connectDB;