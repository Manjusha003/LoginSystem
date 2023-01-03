const express = require('express')
const {db} = require("./db-connection")
const path = require('path');
const mysql=require("mysql")
const registerUser = require('./controllers/register');
const loginUser = require('./controllers/login');
const bodyParser = require("body-parser")
const session = require('express-session')
const cookie=require("cookie-parser")
const flash = require('express-flash');
const loggedIn = require('./controllers/loggedIn');
const logOut=require("./controllers/logout")

const app = express();
app.use(cookie());
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use(express.static("public"));

const mysqlStore = require('express-mysql-session')(session);

const options ={
    connectionLimit: 10,
    password:"@11manjumysql",
    user: "root",
    database: "loginsystem",
    host: "localhost",
    port: 3306,
    createDatabaseTable: true
    
}
const pool = mysql.createPool(options);
 
const  sessionStore = new mysqlStore(options,pool);


app.use(session({
    secret: "hello",
    resave: true,
    store: sessionStore,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 15 },
    createDatabaseTable: true
}))

app.use(flash())

app.get("/", loggedIn, (req, res) => {
    
    res.render("home",{email:req.body.email})
})
app.get("/register", (req, res) => {
    res.render('register')
})
app.post("/register",registerUser)

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login",loginUser)
app.get("/logout",logOut)


app.listen(3030)