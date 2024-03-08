const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const doctorSchema=new Schema({
    name:{
        type:String,
        require:true
      }  ,
      specialist:{
        type:String,
        require:true
      }
})

const Doctor=mongoose.model("Doctor",doctorSchema);
module.exports=Doctor