const express = require('express');
const { mostrar } = require('../Controllers/perfil.controller');


const router = express.Router();

router.get('/perfil/perfil/:id', mostrar)

module.exports = router