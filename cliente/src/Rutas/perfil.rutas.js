const express = require('express');
const { mostrar, actualizar } = require('../Controllers/perfil.controller');

const router = express.Router();

router.get('/perfil_editar/:id', mostrar)

router.post('/perfil_editar/:id', actualizar)

module.exports = router