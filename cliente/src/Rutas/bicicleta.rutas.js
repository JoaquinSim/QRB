const express = require('express');
const { mostrarBicicleta, agregarBicicleta, editarBicicleta } = require('../Controllers/bicicleta.controller');

const router = express.Router();

router.get('/bicicleta/agregar', agregarBicicleta)

router.get('/bicicleta/listar', mostrarBicicleta)

router.get('/bicicleta/editar', editarBicicleta)


module.exports = router