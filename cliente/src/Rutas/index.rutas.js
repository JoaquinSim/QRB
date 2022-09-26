const express = require('express');
const { mostrar } = require('../Controllers/index.controller');

const router = express.Router();

router.get('/', mostrar)

module.exports = router