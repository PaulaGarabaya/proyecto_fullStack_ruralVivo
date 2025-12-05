
// import React, { useState } from 'react';
// import { signupUser } from '../../../services/userService';

// const Singup = () => {
//   // Estado para manejar los valores del formulario
//   const [formData, setFormData] = useState({
//     nombre: '',
//     email: '',
//     password: '',
//     role: 'user', // Valor predeterminado
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // Función para actualizar el estado del formulario
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Función para enviar el formulario
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validaciones simples
//     if (!formData.nombre || !formData.email || !formData.password) {
//       setError('Por favor, complete todos los campos.');
//       return;
//     }

//     try {
//       // Usamos el servicio signupUser para registrar al usuario
//       await signupUser(formData.nombre, formData.email, formData.password, formData.role);

//       // Si la creación del usuario es exitosa
//       setSuccess('¡Cuenta creada con éxito!');
//       setError(''); // Limpiar errores

//       // Limpiar el formulario después del registro exitoso
//       setFormData({
//         nombre: '',
//         email: '',
//         password: '',
//         role: 'user', // Resetear al valor predeterminado
//       });

//     } catch (error) {
//       // Manejo de error si algo sale mal
//       setError(error.message || 'Hubo un problema al crear la cuenta');
//       setSuccess('');
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Crear Cuenta</h2>

//       {error && <div className="error">{error}</div>}
//       {success && <div className="success">{success}</div>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="nombre">Nombre:</label>
//           <input
//             type="text"
//             id="nombre"
//             name="nombre"
//             value={formData.nombre}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

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

//         <button type="submit">Crear Cuenta</button>
//       </form>
//     </div>
//   );
// };

// export default Singup;


import React, { useState, useContext } from "react";
import { signupUser } from "../../../services/userService";
import { UserContext } from "../../../context/UserContext";

const Signup = () => {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ nombre: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.password) {
      setError("Complete todos los campos");
      return;
    }

    try {
      await signupUser(formData.nombre, formData.email, formData.password, formData.role);
      setSuccess("¡Cuenta creada con éxito!");
      setError("");
      setFormData({ nombre: "", email: "", password: "", role: "user" });

      // Obtener usuario y actualizar contexto
      const res = await fetch("http://localhost:3000/api/me", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setUser(data);

    } catch (err) {
      setError(err.message || "Error al crear la cuenta");
      setSuccess("");
    }
  };

  return (
    <div className="register-container">
      <h2>Crear Cuenta</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre" required />
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Correo" required />
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Contraseña" required />
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
};

export default Signup;
