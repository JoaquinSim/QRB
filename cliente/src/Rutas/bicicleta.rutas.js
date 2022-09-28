const express = require('express');
const { mostrarBicicleta } = require('../Controllers/bicicleta.controller');

const router = express.Router();

router.get('/bicicleta', mostrarBicicleta)

module.exports = router