const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@11manjumysql",
    database:"loginsystem"
})

db.connect((err)=>{
    if (err)
        return err
    console.log("MySQL connected successfully")
})

module.exports = db;