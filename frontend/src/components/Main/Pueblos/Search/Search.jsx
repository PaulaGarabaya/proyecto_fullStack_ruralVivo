// // src/components/Search/Search.jsx
// import React, { useState } from "react";

// const Search = ({ setPueblosList, allPueblos }) => {
//   const [inputValue, setInputValue] = useState("");

//   const handleSearch = () => {
//     if (!inputValue) {
//       // Si no hay búsqueda, mostrar todos los pueblos
//       setPueblosList(allPueblos);
//       return;
//     }

//     const filteredPueblos = allPueblos.filter((pueblo) =>
//       pueblo.nombre.toLowerCase().includes(inputValue.toLowerCase())
//     );
//     setPueblosList(filteredPueblos);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Busca un pueblo"
//       />
//       <button onClick={handleSearch}>Buscar</button>
//     </div>
//   );
// };

// export default Search;
import React, { useState } from "react";
import './Search.css'
const Search = ({ setPueblosList, allPueblos }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (!inputValue) {
      // Si no hay valor en el input, mostramos todos los pueblos
      setPueblosList(allPueblos);
      return;
    }

    // Filtrar pueblos por nombre (puedes agregar más campos como provincia o CCAA si lo deseas)
    const filteredPueblos = allPueblos.filter((pueblo) =>
      pueblo.nombre.toLowerCase().includes(inputValue.toLowerCase())
    );

    setPueblosList(filteredPueblos);
  };

  return (
    <div className="search-container">
      <input className="search-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Buscar pueblo..."
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default Search;

