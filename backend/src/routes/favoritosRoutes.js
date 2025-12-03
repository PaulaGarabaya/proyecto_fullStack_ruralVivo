const express = require('express');
// const { 
//     getFavorites, 
//     addFavorite, 
//     removeFavorite ,
//     getFavoritesView
// } = require('../controllers/favoritesController');
// const authMiddleware = require('../middlewares/authMiddlewares');

// const router = express.Router();

// // [GET] http://localhost:3000/favorites - Películas favoritas
// router.get('/favorites', authMiddleware, getFavoritesView);

// // [GET] http://localhost:3000/api/favorites - Películas favoritas
// router.get('/api/favorites/', getFavorites);

// // [POST] http://localhost:3000/api/favorites - Añadir favorito
// router.post('/api/favorites', addFavorite);

// // [DELETE] http://localhost:3000/api/favorites/:id - Eliminar favorito
// router.delete('/api/favorites/:id', removeFavorite);

module.exports = router;
const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/favoritosController');
const { authMiddleware } = require('../middlewares/auth');

//[GET] http://localhost:3000/api/usuarios/:id/favoritos/eventos
router.get('/api/usuarios/:id/favoritos/eventos', authMiddleware, favoritosController.getFavoritos); // Obtener eventos favoritos del usuario

//[POST] http://localhost:3000/api/usuarios/:id/favoritos/eventos
router.post('/api/usuarios/:id/favoritos/eventos', authMiddleware, favoritosController.addFavorito); // Añadir evento a favoritos

//[DELETE] http://localhost:3000/api/usuarios/:id/favoritos/eventos/:evento_id
router.delete('/api/usuarios/:id/favoritos/eventos/:evento_id', authMiddleware, favoritosController.removeFavorito); // Quitar evento de favoritos

module.exports = router;
