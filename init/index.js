const mongoose=require("mongoose");
const initData=require("./data.js");
const Doctor=require("../models/doctor.js");
main().then(()=>{
    console.log("DB connected")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/EasyMed');
}
const initDB=async()=>{
    await Doctor.deleteMany({});
    await Doctor.insertMany(initData.data);
    console.log("data was intialize")
}
initDB();