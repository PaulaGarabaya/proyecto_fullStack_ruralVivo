// AUTENTICACIÓN (API JSON)
router.post('/api/signup', authController.createUser);       // Registrar usuario
router.post('/api/login', authController.logIn);             // Login
router.post('/api/logout', authController.logOut);           // Logout

router.post('/api/recoverpassword', authController.recoverPassword); // Solicitar email de recuperación
router.post('/api/restorepassword', authController.restorePassword); // Cambiar contraseña usando token

// GOOGLE OAUTH
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    authController.googleAuthCallback
);



const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
const { authMiddleware } = require('../middlewares/auth');

//[POST] http://localhost:3000/api/signup
router.post('/api/signup', authController.createUser); // Registrar nuevo usuario

//[POST] http://localhost:3000/api/login
router.post('/api/login', authController.logIn); // Login con email y password

//[POST] http://localhost:3000/api/logout
router.post('/api/logout', authMiddleware, authController.logOut); // Logout del usuario

//[POST] http://localhost:3000/api/recoverpassword
router.post('/api/recoverpassword', authController.recoverPassword); // Solicitar recuperación de contraseña

//[POST] http://localhost:3000/api/restorepassword
router.post('/api/restorepassword', authController.restorePassword); // Cambiar contraseña usando token

//[GET] http://localhost:3000/auth/google
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] })); // Iniciar autenticación con Google

//[GET] http://localhost:3000/auth/google/callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  authController.googleAuthCallback
); // Callback de Google OAuth

module.exports = router;
