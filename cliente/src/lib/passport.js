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
      const ubicacion = await orm.ubicacion_cliente.findOne({ where: { pais_ubicacionCliente: pais } });
      if (usuarios === null) {
        const {nombreCompleto_cliente, correo_cliente, identificacion_cliente, fechaNacimiento_cliente,
          foto_cliente,  celular_cliente, estado_cliente, pais_ubicacionCliente, ciudad_ubicacionCliente,
          barrio_cliente} = req.body
        let nuevoUsuario = {
          nombreCompleto_cliente,
          correo_cliente,
          username_cliente : username,
          clave_cliente : password, 
          identificacion_cliente,
          fechaNacimiento_cliente,
          foto_cliente,
          celular_cliente,
          estado_cliente
        };

        let nuevaUbicacionUsuario = {
          pais_ubicacionCliente : pais,
          ciudad_ubicacionCliente,
          barrio_cliente
        };

        nuevoUsuario.clave_cliente = await helpers.encryptPassword(password);
        const resultado = await orm.cliente.create(nuevoUsuario);
        const ubicacion = await orm.ubicacion_clientes.create(nuevaUbicacionUsuario);
        nuevoUsuario.id = resultado.insertId;
        nuevaUbicacionUsuario.id = ubicacion.insertId;

        return done(null, nuevoUsuario, nuevaUbicacionUsuario);
      } else {
        if (usuarios) {
          const usuario = usuarios
          if (username == usuario.username_cliente) {
            done(null, false, req.flash("message", "El nombre de usuario ya existe."))
          } else {
            const {nombreCompleto_cliente, correo_cliente, identificacion_cliente, fechaNacimiento_cliente,
              foto_cliente,  celular_cliente, estado_cliente, pais_ubicacionCliente, ciudad_ubicacionCliente,
              barrio_cliente} = req.body
            let nuevoUsuario = {
              nombreCompleto_cliente,
              correo_cliente,
              username_cliente : username,
              clave_cliente : password, 
              identificacion_cliente,
              fechaNacimiento_cliente,
              foto_cliente,
              celular_cliente,
              estado_cliente
            };

            let nuevaUbicacionUsuario = {
              pais_ubicacionCliente : pais,
              ciudad_ubicacionCliente,
              barrio_cliente
            };
            nuevoUsuario.clave_cliente = await helpers.encryptPassword(password);
            const ubicacion = await orm.ubicacion_clientes.create(nuevaUbicacionUsuario);
            const resultado = await orm.cliente.create(nuevoUsuario);
            nuevoUsuario.id = resultado.insertId;
            nuevaUbicacionUsuario.id = ubicacion.insertId;
            return done(null, nuevoUsuario, nuevaUbicacionUsuario);
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