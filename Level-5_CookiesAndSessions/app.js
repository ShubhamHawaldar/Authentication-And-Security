import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({}));

mongoose.connect("mongodb://127.0.0.1:27017/userDB_5", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);

app.get("/", (req,res)=>{
    res.render("home.ejs");
});

app.get("/register", (req,res)=>{
    res.render("register.ejs");
});

app.get("/login", (req,res)=>{
    res.render("login.ejs");
});

app.post("/register",(req,res)=>{

});

app.post("/login",(req,res)=>{
    
});

app.listen(port , ()=>{
    console.log(`Sevver is running on port ${port}`);
});