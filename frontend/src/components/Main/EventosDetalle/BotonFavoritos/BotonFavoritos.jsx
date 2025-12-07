import React, { useState, useEffect, useContext } from 'react';
import { addFavorito, deleteFavorito, checkFavorito } from '../../../../services/favoritesService';
import { UserContext } from '../../../../context/UserContext';
import './BotonFavoritos.css';

const BotonFavoritos = ({ eventoId, size = 'normal' }) => {
  const { user } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const result = await checkFavorito(eventoId);
        setIsFavorite(result.isFavorite);
      } catch (error) {
        console.error('Error al verificar favorito:', error);
      } finally {
        setLoading(false);
      }
    };

    checkIfFavorite();
  }, [eventoId, user]);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert('Debes iniciar sesión para guardar favoritos');
      return;
    }

    try {
      setLoading(true);

      if (isFavorite) {
        await deleteFavorito(eventoId);
        setIsFavorite(false);
      } else {
        await addFavorito(eventoId);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error al actualizar favorito:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <button
      className={`btn-favorito ${isFavorite ? 'is-favorite' : ''} ${size === 'small' ? 'btn-favorito-small' : ''}`}
      onClick={handleToggleFavorite}
      disabled={loading}
      title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    >
      {loading ? '⏳' : isFavorite ? '❤️' : '🤍'}
    </button>
  );
};

export default BotonFavoritos;