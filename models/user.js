const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const passport_local_mongoose=require("passport-local-mongoose")

const userSchema =new Schema({
    email:{
        type:String,
        require:true
    }
})

userSchema.plugin(passport_local_mongoose)

const User=mongoose.model("User",userSchema)

module.exports=User