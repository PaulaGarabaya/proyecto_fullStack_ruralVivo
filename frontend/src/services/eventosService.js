const API_URL = 'http://localhost:3000/api';

// =================== GET EVENTOS (con filtros opcionales) ===================
export const getEventos = async (filtros = {}) => {
  const { puebloId, provincia, ccaa, fechaInicio, fechaFin } = filtros;
  
  const params = new URLSearchParams();
  if (puebloId) params.append('pueblo_id', puebloId);
  if (provincia) params.append('provincia', provincia);
  if (ccaa) params.append('ccaa', ccaa);
  if (fechaInicio) params.append('fecha_inicio', fechaInicio);
  if (fechaFin) params.append('fecha_fin', fechaFin);

  const url = `${API_URL}/eventos${params.toString() ? '?' + params.toString() : ''}`;
  
  const response = await fetch(url, {
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al obtener los eventos');
  }

  return await response.json();
};

// =================== GET EVENTO POR ID ===================
export const getEvento = async (id) => {
  const response = await fetch(`${API_URL}/eventos/${id}`, {
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al obtener el evento');
  }

  return await response.json();
};

// =================== GET EVENTOS POR PUEBLO ===================
export const getEventosByPueblo = async (puebloId) => {
  const response = await fetch(`${API_URL}/pueblos/${puebloId}/eventos`, {
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al obtener los eventos del pueblo');
  }

  return await response.json();
};

// =================== CREATE EVENTO (requiere auth) ===================
export const createEvento = async (eventoData) => {
  const response = await fetch(`${API_URL}/eventos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include', // 🔥 Para enviar cookie con token
    body: JSON.stringify(eventoData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al crear el evento');
  }

  return await response.json();
};

// =================== UPDATE EVENTO (requiere auth + ownership) ===================
export const updateEvento = async (id, eventoData) => {
  const response = await fetch(`${API_URL}/eventos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(eventoData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al actualizar el evento');
  }

  return await response.json();
};

// =================== DELETE EVENTO (requiere auth + ownership) ===================
export const deleteEvento = async (id) => {
  // 🔥 DELETE no debe llevar body
  const response = await fetch(`${API_URL}/eventos/${id}`, {
    method: 'DELETE',
    credentials: 'include' // Solo cookie, sin body
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al eliminar el evento');
  }

  return await response.json();
};