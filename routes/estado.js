const { Router } = require('express');
const { getEstados, getEstadoById, createEstado, updateEstadoById } = require('../controllers/estado');

const router = Router();

/**
 * Obtiene todos los estados activos
 */
router.get('/', getEstados);

/**
 * Obtiene un estado por id
 */
 router.get('/:id', getEstadoById);

/**
 * Crear un estado
 */
router.post('/', createEstado);

/**
 * Actualiza un estado por id
 */
router.put('/:id', updateEstadoById);

module.exports = router;