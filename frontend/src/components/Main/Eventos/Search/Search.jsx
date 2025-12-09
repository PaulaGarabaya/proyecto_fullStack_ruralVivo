import React, { useState } from "react";
import './Search.css';

const Search = ({ pueblos, onFiltrosChange, filtros }) => {
  const [localFiltros, setLocalFiltros] = useState({
    puebloId: filtros?.puebloId || '',
    provincia: filtros?.provincia || '',
    fechaInicio: filtros?.fechaInicio || '',
    fechaFin: filtros?.fechaFin || ''
  });

  const handleChange = (field, value) => {
    const newValue = value === '' ? null : value;
    setLocalFiltros(prev => ({ ...prev, [field]: newValue }));
  };

  const handleApplyFilters = () => {
    onFiltrosChange(localFiltros);
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      puebloId: null,
      provincia: null,
      fechaInicio: null,
      fechaFin: null
    };
    setLocalFiltros(emptyFilters);
    onFiltrosChange(emptyFilters);
  };

  return (
    <div className="search-container">
      <div className="search-filters">
        {/* Filtro por pueblo */}
        <div className="filter-group">
          <label htmlFor="pueblo"></label>
          <select
            id="pueblo"
            className="search-select"
            value={localFiltros.puebloId || ''}
            onChange={(e) => handleChange('puebloId', e.target.value)}
          >
            <option value="">Selecciona un pueblo</option>
            {pueblos.map(pueblo => (
              <option key={pueblo.pueblo_id} value={pueblo.pueblo_id}>
                {pueblo.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por provincia */}
        <div className="filter-group">
          <label htmlFor="provincia"></label>
          <input
            id="provincia"
            type="text"
            className="search-input"
            placeholder="Escribe la provincia"
            value={localFiltros.provincia || ''}
            onChange={(e) => handleChange('provincia', e.target.value)}
          />
        </div>

        {/* Filtro por fecha inicio */}
        <div className="filter-group">
          <label htmlFor="fechaInicio">Desde:</label>
          <input
            id="fechaInicio"
            type="date"
            className="search-input"
            value={localFiltros.fechaInicio || ''}
            onChange={(e) => handleChange('fechaInicio', e.target.value)}
          />
        </div>

        {/* Filtro por fecha fin */}
        <div className="filter-group">
          <label htmlFor="fechaFin">Hasta:</label>
          <input
            id="fechaFin"
            type="date"
            className="search-input"
            value={localFiltros.fechaFin || ''}
            onChange={(e) => handleChange('fechaFin', e.target.value)}
          />
        </div>
      </div>

      <div className="search-actions">
        <button className="btn-apply" onClick={handleApplyFilters}>
          Aplicar filtros
        </button>
        <button className="btn-clear" onClick={handleClearFilters}>
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default Search;