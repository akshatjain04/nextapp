import mongoose from "mongoose";

function initDB() {
    if(mongoose.connections[0].readyState){
        console.log("already connected")
        return
    }
    mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser:true,   
    })
    mongoose.connection.on('connected',()=>{
        console.log("happily connected to mongo")
    })
    mongoose.connection.on('error',(err)=>{
        console.log("not happily connected to mongo, error is there",err)
    })
}

export default initDB