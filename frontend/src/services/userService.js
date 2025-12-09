// =================== CONFIGURACIÓN BASE ===================
const API_URL = 'http://localhost:3000/api';

// Helper para manejar errores de forma consistente
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ msg: 'Error desconocido' }));
    throw new Error(errorData.msg || 'Error en la petición');
  }
  return await response.json();
};

// =================== AUTENTICACIÓN ===================

// Registrar un nuevo usuario (público)
export const signupUser = async (nombre, email, password, role = 'user') => {
  const response = await fetch(`${API_URL}/singup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, email, password, role }),
    credentials: 'include', // Para recibir cookies
  });

  return handleResponse(response);
};

// Iniciar sesión (público)
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include', // Para recibir la cookie del token
  });

  return handleResponse(response);
};

// Cerrar sesión (público, pero envía cookie)
export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include', // Para enviar la cookie del token
  });

  return handleResponse(response);
};

// 🔥 NUEVO: Obtener usuario actual (protegido)
export const getMe = async () => {
  const response = await fetch(`${API_URL}/me`, {
    method: 'GET',
    credentials: 'include', // Para enviar la cookie del token
  });

  return handleResponse(response);
};

// =================== USUARIOS ===================

// Obtener todos los usuarios (público) - ⚠️ Esta ruta parece que no existe en tu backend
export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    credentials: 'include',
  });

  return handleResponse(response);
};

// =================== LOGIN CON GOOGLE ===================

// Redirigir a Google OAuth
export const loginWithGoogle = () => {
  window.location.href = `${API_URL}/auth/google`;
};