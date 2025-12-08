import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Descubre los Eventos de tu Pueblo
          </h1>
          <p className="hero-subtitle">
            Explora festividades, eventos culturales y celebraciones en pueblos de toda España
          </p>
          
          {!user ? (
            <div className="hero-buttons">
              <button 
                className="btn-primary"
                onClick={() => handleNavigate('/singup')}
              >
                Crear Cuenta
              </button>
              <button 
                className="btn-secondary"
                onClick={() => handleNavigate('/login')}
              >
                Iniciar Sesión
              </button>
            </div>
          ) : (
            <div className="hero-welcome">
              <p className="welcome-text">¡Bienvenido/a, {user.email}! 👋</p>
              <button 
                className="btn-primary"
                onClick={() => handleNavigate('/crear-eventos')}
              >
                ➕ Crear Nuevo Evento
              </button>
            </div>
          )}
        </div>

        <div className="hero-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="cards-section">
        <h2 className="section-title">¿Qué quieres explorar?</h2>
        
        <div className="cards-grid">
          {/* Card Pueblos */}
          <div 
            className="feature-card pueblos-card"
            onClick={() => handleNavigate('/pueblos')}
          >
            <div className="card-icon">🏘️</div>
            <h3 className="card-title">Pueblos</h3>
            <p className="card-description">
              Descubre pueblos con encanto y su rica cultura tradicional
            </p>
            <div className="card-stats">
              <span className="stat-item">📍 Toda España</span>
              <span className="stat-item">✨ Miles de pueblos</span>
            </div>
            <button className="card-button">
              Explorar Pueblos →
            </button>
          </div>

          {/* Card Eventos */}
          <div 
            className="feature-card eventos-card"
            onClick={() => handleNavigate('/eventos')}
          >
            <div className="card-icon">🎭</div>
            <h3 className="card-title">Eventos</h3>
            <p className="card-description">
              Encuentra fiestas, ferias y eventos culturales cerca de ti
            </p>
            <div className="card-stats">
              <span className="stat-item">🎉 Fiestas</span>
              <span className="stat-item">🎨 Cultura</span>
            </div>
            <button className="card-button">
              Ver Eventos →
            </button>
          </div>

          {/* Card Favoritos (solo si está logueado) */}
          {user && (
            <div 
              className="feature-card favoritos-card"
              onClick={() => handleNavigate('/favoritos')}
            >
              <div className="card-icon">❤️</div>
              <h3 className="card-title">Mis Favoritos</h3>
              <p className="card-description">
                Accede rápidamente a los eventos que has guardado
              </p>
              <div className="card-stats">
                <span className="stat-item">💾 Guardados</span>
                <span className="stat-item">⚡ Acceso rápido</span>
              </div>
              <button className="card-button">
                Ver Favoritos →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">¿Por qué usar nuestra plataforma?</h2>
        
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🔍</div>
            <h4>Fácil de buscar</h4>
            <p>Encuentra eventos por pueblo, provincia o fecha</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">📅</div>
            <h4>Siempre actualizado</h4>
            <p>Información actualizada por la comunidad</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">❤️</div>
            <h4>Guarda favoritos</h4>
            <p>No pierdas de vista los eventos que te interesan</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">✏️</div>
            <h4>Contribuye</h4>
            <p>Añade y edita eventos de tu pueblo</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">¿Tu pueblo tiene eventos?</h2>
          <p className="cta-text">
            Ayuda a tu comunidad compartiendo información sobre fiestas y eventos locales
          </p>
          {!user ? (
            <button 
              className="btn-cta"
              onClick={() => handleNavigate('/signup')}
            >
              Únete ahora
            </button>
          ) : (
            <button 
              className="btn-cta"
              onClick={() => handleNavigate('/eventos/crear')}
            >
              Añadir Evento
            </button>
          )}
        </div>
      </section>

      {/* Footer Info */}
      <section className="info-section">
        <div className="info-grid">
          <div className="info-card">
            <h3>🗺️ Cobertura Nacional</h3>
            <p>Pueblos de todas las provincias de España</p>
          </div>
          <div className="info-card">
            <h3>🎊 Todo tipo de eventos</h3>
            <p>Fiestas patronales, ferias, eventos culturales y más</p>
          </div>
          <div className="info-card">
            <h3>👥 Comunidad activa</h3>
            <p>Usuarios compartiendo información local</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;