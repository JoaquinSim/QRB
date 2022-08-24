const express = require('express');
const rutas = express.Router()

const { mostrar } = require('../controladores/loginControlador')

rutas.get('/login', mostrar)

module.exports = rutas