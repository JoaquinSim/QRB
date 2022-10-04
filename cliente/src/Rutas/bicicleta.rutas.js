const express = require('express');
const { agregarBicicleta, listar, enviar, traer, eliminar, actualizar } = require('../Controllers/bicicleta.controller');

const router = express.Router();

router.get('/bicicleta/agregar/:id', agregarBicicleta)

router.post("/bicicleta/agregar/:id", enviar)

router.get('/bicicleta/listar/:id', listar)

router.get("/bicicleta/editar/:id", traer)

router.post("/bicicleta/editar/:id", actualizar)

router.get("/bicicleta/eliminar/:id", eliminar)

module.exports = router