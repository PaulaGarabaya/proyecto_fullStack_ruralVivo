const API_URL = 'http://localhost:3000/api';

// Obtener todos los pueblos con filtros opcionales
export const getPueblos = async (filtros = {}) => {
  const { search, provincia, ccaa } = filtros;
  
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (provincia) params.append('provincia', provincia);
  if (ccaa) params.append('ccaa', ccaa);

  const url = `${API_URL}/pueblos${params.toString() ? '?' + params.toString() : ''}`;
  
  const response = await fetch(url, {
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al obtener los pueblos');
  }

  return await response.json();
};

// Obtener un pueblo por ID
export const getPueblo = async (id) => {
  const response = await fetch(`${API_URL}/pueblos/${id}`, {
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al obtener el pueblo');
  }

  return await response.json();
};