const mongoose=require("mongoose")
const Schema=mongoose.Schema;


const patientSchema=new Schema({
name:{
  type:String,
  require:true
}  ,
age:{
    type: Number,
    require:true
},
gender:{
    type:String,
  require:true
},
speciality:{
  type:String,
  required:true
}
})
const Patient=mongoose.model("Patient",patientSchema)

module.exports=Patient