const { Router } = require('express');
/*const { TipoEquipo } = require('../models/tipoEquipo');
const { Usuario } = require('../models/usuario');*/
const { getTiposEquipo, getTiposEquipoUserActivo, createTipoEquipo, getTiposEquipoById, updateTipoEquipoById, deleteTipoEquipoByID } = require('../controllers/tipoEquipo');

const router = Router();

/**
 * btiene todos los tipos de equipos los cuales los usuarios
 * son activos
 */
router.get('/user-activo', getTiposEquipoUserActivo);

/**
 * Obtiene todos los tipos de equipos
 */
router.get('/', getTiposEquipo);

/**
 * Obtiene un tipos de equipos por id
 */
 router.get('/:id', getTiposEquipoById);

/**
 * Crear un tipos de equipos
 */
router.post('/', createTipoEquipo);

/**
 * Actualiza un tipos de equipos por id
 */
router.put('/:id', updateTipoEquipoById);

/**
 * Actualiza una parte del tipos de equipos
 */
router.patch('/:id', (req, res) => {
    res.json({});
});

/**
 * Borra un tipos de equipos por id
 */
 router.delete('/:id', deleteTipoEquipoByID);

module.exports = router;