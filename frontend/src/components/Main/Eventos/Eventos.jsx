// import React, { useEffect, useState } from "react";
// import Search from "./Search";
// import EventosList from "./EventosList"; 
// import { getEventos, getEventosByPueblo } from "../../../services/eventosService"; // Agregado getEventosByPueblo

// const EventosContainer = () => {
//   const [allEventos, setAllEventos] = useState([]); // Todos los eventos desde la API
//   const [eventosList, setEventosList] = useState([]); // Lista de eventos
//   const [loading, setLoading] = useState(true);

//   // Cargar eventos iniciales
//   useEffect(() => {
//     const fetchInitial = async () => {
//       try {
//         setLoading(true);
//         const data = await getEventos(); // Llamada al servicio de eventos
//         setEventosList(data);
//         setAllEventos(data); // Guardamos todos los eventos para búsquedas o filtrado
//       } catch (error) {
//         console.error("Error al cargar eventos:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitial();
//   }, []);

//   // Función para manejar la búsqueda de eventos por pueblo
//   const handleSearchByPueblo = async (puebloId) => {
//     try {
//       setLoading(true);
//       const data = await getEventosByPueblo(puebloId); // Obtener eventos filtrados por pueblo
//       setEventosList(data);
//     } catch (error) {
//       console.error("Error al filtrar eventos por pueblo:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Eventos</h1>
//       <Search 
//         eventosList={eventosList} 
//         setEventosList={setEventosList} 
//         allEventos={allEventos} 
//         setAllEventos={setAllEventos} 
//         handleSearchByPueblo={handleSearchByPueblo} // Pasamos la función de búsqueda por pueblo
//       />
//       {loading ? (
//         <p>Cargando eventos...</p>
//       ) : (
//         <EventosList eventos={eventosList} />
//       )}
//     </div>
//   );
// };

// export default EventosContainer;


import React, { useState, useEffect } from 'react';
import './Eventos.css'
import { getEventos } from "../../../services/eventosService"; // Servcio para obtener eventos
import { getPueblos } from "../../../services/pueblosService"; // Servcio para obtener pueblos
import EventosList from './EventosList'; // Componente de la lista de eventos
import Search from './Search'; // Filtro de búsqueda para el pueblo
import { RotatingLines } from 'react-loader-spinner'

const EventosContainer = () => {
  const [eventos, setEventos] = useState([]);
  const [pueblos, setPueblos] = useState([]);
  const [selectedPueblo, setSelectedPueblo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar pueblos y eventos inicialmente
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener todos los pueblos
        const pueblosData = await getPueblos();
        setPueblos(pueblosData);

        // Obtener los eventos filtrados por pueblo si existe alguno seleccionado
        const eventosData = await getEventos(selectedPueblo);
        setEventos(eventosData);
      } catch (error) {
        console.error('Error al cargar pueblos y eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPueblo]); // Vuelve a cargar cuando se cambia el pueblo seleccionado

  // Manejar la selección de un pueblo para filtrar los eventos
  const handlePuebloChange = (puebloId) => {
    setSelectedPueblo(puebloId);
  };

  return (
    <div className="eventos-container">
      <h1 className="eventos-title">Eventos</h1>
      <Search pueblos={pueblos} onPuebloChange={handlePuebloChange} />

      {loading ? (
        <span className="eventos-loading"><span className="loading-text"><RotatingLines
              visible={true}
              height="96"
              width="96"
              color="#8C6A43"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
              /></span></span>
      ) : (
        <EventosList eventos={eventos} />
      )}
    </div>
  );
};

export default EventosContainer;
