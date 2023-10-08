require('dotenv').config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import encrypt from "mongoose-encryption";


const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect("mongodb://127.0.0.1:27017/userDB_2",{useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    email : String,
    password : String
});

const secret = process.env.SECRET;
// userSchema.plugin(encrypt,{secret : secret});
userSchema.plugin(encrypt,{secret : secret , encryptedFields: ["password"]});


const User_2 = new mongoose.model("User_2", userSchema);
app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.get("/login",(req,res)=>{
    res.render("login.ejs");
});

app.get("/register",(req,res)=>{
    res.render("register.ejs");
});

app.post("/register", (req, res) => {
    const newUser = new User_2({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save().then((newUser) => {
        res.render("secrets.ejs");
    }).
        catch((err) => {
            console.log(err);
        });
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User_2.findOne({ email: username }).then((foundUser) => {
        if (foundUser.password === password) {
            res.render("secrets.ejs");
        }
    }).
        catch((err) => {
            console.log(err);
        });

});


app.listen(port, ()=>{
    console.log(`server is runnig on port ${port}`)
});