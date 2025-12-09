const express = require('express');
const router = express.Router();
const favoritosController = require('../controller/favoritosController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

//[GET] /api/favoritos - Obtener favoritos del usuario logueado
router.get('/api/favoritos', favoritosController.getFavoritos);

//[POST] /api/favoritos - Añadir evento a favoritos
router.post('/api/favoritos', favoritosController.addFavorito);

//[DELETE] /api/favoritos/:evento_id - Quitar evento de favoritos
router.delete('/api/favoritos/:evento_id', favoritosController.deleteFavorito);

//[GET] /api/favoritos/:evento_id/check - Verificar si es favorito
router.get('/api/favoritos/:evento_id/check', favoritosController.isFavorito);

module.exports = router;