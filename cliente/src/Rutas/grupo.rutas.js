const express = require('express');
const { listar, mostrar, enviar, traer, actualizar } = require('../Controllers/grupo.controller');

const router = express.Router();

router.get('/grupos/listar/:id', listar)

router.get('/grupos/agregar/:id', mostrar)

router.post("/grupos/agregar/:id", enviar)

router.get("/grupos/editar/:id", traer)

router.post("/grupos/editar/:id", actualizar)

module.exports = router