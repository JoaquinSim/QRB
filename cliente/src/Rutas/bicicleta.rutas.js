const express = require('express');
const { agregarBicicleta, listar, enviar, traer, eliminar, actualizar } = require('../Controllers/bicicleta.controller');
const { isLoggedIn } = require('../lib/auth');

const router = express.Router();


router.get('/bicicleta/agregar/:id',isLoggedIn, agregarBicicleta)

router.post("/bicicleta/agregar/:id",isLoggedIn, enviar)

router.get('/bicicleta/listar/:id',isLoggedIn, listar)

router.get("/bicicleta/editar/:id",isLoggedIn, traer)

router.post("/bicicleta/editar/:id",isLoggedIn, actualizar)

router.get("/bicicleta/eliminar/:id",isLoggedIn, eliminar)

module.exports = router