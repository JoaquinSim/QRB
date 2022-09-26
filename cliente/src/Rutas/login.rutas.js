const express = require('express');
const { mostrarLogin, login, mostrarRegistro, registro, cerrarsesion } = require('../Controllers/login.controller');

const router = express.Router();

router.get('/login', mostrarLogin)

router.post('/login', login)

router.get('/registro', mostrarRegistro)

router.post('/registro', registro)

router.get('/cerrarsesion', cerrarsesion)

module.exports = router