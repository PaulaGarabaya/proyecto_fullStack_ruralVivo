// import React, { useState } from "react";
// import './Search.css'
// const Search = ({ setPueblosList, allPueblos }) => {
//   const [inputValue, setInputValue] = useState("");

//   const handleSearch = () => {
//     if (!inputValue) {
//       // Si no hay valor en el input, mostramos todos los pueblos
//       setPueblosList(allPueblos);
//       return;
//     }

//     // Filtrar pueblos por nombre (puedes agregar más campos como provincia o CCAA si lo deseas)
//     const filteredPueblos = allPueblos.filter((pueblo) =>
//       pueblo.nombre.toLowerCase().includes(inputValue.toLowerCase())
//     );

//     setPueblosList(filteredPueblos);
//   };

//   return (
//     <div className="search-container">
//       <input className="search-input"
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Buscar pueblo..."
//       />
//       <button onClick={handleSearch}>Buscar</button>
//     </div>
//   );
// };

// export default Search;

import React, { useState, useEffect } from "react";
import './Search.css';

const Search = ({ setPueblosList }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchPueblos = async () => {
      try {
        // Llamada a la API con query param q
        const response = await fetch(`http://localhost:3000/api/pueblos?q=${inputValue}`);
        if (!response.ok) throw new Error('Error al buscar pueblos');
        const data = await response.json();
        setPueblosList(data);
      } catch (error) {
        console.error(error);
      }
    };

    // Solo hacer fetch si hay algún valor escrito, sino mostrar todos
    if (inputValue === "") {
      fetch(`http://localhost:3000/api/pueblos`)
        .then(res => res.json())
        .then(data => setPueblosList(data));
    } else {
      // Pequeño debounce para no hacer llamadas en cada letra inmediatamente
      const timeoutId = setTimeout(fetchPueblos, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [inputValue, setPueblosList]);

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Buscar pueblo..."
      />
    </div>
  );
};

export default Search;
