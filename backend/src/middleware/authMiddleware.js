const { verifyToken } = require('../config/jwt');

const authMiddleware = (req, res, next) => {
    // 🔥 Buscar cookie con nombre 'token'
    const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        console.log('❌ Token no proporcionado');
        return res.status(401).json({ msg: "No autorizado, falta token" });
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
        console.log('❌ Token inválido o expirado');
        return res.status(401).json({ msg: "Token inválido o expirado" });
    }

    console.log('✅ Usuario autenticado:', decoded.email);
    
    // Si el token es válido, agregar el usuario al objeto `req`
    req.user = decoded;
    next();
};

module.exports = authMiddleware;