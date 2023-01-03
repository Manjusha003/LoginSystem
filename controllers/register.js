
const db = require("../db-connection")
const bcrypt = require("bcrypt")
const registerUser = async (req, res) => {
    const { email, password: Npassword } = req.body;
  
    if (!email || !Npassword) {
        req.flash("error", "All fields are required")
        return res.render('register')

    } else {
        db.query('SELECT email FROM users WHERE email=?', [email], async (err, result) => {
            if (err) throw err
            if (result[0]) {
                req.flash("error", "Email is already registered")
               return res.render('register')
                // return res.json({ status: "error", error: "Email is already registered" })
            } else {
                const password = await bcrypt.hash(Npassword, 8)

                db.query('INSERT INTO users SET ?', { email: email, password: password }, (err, result) => {
                    if (err)
                        throw err
                    req.flash("success", "User has been registered successfully..!")
                return res.render('home',{email:req.body.email})
                    // return res.json({status:"success",success:"User has been registered successfully..!!"})
                })
            }
        })
    }


}

module.exports = registerUser

