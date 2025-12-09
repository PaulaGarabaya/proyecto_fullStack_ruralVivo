const usersModels = require('../models/userModels');
const { createToken } = require('../config/jwt');
const bcrypt = require('bcryptjs');

// =================== SIGNUP ===================
// const signup = async (req, res) => {
//     try {
//         const { nombre, email, password, role } = req.body;

//         // Validación básica
//         if (!nombre || !email || !password) {
//             return res.status(400).json({ msg: "Faltan datos obligatorios" });
//         }

//         // Hash de la contraseña
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Guardar usuario en la base de datos
//         const newUser = await usersModels.signup(nombre, email, hashedPassword, role);

//         res.status(201).json({ 
//             msg: "Usuario registrado correctamente",
//             user: {
//                 nombre: newUser.nombre,
//                 email: newUser.email
//             }
//         });

//     } catch (error) {
//         console.error('Error en signup:', error);
//         res.status(400).json({ msg: error.message });
//     }
// };
// =================== SIGNUP (con auto-login) ===================
const signup = async (req, res) => {
    try {
        const { nombre, email, password, role } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ msg: "Faltan datos obligatorios" });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar usuario en la base de datos
        const newUser = await usersModels.signup(nombre, email, hashedPassword, role);

        // 🔥 CREAR TOKEN AUTOMÁTICAMENTE tras registro
        const token = createToken({ 
            user_id: newUser.user_id, 
            email: newUser.email, 
            role: newUser.role || 'user'
        });

        // 🔥 DEVOLVER TOKEN EN COOKIE (auto-login)
        res.status(201)
            .cookie('token', token, { 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 3600000 // 1 hora
            })
            .json({ 
                msg: "Usuario registrado correctamente",
                user: {
                    user_id: newUser.user_id,
                    nombre: newUser.nombre,
                    email: newUser.email,
                    role: newUser.role || 'user'
                }
            });

    } catch (error) {
        console.error('Error en signup:', error);
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

        // 🔥 COOKIE CON NOMBRE 'token' (consistente con middleware)
        res.status(200)
            .cookie('token', token, { 
                httpOnly: true,  // 🔒 Más seguro
                secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
                sameSite: 'lax', // Protección CSRF
                maxAge: 3600000 // 1 hora
            })
            .json({ 
                msg: "Login exitoso",
                user: {
                    user_id: user[0].user_id,
                    email: user[0].email,
                    role: user[0].role
                }
            });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(400).json({ msg: error.message });
    }
};

// =================== LOGOUT ===================
const logout = async (req, res) => {
    try {
        // 🔥 Limpiar cookie 'token'
        res.status(200)
            .clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            })
            .json({ msg: "Logout exitoso" });
    } catch (error) {
        console.error('Error en logout:', error);
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
module.exports = {
    signup,
    login,
    logout,
    getAllUsers
};