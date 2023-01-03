
const logOut=((req, res)=>{
    req.session.destroy();
    res.redirect("/");

});

module.exports = logOut
