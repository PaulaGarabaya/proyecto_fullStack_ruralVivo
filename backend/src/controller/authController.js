const usersModels = require('../models/userModels');
const { createToken } = require('../config/jwt');
const bcrypt = require('bcryptjs');

// =================== SIGNUP ===================
const signup = async (req, res) => {
    try {
        const { nombre, email, password, role } = req.body;

        // Validación básica
        if (!nombre || !email || !password) {
            return res.status(400).json({ msg: "Faltan datos obligatorios" });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar usuario en la base de datos
        const newUser = await usersModels.signup(nombre, email, hashedPassword, role);

        res.status(201).json({ msg: "Usuario registrado correctamente" });

    } catch (error) {
        // Manejo de error, como email duplicado
        res.status(400).json({ msg: error.message });
    }
};

// =================== LOGIN ===================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Faltan datos obligatorios" });
        }

        const user = await usersModels.login(email);
        if (user.length === 0) {
            return res.status(400).json({ msg: "Credenciales incorrectas" });
        }

        // Comparar contraseña hasheada
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({ msg: "Credenciales incorrectas" });
        }

        // Crear token JWT
        const token = createToken({ 
            user_id: user[0].user_id, 
            email: user[0].email, 
            role: user[0].role 
        });

        // Devolver token en cookie y header
        res.status(200)
            .set('Authorization', `Bearer ${token}`)
            .cookie('access_token', token, { httpOnly: true, secure: true }) // httpOnly + secure para producción
            .json({ role: user[0].role });

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// =================== LOGOUT ===================
const logout = async (req, res) => {
    try {
        res.status(200)
            .set('Authorization', "")
            .cookie('access_token', "", { httpOnly: true, secure: true })
            .send();
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// =================== GET ALL USERS ===================
const getAllUsers = async (req, res) => {
    try {
        const users = await usersModels.getAllUsers();

        // No devolver contraseñas
        const safeUsers = users.map(u => ({
            user_id: u.user_id,
            nombre: u.nombre,
            email: u.email,
            role: u.role
        }));

        res.status(200).json(safeUsers);

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// =================== EXPORT ===================
const users = {
    signup,
    login,
    logout,
    getAllUsers
};

module.exports = users;
