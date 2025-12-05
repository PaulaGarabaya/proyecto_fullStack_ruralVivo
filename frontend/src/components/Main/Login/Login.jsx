
// import React, { useState } from 'react';
// import { loginUser } from '../../../services/userService'; 

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       setError('Por favor, complete todos los campos.');
//       return;
//     }

//     try {
//       // Llamamos al servicio directamente sin asignar la respuesta a una variable
//       await loginUser(formData.email, formData.password);

//       setSuccess('¡Bienvenido de nuevo!');
//       setError('');

//       setFormData({
//         email: '',
//         password: '',
//       });

//     } catch (error) {
//       setError(error.message || 'Hubo un problema al iniciar sesión');
//       setSuccess('');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Iniciar Sesión</h2>

//       {error && <div className="error">{error}</div>}
//       {success && <div className="success">{success}</div>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Correo Electrónico:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="password">Contraseña:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <button type="submit">Iniciar Sesión</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from "react";
import { loginUser } from "../../../services/userService";
import { UserContext } from "../../../context/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Complete todos los campos");
      return;
    }

    try {
      await loginUser(formData.email, formData.password);
      setSuccess("¡Bienvenido de nuevo!");
      setError("");
      setFormData({ email: "", password: "" });

      // Actualizamos el contexto
      const res = await fetch("http://localhost:3000/api/me", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setUser(data);

    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
      setSuccess("");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Correo" required />
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
