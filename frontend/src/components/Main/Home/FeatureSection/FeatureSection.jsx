import React from "react";
import './FeatureSection.css'

const FeatureSection = () => {
  return <section className="features-section">
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
      </section>;
};

export default FeatureSection;
