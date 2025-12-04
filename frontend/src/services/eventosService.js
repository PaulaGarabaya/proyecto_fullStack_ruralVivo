// Función para obtener todos los eventos
// export const getEventos = async () => {
//   const response = await fetch('http://localhost:3000/api/eventos');

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Error al obtener los eventos');
//   }

//   return await response.json();
// };

// // Obtener eventos (opcionalmente filtrados por pueblo)
export const getEventos = async (puebloId = null) => {
  let url = 'http://localhost:3000/api/eventos';
  if (puebloId) {
    url = `http://localhost:3000/api/eventos?pueblo_id=${puebloId}`; // Filtro por pueblo
  }

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al obtener los eventos');
  }

  return await response.json();
};

// Función para obtener un evento por su ID
export const getEvento = async (id) => {
  const response = await fetch(`http://localhost:3000/api/eventos/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al obtener el evento');
  }

  return await response.json();
};

// Función para obtener los eventos de un pueblo específico (opcional)
export const getEventosByPueblo = async (puebloId) => {
  const response = await fetch(`http://localhost:3000/api/eventos?pueblo_id=${puebloId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al obtener los eventos del pueblo');
  }

  return await response.json();
};
