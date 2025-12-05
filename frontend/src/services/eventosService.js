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
// Crear un nuevo evento
export const createEvento = async (eventoData) => {
  const response = await fetch('http://localhost:3000/api/eventos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify(eventoData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al crear el evento');
  }

  return await response.json();
};

// Editar un evento existente
export const updateEvento = async (id, eventoData) => {
  const response = await fetch(`http://localhost:3000/api/eventos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify(eventoData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al actualizar el evento');
  }

  return await response.json();
};

// Eliminar un evento
export const deleteEvento = async (id, eventoData) => {
  const response = await fetch(`http://localhost:3000/api/eventos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify(eventoData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al eliminar el evento');
  }

  return await response.json();
};