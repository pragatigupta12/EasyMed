const express=require("express")
const app=express()
const path=require("path")
const ejsMate=require("ejs-mate");
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname,"/public")))
app.engine('ejs',ejsMate)
app.use(express.urlencoded({extended:true}))
const mongoose = require('mongoose');
const Doctor=require("./models/doctor.js")
const Patient=require("./models/patient.js")
const User=require("./models/user.js")
const ExpressError=require("./utils/ExpressError.js")
const flash=require("connect-flash")
const  session = require('express-session');
const passport = require("passport");
const LocalStrategy=require("passport-local")
main().then(()=>{
    console.log("connected to DBS")
})
.catch(err => console.log(err));
app.engine('ejs',ejsMate)
const sessionOption={
    secret:"mysupersecret",
    saveUninitialized:true,
    resave:false,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
};

app.use(session(sessionOption));
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/EasyMed');
}
app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    next()
})
app.get("/home",(req,res)=>{
    res.render("home.ejs")
})
app.get("/signup",(req,res)=>{
    res.render("signup.ejs")
})
app.get("/index",(req,res)=>{
    res.render("index.ejs")
})
app.get("/login",(req,res)=>{
    res.render("login.ejs")
})
app.post("/login",passport.authenticate('local',{failureRedirect:"/login"}),(req,res)=>{
req.flash("success","you are logged-in")
res.redirect("/index")
})
app.post("/signup",async(req,res)=>{
    try{
        let {username,password,email}=req.body;
        
        let newUser=new User({email,username})
        let registeredUser=await User.register(newUser,password)
        console.log(registeredUser)
        req.login(registeredUser,(err)=>{
        if(err){
        next(err)
        }else{
            req.flash("success","user was registerd successfully")
            res.redirect("/index")
        }
        })
            }
            catch(er){
                req.flash("error",er.message)
                res.redirect("/home")
            }
    })
app.get("/logout",(req,res,next)=>{
   req.logout((err)=>{
    if(err){
    return  next(err);
    }else{
        req.flash("success","you are log-out")
        res.redirect("/home")
    }
   })
})
    app.post("/appoinment",async(req,res,next)=>{
        
            let patientval= new Patient(req.body.patient )
            await patientval.save();
             let dr=await Doctor.findOne({specialist:patientval.speciality})
             let date=new Date(Date.now()).toString();
             res.render("appoinment.ejs",{patientval,dr,date})
     
       
    })
    app.use((err,req,res,next)=>{
     let{message="Internal server Error", status=500}=err;
     res.status(status).render("error.ejs",{message});
    })
app.listen(8080,()=>{
    console.log('app is listening')
})