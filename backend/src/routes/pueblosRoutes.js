// GET /pueblos
// GET /pueblos/:id
// POST /pueblos
// PUT /pueblos/:id
// DELETE /pueblos/:id

const express = require('express');
const router = express.Router();
const pueblosController = require('../controller/pueblosController');
// const { authMiddleware } = require('../middlewares/auth');
// const { isAdmin } = require('../middlewares/admin');

//[GET] http://localhost:3000/api/pueblos
router.get('/api/pueblos',pueblosController.getPueblos);
// router.get('/api/pueblos', pueblosController.getPueblos); // Listado público de pueblos

// //[GET] http://localhost:3000/api/pueblos/:id
router.get('/api/pueblos/:id', pueblosController.getPueblo);
// router.get('/api/pueblos/:id', pueblosController.getPueblo); // Detalle de un pueblo

// //[POST] http://localhost:3000/api/pueblos
router.post('/api/pueblos', pueblosController.createPueblo);
// router.post('/api/pueblos', authMiddleware, isAdmin, pueblosController.createPueblo); // Crear pueblo (solo admin)

// //[PUT] http://localhost:3000/api/pueblos/:id
router.put('/api/pueblos/:id', pueblosController.updatePueblo);
// router.put('/api/pueblos/:id', authMiddleware, isAdmin, pueblosController.updatePueblo); // Editar pueblo (solo admin)

// //[DELETE] http://localhost:3000/api/pueblos/:id
router.delete('/api/pueblos/:id', pueblosController.deletePueblo);
// router.delete('/api/pueblos/:id', authMiddleware, isAdmin, pueblosController.deletePueblo); // Eliminar pueblo (solo admin)

module.exports = router;

