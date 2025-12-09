import React, { useState, useEffect } from "react";
import './Search.css';

const Search = ({ setPueblosList }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchPueblos = async () => {
      try {
        
        // 🔥 Usar 'search' en lugar de 'q'
        const url = inputValue 
          ? `http://localhost:3000/api/pueblos?search=${encodeURIComponent(inputValue)}`
          : `http://localhost:3000/api/pueblos`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Error al buscar pueblos');
        }
        
        const data = await response.json();
        setPueblosList(data);
      } catch (error) {
        console.error('Error al buscar pueblos:', error);
        setPueblosList([]); // Limpiar la lista en caso de error
      } 
    };

    // Debounce: esperar 300ms después de que el usuario deje de escribir
    const timeoutId = setTimeout(() => {
      fetchPueblos();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, setPueblosList]);


  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          className="search-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Buscar pueblo... "
        />

      </div>
    </div>
  );
};

export default Search;