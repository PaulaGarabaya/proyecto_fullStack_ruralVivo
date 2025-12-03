// controllers/pueblosController.js
const pool = require('../config/db_sql'); // tu conexión a PostgreSQL

// [GET] /api/pueblos - Listar todos los pueblos
const getPueblos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Pueblos ORDER BY pueblo_id');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los pueblos' });
  }
};

// [GET] /api/pueblos/:id - Detalle de un pueblo
const getPueblo = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query('SELECT * FROM Pueblos WHERE pueblo_id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pueblo no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el pueblo' });
  }
};

// [POST] /api/pueblos - Crear un pueblo (solo admin)
const createPueblo = async (req, res) => {
  try {
    const { nombre, provincia, CCAA } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    const result = await pool.query(
      'INSERT INTO Pueblos (nombre, provincia, CCAA) VALUES ($1, $2, $3) RETURNING *',
      [nombre, provincia || null, CCAA || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el pueblo' });
  }
};

// [PUT] /api/pueblos/:id - Actualizar un pueblo (solo admin)
const updatePueblo = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, provincia, CCAA } = req.body;

    const result = await pool.query(
      'UPDATE Pueblos SET nombre = $1, provincia = $2, CCAA = $3 WHERE pueblo_id = $4 RETURNING *',
      [nombre, provincia, CCAA, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pueblo no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el pueblo' });
  }
};

// [DELETE] /api/pueblos/:id - Eliminar un pueblo (solo admin)
const deletePueblo = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await pool.query(
      'DELETE FROM Pueblos WHERE pueblo_id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pueblo no encontrado' });
    }

    res.status(200).json({ message: 'Pueblo eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el pueblo' });
  }
};

module.exports = {
  getPueblos,
  getPueblo,
  createPueblo,
  updatePueblo,
  deletePueblo
};
