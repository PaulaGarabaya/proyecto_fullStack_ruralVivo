import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { UserContext } from "../../../context/UserContext";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="nav">
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link>
        <Link to="/pueblos" onClick={() => setIsOpen(false)}>Pueblos</Link>
        <Link to="/eventos" onClick={() => setIsOpen(false)}>Eventos</Link>

        {user ? (
          <>
            <Link to="/crear-eventos" onClick={() => setIsOpen(false)}>Crear eventos</Link>
            <Link to="/favoritos" onClick={() => setIsOpen(false)}>Favoritos</Link>
            {/* <Link to="/profile" onClick={() => setIsOpen(false)}>Perfil</Link> */}
            <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsOpen(false)}>Iniciar sesión</Link>
            <Link to="/singup" onClick={() => setIsOpen(false)}>Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
