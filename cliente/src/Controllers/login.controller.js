const passport = require("passport")
const orm = require("../ConfigDataBase/DataBase.orm");
const sql = require("../ConfigDataBase/DataBase.sql");

const loginCTL = {}

loginCTL.mostrarLogin = async(req, res) => {
    const ids = req.params.id
    const Usuario = await sql.query('select id_cliente, username_cliente from clientes where id_cliente = ?', [ids])
    res.render('registro/login', { Usuario })
}

loginCTL.login = passport.authenticate('local.signin', {
    successRedirect: '/inicio',
    failureRedirect: '/login',
    failureFlash: true
})

loginCTL.mostrarRegistro = async(req, res) => {
    const cliente = await sql.query('select max(id_cliente) from clientes')
    res.render('registro/registro', { cliente })
}


loginCTL.registro = passport.authenticate('local.signup', {
    successRedirect: '/cerrarsesion',
    failureRedirect: '/registro',
    failureFlash: true
})


loginCTL.cerrarsesion = (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err)
        }
        req.flash('success', 'Sesion finalizada')
        res.redirect('/')
    })
}

module.exports = loginCTL