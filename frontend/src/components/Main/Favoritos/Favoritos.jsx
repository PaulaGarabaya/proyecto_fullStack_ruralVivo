import React, { useState, useEffect, useContext } from 'react';
import { getFavoritos } from '../../../services/favoritesService';
import { UserContext } from '../../../context/UserContext';
import EventosList from '../Eventos/EventosList';
import { RotatingLines } from 'react-loader-spinner';
import './Favoritos.css';

const Favoritos = () => {
  const { user } = useContext(UserContext);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getFavoritos();
        setFavoritos(data);
      } catch (error) {
        console.error("Error al obtener los favoritos:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, [user]);

  const handleEventoDeleted = () => {
    // Recargar favoritos si se eliminó un evento
    const fetchFavoritos = async () => {
      try {
        const data = await getFavoritos();
        setFavoritos(data);
      } catch (error) {
        console.error("Error al recargar favoritos:", error);
      }
    };
    fetchFavoritos();
  };

  if (!user) {
    return (
      <div className="favoritos-empty">
        <h2>❤️ Mis Favoritos</h2>
        <p>Debes iniciar sesión para ver tus eventos favoritos</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="favoritos-loading">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="#8C6A43"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="favoritos-error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="favoritos-container">
      <h1 className="favoritos-title">❤️ Mis Eventos Favoritos</h1>
      
      {favoritos.length === 0 ? (
        <div className="favoritos-empty">
          <p>No tienes eventos favoritos guardados</p>
          <p className="hint">Explora eventos y guárdalos haciendo clic en el corazón 🤍</p>
        </div>
      ) : (
        <>
          <p className="favoritos-count">
            Tienes {favoritos.length} evento{favoritos.length !== 1 ? 's' : ''} guardado{favoritos.length !== 1 ? 's' : ''}
          </p>
          <EventosList eventos={favoritos} onEventoDeleted={handleEventoDeleted} />
        </>
      )}
    </div>
  );
};

export default Favoritos;