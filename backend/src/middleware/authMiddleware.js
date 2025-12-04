const { verifyToken } = require('../config/jwt');

const authMiddleware = (req, res, next) => {
    // Tomar token de cookie o de cabecera
    const token = req.cookies?.access_token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: "No autorizado, falta token" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ msg: "Token inválido o expirado" });
    }

    req.user = decoded; // { email, role }
    next();
};

module.exports = authMiddleware;
