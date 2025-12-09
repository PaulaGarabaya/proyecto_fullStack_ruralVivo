const pool = require('../config/db_sql');

const isOwner = async (req, res, next) => {
    const eventoId = req.params.id; // 🔥 Usar evento_id
    const userId = req.user.user_id;

    try {
        // 🔥 Columna correcta: evento_id (no 'id')
        const query = `SELECT * FROM Eventos WHERE evento_id = $1`;
        const result = await pool.query(query, [eventoId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: "Evento no encontrado" });
        }

        const evento = result.rows[0];

        // 🔥 Columna correcta: user_id (no 'creator_id')
        if (evento.user_id !== userId) {
            return res.status(403).json({ msg: "No tienes permisos para modificar este evento" });
        }

        // Opcional: pasar el evento al siguiente middleware/controller
        req.evento = evento;
        next();
    } catch (error) {
        console.error('Error en isOwner:', error);
        res.status(500).json({ msg: "Error al verificar permisos" });
    }
};

module.exports = isOwner;