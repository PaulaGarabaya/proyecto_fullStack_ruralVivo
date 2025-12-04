import React, { useEffect, useState } from "react";
import './Pueblos.css'
import Search from "./Search";
import PueblosList from "./PueblosList"; 
import { getPueblos } from "../../../services/pueblosService"; 
import { RotatingLines } from 'react-loader-spinner'



const PueblosContainer = () => {
  const [allPueblos, setAllPueblos] = useState([]); // Todos los pueblos desde la API
  const [pueblosList, setPueblosList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar pueblos iniciales
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        setLoading(true);
        const data = await getPueblos(); // Llamada al servicio
        setPueblosList(data);
      } catch (error) {
        console.error("Error al cargar pueblos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, []);

  return (
    <div className="pueblos-container">
      <h1 className="pueblos-title">Pueblos</h1>
      <Search pueblosList={pueblosList} setPueblosList={setPueblosList} allPueblos={allPueblos} setAllPueblos={setAllPueblos}/>
      {loading ? (
        <p className="loading-text"><RotatingLines
              visible={true}
              height="96"
              width="96"
              color="#8C6A43"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
              /></p>
      ) : (
        <PueblosList pueblos={pueblosList} />
      )}
    </div>
  );
};

export default PueblosContainer;


// import React, { useState, useEffect } from "react";
// import { getPueblos } from "../../../services/pueblosService"; // Suponemos que esta función obtiene todos los pueblos
// import PueblosCard from "./PueblosList/PueblosList";
// import Search from "./Search"; // Importar el componente Search

// const Pueblos = () => {
//   const [allPueblos, setAllPueblos] = useState([]); // Inicializamos como un arreglo vacío
//   const [pueblosList, setPueblosList] = useState([]); // Inicializamos como un arreglo vacío

//   useEffect(() => {
//     const fetchPueblos = async () => {
//       try {
//         const data = await getPueblos(); // Llamada a la API para obtener los pueblos
//         setAllPueblos(data); // Guardamos todos los pueblos en allPueblos
//         setPueblosList(data); // Iniciamos la lista visible con todos los pueblos
//       } catch (error) {
//         console.error("Error al cargar pueblos", error);
//       }
//     };
//     fetchPueblos();
//   }, []);

//   return (
//     <div>
//       {/* Pasamos allPueblos y setPueblosList a Search */}
//       <Search setPueblosList={setPueblosList} allPueblos={allPueblos} />
//       <div className="pueblos-list">
//         {/* Mapeamos los pueblos a mostrar */}
//         {pueblosList.map((pueblo) => (
//           <PueblosCard key={pueblo.pueblo_id} pueblo={pueblo} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Pueblos;
