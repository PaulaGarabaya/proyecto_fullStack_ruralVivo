const pool = require('../config/db_sql');

// [GET] /api/eventos - Listado público de eventos
const getEventos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Eventos ORDER BY fecha_inicio');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error en getEventos:', error);
    res.status(500).json({ message: 'Error al obtener los eventos' });
  }
};

// [GET] /api/eventos/:id - Detalle de un evento
const getEvento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query('SELECT * FROM Eventos WHERE evento_id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error en getEvento:', error);
    res.status(500).json({ message: 'Error al obtener el evento' });
  }
};

// [GET] /api/pueblos/:id/eventos - Eventos de un pueblo específico
const getEventosPorPueblo = async (req, res) => {
  try {
    const puebloId = parseInt(req.params.id);
    const result = await pool.query('SELECT * FROM Eventos WHERE pueblo_id = $1 ORDER BY fecha_inicio', [puebloId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error en getEventosPorPueblo:', error);
    res.status(500).json({ message: 'Error al obtener los eventos del pueblo' });
  }
};

// [POST] /api/eventos - Crear un nuevo evento
const createEvento = async (req, res) => {
  try {
    const { pueblo_id, titulo, tipo, descripcion, fecha_inicio, fecha_fin, url } = req.body;

    if (!pueblo_id || !titulo || !tipo) {
      return res.status(400).json({ message: 'Faltan datos obligatorios: pueblo_id, titulo o tipo' });
    }

    // Validar tipo
    const tiposValidos = ['fiesta', 'evento_cultural', 'otro'];
    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({ message: `Tipo inválido. Debe ser: ${tiposValidos.join(', ')}` });
    }

    const result = await pool.query(
      'INSERT INTO Eventos (pueblo_id, titulo, tipo, descripcion, fecha_inicio, fecha_fin, url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [pueblo_id, titulo, tipo, descripcion || null, fecha_inicio || null, fecha_fin || null, url || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error en createEvento:', error);
    res.status(500).json({ message: 'Error al crear el evento' });
  }
};

// [PUT] /api/eventos/:id - Editar un evento
const updateEvento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { pueblo_id, titulo, tipo, descripcion, fecha_inicio, fecha_fin, url } = req.body;

    const check = await pool.query('SELECT * FROM Eventos WHERE evento_id = $1', [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    if (tipo) {
      const tiposValidos = ['fiesta', 'evento_cultural', 'otro'];
      if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({ message: `Tipo inválido. Debe ser: ${tiposValidos.join(', ')}` });
      }
    }

    const result = await pool.query(
      `UPDATE Eventos 
       SET pueblo_id=$1, titulo=$2, tipo=$3, descripcion=$4, fecha_inicio=$5, fecha_fin=$6, url=$7 
       WHERE evento_id=$8 
       RETURNING *`,
      [pueblo_id || check.rows[0].pueblo_id,
       titulo || check.rows[0].titulo,
       tipo || check.rows[0].tipo,
       descripcion !== undefined ? descripcion : check.rows[0].descripcion,
       fecha_inicio || check.rows[0].fecha_inicio,
       fecha_fin || check.rows[0].fecha_fin,
       url || check.rows[0].url,
       id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error en updateEvento:', error);
    res.status(500).json({ message: 'Error al actualizar el evento' });
  }
};

// [DELETE] /api/eventos/:id - Eliminar evento
const deleteEvento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const check = await pool.query('SELECT * FROM Eventos WHERE evento_id = $1', [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
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
