const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const CryptoJS = require('crypto-js')

const orm = require('../ConfigDataBase/DataBase.orm')
const sql = require('../ConfigDataBase/DataBase.sql')
const helpers = require("./helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const rows = await orm.cliente.findOne({ where: { username_cliente: username } });
      if (rows) {
        const user = rows;
        const contraseña = await CryptoJS.AES.decrypt(user.clave_cliente, 'secret');
        const validPassword = contraseña.toString(CryptoJS.enc.Utf8);
        if (validPassword) {
          done(null, user, req.flash("message", "Bienvenido" + " " + user.username_cliente));
        } else {
          done(null, false, req.flash("message", "Datos incorrecta"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "El nombre de usuario no existe.")
        );
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const usuarios = await orm.cliente.findOne({ where: { username_cliente: username } });
      if (usuarios === null) {
        const {nombreCompleto_cliente, correo_cliente } = req.body
        let nuevoUsuario = {
          nombreCompleto_cliente,
          correo_cliente,
          username_cliente : username,
          clave_cliente : password 
        };
        nuevoUsuario.clave_cliente = await helpers.encryptPassword(password);
        const resultado = await orm.cliente.create(nuevoUsuario);
        nuevoUsuario.id = resultado.insertId;
        return done(null, nuevoUsuario);
      } else {
        if (usuarios) {
          const usuario = usuarios
          if (username == usuario.username_cliente) {
            done(null, false, req.flash("message", "El nombre de usuario ya existe."))
          } else {
            const {nombreCompleto_cliente} = req.body
            let nuevoUsuario = {
              nombreCompleto_cliente, 
              username_cliente : username,
              clave_cliente : password 
            };
            nuevoUsuario.clave_cliente = await helpers.encryptPassword(password);
            const resultado = await orm.cliente.create(nuevoUsuario);
            nuevoUsuario.id = resultado.insertId;
            return done(null, nuevoUsuario);
          }
        }
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
}); 