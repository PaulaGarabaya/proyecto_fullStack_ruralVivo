// import React from "react";

// const Search = () => {
//   return <div>Search</div>;
// };

// export default Search;
// import React from "react";
// import './Search.css'

// const Search = ({ pueblos, onPuebloChange }) => {
//   return (
//     <div className="eventos-search-container">
//       <label htmlFor="pueblo">Filtrar por pueblo:</label>
//       <select className="eventos-select" id="pueblo" onChange={(e) => onPuebloChange(e.target.value)} defaultValue="">
//         <option value="">Todos los pueblos</option>
//         {pueblos.map((pueblo) => (
//           <option key={pueblo.pueblo_id} value={pueblo.pueblo_id}>
//             {pueblo.nombre}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Search;
import React from "react";
import './Search.css';

const Search = ({ pueblos, onPuebloChange }) => {

  const handleSelectChange = (e) => {
    const selectedId = e.target.value === "all" ? null : parseInt(e.target.value);
    onPuebloChange(selectedId);
  };

  return (
    <div className="select-pueblo-container">
      <select className="search-select" onChange={handleSelectChange}>
        <option value="all">Todos los pueblos</option>
        {pueblos.map(pueblo => (
          <option key={pueblo.pueblo_id} value={pueblo.pueblo_id}>
            {pueblo.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;
