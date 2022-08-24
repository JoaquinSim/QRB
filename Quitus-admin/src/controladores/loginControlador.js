const usuarioctl = {}
const passport = require('passport')

usuarioctl.mostrar = (req, res) =>{
    res.render('usuario/login');
}

usuarioctl.login = passport.authenticate('local.signin', {
    successRedirect:'/proyecto/agregar', 
    failureRedirect:'/login',
    failureFlash: true
})