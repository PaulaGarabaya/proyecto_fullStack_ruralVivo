const express = require('express');
const router = express.Router();
const eventosController = require('../controller/eventosController');
// const { authMiddleware } = require('../middlewares/auth');
// const { isOwner } = require('../middlewares/isOwner');

//[GET] http://localhost:3000/api/eventos
router.get('/api/eventos', eventosController.getEventos); // Listado público de eventos

//[GET] http://localhost:3000/api/eventos/:id
router.get('/api/eventos/:id', eventosController.getEvento); // Detalle de un evento

//[GET] http://localhost:3000/api/pueblos/:id/eventos
router.get('/api/pueblos/:id/eventos', eventosController.getEventosPorPueblo); // Eventos por pueblo

//[POST] http://localhost:3000/api/eventos
router.post('/api/eventos', eventosController.createEvento);
// router.post('/api/eventos', authMiddleware, eventosController.createEvento); // Crear evento (usuarios logueados)

//[PUT] http://localhost:3000/api/eventos/:id
router.put('/api/eventos/:id', eventosController.updateEvento);
// router.put('/api/eventos/:id', authMiddleware, isOwner, eventosController.updateEvento); // Editar evento (solo propietario)

//[DELETE] http://localhost:3000/api/eventos/:id
router.delete('/api/eventos/:id', eventosController.deleteEvento);
// router.delete('/api/eventos/:id', authMiddleware, isOwner, eventosController.deleteEvento); // Eliminar evento (solo propietario)

module.exports = router;
