const pool = require('../config/db_sql'); // Aquí va tu configuración de conexión a PostgreSQL

// =================== SIGNUP ===================
const signup = async (nombre, email, hashedPassword, role = 'user') => {
    try {
        const query = `
            INSERT INTO Usuarios (nombre, email, password, role)
            VALUES ($1, $2, $3, $4)
            RETURNING user_id, nombre, email, role
        `;
        const values = [nombre, email, hashedPassword, role];
        const result = await pool.query(query, values);
        return result.rows[0]; // Retorna el usuario creado
    } catch (error) {
        throw new Error(error.detail || error.message);
    }
};

// =================== LOGIN ===================
const login = async (email) => {
    try {
        const query = `
            SELECT user_id, nombre, email, password, role
            FROM Usuarios
            WHERE email = $1
        `;
        const values = [email];
        const result = await pool.query(query, values);
        return result.rows; // Retorna un array, vacío si no encuentra usuario
    } catch (error) {
        throw new Error(error.detail || error.message);
    }
};

// =================== GET ALL USERS ===================
const getAllUsers = async () => {
    try {
        const query = `
            SELECT user_id, nombre, email, role
            FROM Usuarios
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw new Error(error.detail || error.message);
    }
};

// =================== EXPORT ===================
const usersModels = {
    signup,
    login,
    getAllUsers
};

module.exports = usersModels;
