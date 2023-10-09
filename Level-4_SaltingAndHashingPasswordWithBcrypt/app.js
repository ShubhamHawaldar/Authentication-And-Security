import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";


const app = express();
const port = 3000;
const saltRound = 10;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/userDB_4", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/register", (req, res) => {

    bcrypt.hash(req.body.password,saltRound, function(err,hash){
        const newUser = new User({
            email: req.body.username,
            password: hash
        });
        newUser.save().then(() => {
            res.render("secrets.ejs");
        }).catch((err) => {
            console.log(err);
        });
    });
   

});

app.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}).then((foundUser)=>{
     if(foundUser){
        bcrypt.compare(password, foundUser.password, function(err,result){
            if(result === true){
                res.render("secrets.ejs");
            }
        });
     }
    }).catch((err)=>{
        console.log(err);
    });

});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});