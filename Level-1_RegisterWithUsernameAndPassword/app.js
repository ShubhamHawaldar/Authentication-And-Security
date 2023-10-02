//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true });

const userSchema = {
    email: String,
    password: String
}

const User = new mongoose.model("User", userSchema)

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home.ejs")
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/register", (req, res) => {
    const newUser = new User({
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

    User.findOne({ email: username }).then((foundUser) => {
        if (foundUser.password === password) {
            res.render("secrets.ejs");
        }
    }).
        catch((err) => {
            console.log(err);
        });

});


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
