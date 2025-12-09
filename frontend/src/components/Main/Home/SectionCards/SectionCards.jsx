import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../context/UserContext';
import './SectionCards.css';
const SectionCards = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleNavigate = (path) => {
    navigate(path);
  };
  return <div>{/* Cards Section */}
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
      </section></div>;
};

export default SectionCards;
