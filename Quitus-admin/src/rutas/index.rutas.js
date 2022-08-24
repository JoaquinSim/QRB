const express = require('express');
const rutas = express.Router()

const { mostrar } = require('../controladores/indexControlador')

rutas.get('/', mostrar)

module.exports = rutas