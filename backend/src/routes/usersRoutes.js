const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/admin');

//[GET] http://localhost:3000/profile
router.get('/profile', authMiddleware, userController.renderProfile); // Vista del perfil del usuario logueado

//[GET] http://localhost:3000/login
router.get('/login', userController.renderLogin); // Vista de login

//[GET] http://localhost:3000/users
router.get('/users', authMiddleware, isAdmin, userController.renderUsersList); // Vista lista de usuarios (admin)

//[GET] http://localhost:3000/api/user
router.get('/api/user', authMiddleware, userController.getUser); // Obtener datos del perfil del usuario o admin

//[PUT] http://localhost:3000/api/user
router.put('/api/user', authMiddleware, userController.updateUser); // Editar perfil del usuario o admin

//[DELETE] http://localhost:3000/api/user/:id
router.delete('/api/user/:id', authMiddleware, isAdmin, userController.deleteUser); // Borrar un usuario (solo admin)

//[POST] http://localhost:3000/api/user
router.post('/api/user', authMiddleware, userController.updateUserProfile); // Actualizar perfil del usuario

module.exports = router;
