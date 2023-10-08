import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import md5 from "md5";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/userDB_3", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs")
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/register", (req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)
    });
    newUser.save().then(() => {
        res.render("secrets.ejs")
    }).catch((err) => {
        console.log(err);
    });
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = md5(req.body.password);

    User.findOne({ email: username }).then((foundUser) => {
        if (foundUser.password === password) {
            res.render("secrets.ejs");
        }
    }).catch((err)=>{
        console.log(err);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});