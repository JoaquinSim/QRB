const express = require('express');
const { listar, mostrar, enviar, traer, actualizar, eliminar } = require('../Controllers/grupo.controller');
const { isLoggedIn } = require('../lib/auth');

const router = express.Router();

router.get('/grupos/listar/:id', isLoggedIn,listar)

router.get('/grupos/agregar/:id', isLoggedIn,mostrar)

router.post("/grupos/agregar/:id", isLoggedIn,enviar)

router.get("/grupos/editar/:id",isLoggedIn, traer)

router.post("/grupos/editar/:id",isLoggedIn, actualizar)

router.get('/grupos/eliminar/:id',isLoggedIn, eliminar)

module.exports = router