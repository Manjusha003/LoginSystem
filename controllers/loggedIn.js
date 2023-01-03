
const db = require("../db-connection");
const jwt=require("jsonwebtoken");
const session = require("express-session");

const loggedIn = async (req, res, next) => {

    if (!res.cookie.userRegistered)
        return next()
    try {
        const decoded = jwt.verify(res.cookie.userRegistered, "myfisrtmysqlassignment");
        db.query("SELECT * FROM users WHERE id=?", [decoded.id], (err, result) => {
            if (err) return next()
            req.user = result[0]
  
            return next();
        })
        
    } catch (err) {
        if (err)
        return next()
    }
}

module.exports=loggedIn



