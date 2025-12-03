// GET /eventos
// GET /pueblos/:id/eventos
// GET /eventos/calendario

// POST /eventos
// GET /eventos/:id
// PUT /eventos/:id
// DELETE /eventos/:id

const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventosController');
const { authMiddleware } = require('../middlewares/auth');
const { isOwner } = require('../middlewares/isOwner');

//[GET] http://localhost:3000/api/eventos
router.get('/api/eventos', eventosController.getEventos); // Listado público de eventos

//[GET] http://localhost:3000/api/eventos/:id
router.get('/api/eventos/:id', eventosController.getEvento); // Detalle de un evento

//[GET] http://localhost:3000/api/pueblos/:id/eventos
router.get('/api/pueblos/:id/eventos', eventosController.getEventosPorPueblo); // Eventos por pueblo

//[GET] http://localhost:3000/api/eventos/calendario
router.get('/api/eventos/calendario', eventosController.getCalendario); // Vista calendario

//[POST] http://localhost:3000/api/eventos
router.post('/api/eventos', authMiddleware, eventosController.createEvento); // Crear evento (usuarios logueados)

//[PUT] http://localhost:3000/api/eventos/:id
router.put('/api/eventos/:id', authMiddleware, isOwner, eventosController.updateEvento); // Editar evento (solo propietario)

//[DELETE] http://localhost:3000/api/eventos/:id
router.delete('/api/eventos/:id', authMiddleware, isOwner, eventosController.deleteEvento); // Eliminar evento (solo propietario)

module.exports = router;
