const express = require('express');
const { mostrar, traer } = require('../Controllers/inicio.controller');

const router = express.Router();

router.get('/inicio', mostrar)

module.exports = router