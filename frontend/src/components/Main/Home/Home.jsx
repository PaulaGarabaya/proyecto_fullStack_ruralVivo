import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import './Home.css';
import SectionCards from './SectionCards';
import FeatureSection from './FeatureSection';
import CTASection from './CTASection';

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
      </section>

      {/* Cards Section */}
     <SectionCards></SectionCards>

      {/* Features Section */}
      <FeatureSection></FeatureSection>
      {/* CTA Section */}
      <CTASection></CTASection>
    </div>
  );
};

export default Home;