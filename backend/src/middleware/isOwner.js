const pool = require('../config/db_sql');

const isOwner = async (req, res, next) => {
    const eventId = req.params.id;
    const userId = req.user.user_id;

    try {
        const query = `SELECT * FROM Eventos WHERE id = $1`;
        const result = await pool.query(query, [eventId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: "Evento no encontrado" });
        }

        const evento = result.rows[0];

        if (evento.creator_id !== userId) {
            return res.status(403).json({ msg: "No tienes permisos para modificar este evento" });
        }

        next();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = isOwner;
