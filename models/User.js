import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
   name:{
       type:String,
       required:true
   },
   email:{
       type:String,
       required:true,
       unique:true
   } ,
   contactnumber:{
       type:String,
       required:true
   },
   address:{
       type:String,
       required:true,
   }
},{
  timestamps:true  
})


export default  mongoose.models.User || mongoose.model('User',userSchema)

// "name":"priyanshii",
// "email":"priya@123dotcom",
// "contactnumber":"43215",
// "address":"Rajasthan, India"