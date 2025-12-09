import React, { useState, useContext } from "react";
import { loginUser } from "../../../services/userService";
import { UserContext } from "../../../context/UserContext";
import "./Login.css";


const Login = () => {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError("Complete todos los campos");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Login
      await loginUser(formData.email, formData.password);

      // 2️⃣ Obtener datos del usuario
      const res = await fetch("http://localhost:3000/api/me", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Error al obtener datos del usuario");
      }

      const data = await res.json();
      setUser(data);

      setSuccess("¡Bienvenido de nuevo!");
      setError("");
      setFormData({ email: "", password: "" });

    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
      setSuccess("");
      setUser(null); // Limpiar usuario en caso de error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleInputChange} 
          placeholder="Correo" 
          required 
          disabled={loading}
        />
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleInputChange} 
          placeholder="Contraseña" 
          required 
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
};

export default Login;