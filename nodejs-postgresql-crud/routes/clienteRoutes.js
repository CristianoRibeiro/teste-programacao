// routes/clienteRoutes.js
const express = require('express');
const clienteController = require('../controllers/ClienteController');

const router = express.Router();

router.post('/clientes', clienteController.create);
router.get('/clientes', clienteController.list);
router.put('/clientes/:id', clienteController.update);
router.delete('/clientes/:id', clienteController.delete);

module.exports = router;
