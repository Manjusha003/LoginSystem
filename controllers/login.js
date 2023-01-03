const db = require("../db-connection")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        req.flash("error", "All fields are required")
        return res.render('login')
    } else {
        db.query('SELECT * FROM users WHERE email=?', [email], async (err, result) => {
            if (err) throw err
            if (!result.length > 0 || ! await bcrypt.compare(password, result[0].password)) {
                req.flash("error", "Incorrect Email or password")

                return res.render('login') 
            } else {
                
                const token = jwt.sign({ id: result[0].id }, "myfisrtmysqlassignment", {
                    expiresIn: 24 * 60 * 60 * 1000 //24hour
                })
            
                const cookieOptions = {
                    expiresIn: (24 * 60 * 60 * 1000), //24hour
                    httpOnly: true
                }
                req.session.id=result[0].id
                res.cookie("userRegistered", token, cookieOptions);
                req.flash("success", "User has been logged in")
                return res.render('home',{email:req.body.email})
               
            }

        })
    }
}

module.exports=loginUser