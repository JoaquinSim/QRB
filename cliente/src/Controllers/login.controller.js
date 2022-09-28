const passport = require("passport")

const loginCTL = {}

loginCTL.mostrarLogin = (req, res)=>{
    res.render('registro/login')
}

loginCTL.login = passport.authenticate('local.signin', {
    successRedirect: '/inicio',
    failureRedirect: '/login',
    failureFlash: true
})

loginCTL.mostrarRegistro= (req, res)=>{
    res.render('registro/registro')
}


loginCTL.registro = passport.authenticate('local.signup', {
    successRedirect: '/cerrarsesion',
    failureRedirect: '/registro',
    failureFlash: true
})

loginCTL.cerrarsesion = (req, res, next) =>{
    req.logout(function(err){
        if (err) {
            return next(err)
        }
        req.flash('success', 'Sesion finalizada')
        res.redirect('/login')
    })
}

module.exports = loginCTL