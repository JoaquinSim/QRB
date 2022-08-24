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

usuarioctl.mostrarRegistro = (req, res) =>{
    res.render('usuario/registro');
}

usuarioctl.login = passport.authenticate('local.signin', {
    successRedirect:'/CerrarSecion', 
    failureRedirect:'/registro',
    failureFlash: true
})

usuarioctl.cerrar = (req , res, next)=>{
    req.logOut();
    res.redirect('/');
}

module.exports = usuarioctl