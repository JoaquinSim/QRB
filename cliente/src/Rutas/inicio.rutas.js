const express = require('express');
const { mostrar, traer } = require('../Controllers/inicio.controller');
const { isLoggedIn } = require('../lib/auth');

const router = express.Router();

router.get('/inicio', isLoggedIn, mostrar)

module.exports = router