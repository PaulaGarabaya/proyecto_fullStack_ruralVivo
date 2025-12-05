// Obtener todos los usuarios (público)
export const getAllUsers = async () => {
  const response = await fetch('http://localhost:3000/api/users');

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || 'Error al obtener los usuarios');
  }

  return await response.json();
};

// Registrar un nuevo usuario (público)
// export const signupUser = async (nombre, email, password, role) => {
//   const response = await fetch('http://localhost:3000/api/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ nombre, email, password, role }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.msg || 'Error al registrar el usuario');
//   }

//   return await response.json();
// };
//services.js

export const signupUser = async (nombre, email, password, role) => {
  const response = await fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, email, password, role }),
    credentials: 'include', // Asegúrate de enviar las cookies
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || 'Error al registrar el usuario');
  }

  return await response.json();
};


// // Iniciar sesión (login) de un usuario (público)
// export const loginUser = async (email, password) => {
//   const response = await fetch('http://localhost:3000/api/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.msg || 'Error al iniciar sesión');
//   }

//   return await response.json();
// };
// services.js

export const loginUser = async (email, password) => {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include', // Asegura que las cookies se envíen
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || 'Error al iniciar sesión');
  }

  return await response.json();
};

// Cerrar sesión (logout) de un usuario (público)
export const logoutUser = async () => {
  const response = await fetch('http://localhost:3000/api/logout', {
    method: 'POST',
    credentials: 'include',  // Importante para enviar cookies
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || 'Error al cerrar sesión');
  }

  return await response.json();
};
