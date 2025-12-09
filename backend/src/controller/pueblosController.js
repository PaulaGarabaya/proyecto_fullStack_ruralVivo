const pool = require('../config/db_sql');

// [GET] /api/pueblos - Listar todos los pueblos (con búsqueda opcional)
const getPueblos = async (req, res) => {
  try {
    const { search, provincia, ccaa } = req.query;
    
    let query = 'SELECT * FROM Pueblos WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    // Búsqueda por nombre (búsqueda parcial insensible a mayúsculas)
    if (search && search.trim() !== '') {
      query += ` AND nombre ILIKE $${paramIndex}`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    // Filtro por provincia
    if (provincia && provincia.trim() !== '') {
      query += ` AND provincia ILIKE $${paramIndex}`;
      params.push(`%${provincia}%`);
      paramIndex++;
    }

    // Filtro por comunidad autónoma
    if (ccaa && ccaa.trim() !== '') {
      query += ` AND ccaa ILIKE $${paramIndex}`;
      params.push(`%${ccaa}%`);
      paramIndex++;
    }

    query += ' ORDER BY nombre ASC';

    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error en getPueblos:', error);
    res.status(500).json({ message: 'Error al obtener los pueblos' });
  }
};

// [GET] /api/pueblos/:id - Detalle de un pueblo
const getPueblo = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await pool.query('SELECT * FROM Pueblos WHERE pueblo_id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pueblo no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error en getPueblo:', error);
    res.status(500).json({ message: 'Error al obtener el pueblo' });
  }
};

// [POST] /api/pueblos - Crear un pueblo (solo admin)
const createPueblo = async (req, res) => {
  try {
    const { nombre, provincia, ccaa, img, latitud, longitud } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    const result = await pool.query(
      'INSERT INTO Pueblos (nombre, provincia, ccaa, img, latitud, longitud) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, provincia || null, ccaa || null, img || null, latitud || null, longitud || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error en createPueblo:', error);
    res.status(500).json({ message: 'Error al crear el pueblo' });
  }
};

// [PUT] /api/pueblos/:id - Actualizar un pueblo (solo admin)
const updatePueblo = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, provincia, ccaa, img, latitud, longitud } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await pool.query(
      'UPDATE Pueblos SET nombre = $1, provincia = $2, ccaa = $3, img = $4, latitud = $5, longitud = $6 WHERE pueblo_id = $7 RETURNING *',
      [nombre, provincia, ccaa, img, latitud, longitud, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pueblo no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error en updatePueblo:', error);
    res.status(500).json({ message: 'Error al actualizar el pueblo' });
  }
};

// [DELETE] /api/pueblos/:id - Eliminar un pueblo (solo admin)
const deletePueblo = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await pool.query(
      'DELETE FROM Pueblos WHERE pueblo_id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pueblo no encontrado' });
    }

    res.status(200).json({ message: 'Pueblo eliminado correctamente' });
  } catch (error) {
    console.error('Error en deletePueblo:', error);
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