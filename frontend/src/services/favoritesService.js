const API_URL = 'http://localhost:3000/api';

// Obtener todos los favoritos del usuario logueado
export const getFavoritos = async () => {
  const response = await fetch(`${API_URL}/favoritos`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al obtener los favoritos');
  }

  return await response.json();
};

// Añadir un evento a favoritos
export const addFavorito = async (eventoId) => {
  const response = await fetch(`${API_URL}/favoritos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eventoId }),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al añadir el evento a favoritos');
  }

  return await response.json();
};

// Eliminar un evento de favoritos
export const deleteFavorito = async (eventoId) => {
  const response = await fetch(`${API_URL}/favoritos/${eventoId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al eliminar el evento de favoritos');
  }

  return await response.json();
};

// Verificar si un evento es favorito
export const checkFavorito = async (eventoId) => {
  const response = await fetch(`${API_URL}/favoritos/${eventoId}/check`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al verificar favorito');
  }

  return await response.json();
};