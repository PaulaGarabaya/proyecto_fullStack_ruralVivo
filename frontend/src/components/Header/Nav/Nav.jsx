import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Comprobar si hay usuario logado
  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setUser({ nombre: "Juan" }); // Reemplaza con fetch real si quieres
      }
    };
    checkUser();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsOpen(false);
  };

  return (
    <nav className="nav">
      {/* BOTÓN HAMBURGUESA SIEMPRE VISIBLE */}
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      {/* LINKS */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link>
        <Link to="/pueblos" onClick={() => setIsOpen(false)}>Pueblos</Link>
        <Link to="/eventos" onClick={() => setIsOpen(false)}>Eventos</Link>

        {user ? (
          <>
            <Link to="/favoritos" onClick={() => setIsOpen(false)}>Favoritos</Link>
            <Link to="/perfil" onClick={() => setIsOpen(false)}>Perfil</Link>
            <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsOpen(false)}>Iniciar sesión</Link>
            <Link to="/registro" onClick={() => setIsOpen(false)}>Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
