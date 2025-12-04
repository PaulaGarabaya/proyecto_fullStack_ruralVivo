// Obtener todos los pueblos (público)
export const getPueblos = async () => {
  const response = await fetch('http://localhost:3000/api/pueblos');

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al obtener los pueblos');
  }

  return await response.json();
};

// Obtener un pueblo por ID (público)
export const getPueblo = async (id) => {
  const response = await fetch(`http://localhost:3000/api/pueblos/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al obtener el pueblo');
  }

  return await response.json();
};