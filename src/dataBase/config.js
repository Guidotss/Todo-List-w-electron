const config ={
  atlas:{
    url:`mongodb+srv://Guido:guidomartin@cluster0.tijy1to.mongodb.net/Task?retryWrites=true&w=majority`,
    options:{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
  },
  local:{
    url:`mongodb://localhost:27017/Task`,
    options:{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
  }
}
module.exports = config;