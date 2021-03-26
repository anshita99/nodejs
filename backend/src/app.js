require('dotenv').config();
const express = require ("express");
const path = require("path");
const app = express();
const hbs=require('hbs');
require("./db/conn");
const bcrypt =  require ("bcryptjs");
const cookieParser = require("cookie-parser")
const auth = require("./middleware/auth")

const Register = require("./models/signup");

const port = process.env.PORT || 3000;

console.log(path.join(__dirname,'../public'));

const staticPath=path.join(__dirname,'../public');
const templatePath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))

app.use(express.static(staticPath));
app.set("view engine","hbs");
app.set("views",templatePath);
hbs.registerPartials(partialsPath);


console.log(process.env.SECRET)



app.get("/",(req,res)=>{
     res.render("index")
})

app.get("/secret",auth,(req,res)=>{
    
    res.render("secret")
})

app.get("/login",(req,res)=>{
    
    res.render("login")
})

app.get("/signup",(req,res)=>{
    
    res.render("signup")
})

app.post("/signup",async (req,res)=>{
    try{
        const userRegistration= new Register({
            name:req.body.name,
            username:req.body.username,
            password:req.body.password,
            email:req.body.mail,
            contact:req.body.contact,
            gender:req.body.gender,

        })
        console.log(userRegistration)
        const token=await userRegistration.generateAuthtoken();
        console.log("the token part"+token)
        res.cookie("jwt", token, {
            expires:new Date (Date.now()+600000),
            httpOnly:true
        });
        console.log(cookie)
        const signedUp = await userRegistration.save();
        console.log(signedUp);
        res.status(201).render("index")
    }catch(error){
        res.status(400).send(error);
    } // res.render("signup")
   
})

app.post("/login",async(req,res)=>{
    try{
        const email = req.body.mail;
        const password = req.body.password;

        console.log(`${email} and password is ${password}`)
        const useremail = await Register.findOne({email:email});

        const isMatch = await bcrypt.compare(password,useremail.password);
        const token=await useremail.generateAuthtoken();
        console.log("the token part "+token)

        res.cookie("jwt", token, {
            expires:new Date (Date.now()+600000),
            httpOnly:true
        });
       
        if(isMatch){
            res.status(201).render("index");
        }else{
            res.send("invalid login details");
        }

    }catch(error){
        res.status(400).send("invalid mail");
    }   
   
})



app.listen(port,()=>{
    console.log(`server running at port number ${port}`);
})