const jwt = require('jsonwebtoken');

const SECRET_KEY = 'tu_clave_secreta_aqui'; // Cambia esto por algo seguro en producción

// Crear token
const createToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Expira en 1 hora
};

// Verificar token (opcional, para proteger rutas)
const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};

module.exports = { createToken, verifyToken };
