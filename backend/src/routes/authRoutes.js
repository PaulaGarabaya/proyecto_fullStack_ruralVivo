const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const passport = require('passport');
const authMiddleware = require('../middleware/authMiddleware');

// ============= RUTAS PÚBLICAS =============
//[POST] /api/signup
router.post('/signup', authController.signup);

//[POST] /api/login
router.post('/login', authController.login);

//[POST] /api/logout
router.post('/logout', authController.logout);

//[GET] /api/auth/google
router.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
    prompt: 'select_account'
}));

//[GET] /api/google/callback
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        const token = req.user.token;
        
        // 🔥 IMPORTANTE: Usa 'token' como nombre de cookie (consistente con middleware)
        res.cookie('token', token, { 
            httpOnly: true,  // 🔒 Más seguro (JavaScript no puede acceder)
            secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
            sameSite: 'lax', // Protección CSRF
            maxAge: 3600000 // 1 hora (igual que el JWT)
        });
        
        res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
    }
);

// ============= RUTAS PROTEGIDAS =============
//[GET] /api/me - Obtener usuario actual
router.get('/me', authMiddleware, (req, res) => {
    const user = req.user;
    res.json({ 
        user_id: user.user_id,
        email: user.email, 
        role: user.role 
    });
});

module.exports = router;