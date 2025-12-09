import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../context/UserContext';
import './CTASection.css';
const CTASection = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleNavigate = (path) => {
    navigate(path);
  };
  return <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">¿Tu pueblo tiene eventos?</h2>
          <p className="cta-text">
            Ayuda a tu comunidad compartiendo información sobre fiestas y eventos locales
          </p>
          {!user ? (
            <button 
              className="btn-cta"
              onClick={() => handleNavigate('/singup')}
            >
              Únete ahora
            </button>
          ) : (
            <button 
              className="btn-cta"
              onClick={() => handleNavigate('/crear-eventos')}
            >
              Añadir Evento
            </button>
          )}
        </div>
      </section>;
};

export default CTASection;
