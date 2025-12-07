import React, { useState, useEffect } from 'react';
import './Eventos.css';
import { getEventos } from "../../../services/eventosService";
import { getPueblos } from "../../../services/pueblosService";
import EventosList from './EventosList';
import Search from './Search';
import { RotatingLines } from 'react-loader-spinner';

const EventosContainer = () => {
  const [eventos, setEventos] = useState([]);
  const [pueblos, setPueblos] = useState([]);
  const [filtros, setFiltros] = useState({
    puebloId: null,
    provincia: null,
    ccaa: null,
    fechaInicio: null,
    fechaFin: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar pueblos al montar el componente
  useEffect(() => {
    const fetchPueblos = async () => {
      try {
        const pueblosData = await getPueblos();
        setPueblos(pueblosData);
      } catch (error) {
        console.error('Error al cargar pueblos:', error);
        setError('Error al cargar los pueblos');
      }
    };

    fetchPueblos();
  }, []);

  // Cargar eventos cuando cambien los filtros
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setLoading(true);
        setError(null);
        const eventosData = await getEventos(filtros);
        setEventos(eventosData);
      } catch (error) {
        console.error('Error al cargar eventos:', error);
        setError('Error al cargar los eventos');
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, [filtros]);

  // Actualizar filtros
  const handleFiltrosChange = (nuevosFiltros) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
  };

  // Función para recargar eventos (útil después de eliminar)
  const reloadEventos = async () => {
    try {
      setLoading(true);
      const eventosData = await getEventos(filtros);
      setEventos(eventosData);
    } catch (error) {
      console.error('Error al recargar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="eventos-container">
      <h1 className="eventos-title">Eventos</h1>
      
      <Search 
        pueblos={pueblos} 
        onFiltrosChange={handleFiltrosChange}
        filtros={filtros}
      />

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="eventos-loading">
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
      ) : eventos.length === 0 ? (
        <p className="no-eventos">No hay eventos disponibles</p>
      ) : (
        <EventosList eventos={eventos} onEventoDeleted={reloadEventos} />
      )}
    </div>
  );
};

export default EventosContainer;