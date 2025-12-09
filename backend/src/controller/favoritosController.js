const pool = require('../config/db_sql');

// =================== GET FAVORITOS ===================
const getFavoritos = async (req, res) => {
  try {
    const userId = req.user.user_id; 

    const result = await pool.query(
      `SELECT 
        e.*,
        p.nombre AS pueblo_nombre,
        p.provincia AS pueblo_provincia,
        p.ccaa AS pueblo_ccaa,
        f.fecha_guardado
       FROM FavoritosEventos f
       INNER JOIN Eventos e ON f.evento_id = e.evento_id
       LEFT JOIN Pueblos p ON e.pueblo_id = p.pueblo_id
       WHERE f.user_id = $1
       ORDER BY f.fecha_guardado DESC`,
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    res.status(500).json({ message: "Error al obtener los favoritos" });
  }
};

// =================== ADD FAVORITO ===================
const addFavorito = async (req, res) => {
  try {
    const userId = req.user.user_id; 
    const { eventoId } = req.body;

    if (!eventoId) {
      return res.status(400).json({ message: "Se requiere eventoId" });
    }

    // Verificar que el evento existe
    const eventoExists = await pool.query(
      'SELECT evento_id FROM Eventos WHERE evento_id = $1',
      [eventoId]
    );

    if (eventoExists.rows.length === 0) {
      return res.status(404).json({ message: "El evento no existe" });
    }

    const result = await pool.query(
      `INSERT INTO FavoritosEventos (user_id, evento_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, evento_id) DO NOTHING
       RETURNING *`,
      [userId, eventoId]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({ 
        message: "El evento ya estaba en favoritos",
        alreadyExists: true 
      });
    }

    res.status(201).json({ 
      message: "Evento añadido a favoritos", 
      favorito: result.rows[0] 
    });
  } catch (error) {
    console.error("Error al añadir favorito:", error);
    res.status(500).json({ message: "Error al añadir favorito" });
  }
};

// =================== DELETE FAVORITO ===================
const deleteFavorito = async (req, res) => {
  try {
    const userId = req.user.user_id; 
    const { evento_id } = req.params;

    const result = await pool.query(
      `DELETE FROM FavoritosEventos
       WHERE user_id = $1 AND evento_id = $2
       RETURNING *`,
      [userId, evento_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No estaba en favoritos" });
    }

    res.status(200).json({ message: "Favorito eliminado" });
  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    res.status(500).json({ message: "Error al eliminar favorito" });
  }
};

// =================== CHECK SI ES FAVORITO ===================
const isFavorito = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { evento_id } = req.params;

    const result = await pool.query(
      `SELECT * FROM FavoritosEventos
       WHERE user_id = $1 AND evento_id = $2`,
      [userId, evento_id]
    );

    res.status(200).json({ 
      isFavorite: result.rows.length > 0 
    });
  } catch (error) {
    console.error("Error al verificar favorito:", error);
    res.status(500).json({ message: "Error al verificar favorito" });
  }
};

module.exports = { 
  getFavoritos,
  addFavorito,
  deleteFavorito,
  isFavorito
};