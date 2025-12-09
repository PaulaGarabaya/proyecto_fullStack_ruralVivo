const pool = require('../config/db_sql');

// Helper para validar tipo
const validateTipo = (tipo) => {
  const tiposValidos = ['fiesta', 'evento_cultural', 'otro'];
  if (tipo && !tiposValidos.includes(tipo)) {
    return { 
      isValid: false, 
      message: `Tipo inválido. Debe ser: ${tiposValidos.join(', ')}` 
    };
  }
  return { isValid: true };
};

// =================== GET EVENTOS (con filtros) ===================
const getEventos = async (req, res) => {
  try {
    const { pueblo_id, provincia, ccaa, fecha_inicio, fecha_fin } = req.query;
    
    let query = `
      SELECT e.*, p.nombre AS pueblo_nombre, p.provincia AS pueblo_provincia, p.ccaa AS pueblo_ccaa
      FROM Eventos e
      LEFT JOIN Pueblos p ON e.pueblo_id = p.pueblo_id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (pueblo_id) {
      query += ` AND e.pueblo_id = $${paramIndex}`;
      params.push(pueblo_id);
      paramIndex++;
    }

    if (provincia) {
      query += ` AND p.provincia ILIKE $${paramIndex}`;
      params.push(`%${provincia}%`);
      paramIndex++;
    }

    if (ccaa) {
      query += ` AND p.ccaa ILIKE $${paramIndex}`;
      params.push(`%${ccaa}%`);
      paramIndex++;
    }

    if (fecha_inicio) {
      query += ` AND e.fecha_inicio >= $${paramIndex}`;
      params.push(fecha_inicio);
      paramIndex++;
    }

    if (fecha_fin) {
      query += ` AND e.fecha_fin <= $${paramIndex}`;
      params.push(fecha_fin);
      paramIndex++;
    }

    query += ` ORDER BY e.fecha_inicio`;

    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error en getEventos:', error);
    res.status(500).json({ message: 'Error al obtener los eventos' });
  }
};

// =================== GET EVENTO POR ID ===================
const getEvento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const result = await pool.query(
      `SELECT e.*, p.nombre AS pueblo_nombre, p.provincia AS pueblo_provincia, p.ccaa AS pueblo_ccaa
       FROM Eventos e
       LEFT JOIN Pueblos p ON e.pueblo_id = p.pueblo_id
       WHERE e.evento_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error en getEvento:', error);
    res.status(500).json({ message: 'Error al obtener el evento' });
  }
};

// =================== GET EVENTOS POR PUEBLO ===================
const getEventosPorPueblo = async (req, res) => {
  try {
    const puebloId = parseInt(req.params.id);
    
    if (isNaN(puebloId)) {
      return res.status(400).json({ message: 'ID de pueblo inválido' });
    }

    const result = await pool.query(
      `SELECT e.*, p.nombre AS pueblo_nombre, p.provincia AS pueblo_provincia
       FROM Eventos e
       LEFT JOIN Pueblos p ON e.pueblo_id = p.pueblo_id
       WHERE e.pueblo_id = $1 
       ORDER BY e.fecha_inicio`,
      [puebloId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error en getEventosPorPueblo:', error);
    res.status(500).json({ message: 'Error al obtener los eventos del pueblo' });
  }
};

// =================== CREATE EVENTO (REQUIERE AUTH) ===================
const createEvento = async (req, res) => {
  try {
    const { pueblo_id, titulo, tipo, descripcion, fecha_inicio, fecha_fin, url } = req.body;
    const user_id = req.user.user_id;

    if (!pueblo_id || !titulo || !tipo) {
      return res.status(400).json({ 
        message: 'Faltan datos obligatorios: pueblo_id, titulo y tipo' 
      });
    }

    const { isValid, message } = validateTipo(tipo);
    if (!isValid) {
      return res.status(400).json({ message });
    }

    const result = await pool.query(
      `INSERT INTO Eventos (pueblo_id, titulo, tipo, descripcion, fecha_inicio, fecha_fin, url, user_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [pueblo_id, titulo, tipo, descripcion || null, fecha_inicio || null, fecha_fin || null, url || null, user_id]
    );

    res.status(201).json({
      message: 'Evento creado correctamente',
      evento: result.rows[0]
    });
  } catch (error) {
    console.error('Error en createEvento:', error);
    res.status(500).json({ message: 'Error al crear el evento' });
  }
};

// =================== UPDATE EVENTO (REQUIERE AUTH + OWNERSHIP) ===================
const updateEvento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const { pueblo_id, titulo, tipo, descripcion, fecha_inicio, fecha_fin, url } = req.body;
    
    const evento = req.evento || (await pool.query('SELECT * FROM Eventos WHERE evento_id = $1', [id])).rows[0];

    if (!evento) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    if (tipo) {
      const { isValid, message } = validateTipo(tipo);
      if (!isValid) {
        return res.status(400).json({ message });
      }
    }

    const result = await pool.query(
      `UPDATE Eventos 
       SET pueblo_id=$1, titulo=$2, tipo=$3, descripcion=$4, fecha_inicio=$5, fecha_fin=$6, url=$7 
       WHERE evento_id=$8 
       RETURNING *`,
      [
        pueblo_id !== undefined ? pueblo_id : evento.pueblo_id,
        titulo !== undefined ? titulo : evento.titulo,
        tipo !== undefined ? tipo : evento.tipo,
        descripcion !== undefined ? descripcion : evento.descripcion,
        fecha_inicio !== undefined ? fecha_inicio : evento.fecha_inicio,
        fecha_fin !== undefined ? fecha_fin : evento.fecha_fin,
        url !== undefined ? url : evento.url,
        id
      ]
    );

    res.status(200).json({
      message: 'Evento actualizado correctamente',
      evento: result.rows[0]
    });
  } catch (error) {
    console.error('Error en updateEvento:', error);
    res.status(500).json({ message: 'Error al actualizar el evento' });
  }
};

// =================== DELETE EVENTO (REQUIERE AUTH + OWNERSHIP) ===================
const deleteEvento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    await pool.query('DELETE FROM Eventos WHERE evento_id = $1', [id]);
    
    res.status(200).json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    console.error('Error en deleteEvento:', error);
    res.status(500).json({ message: 'Error al eliminar el evento' });
  }
};

module.exports = {
  getEventos,
  getEvento,
  getEventosPorPueblo,
  createEvento,
  updateEvento,
  deleteEvento
};