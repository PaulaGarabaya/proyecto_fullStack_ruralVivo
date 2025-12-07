import React, { useEffect, useState, useContext } from "react";
import './EventosDetalle.css';
import { useParams, useNavigate } from "react-router-dom";
import { getEvento, updateEvento } from "../../../services/eventosService";
import { getPueblo } from "../../../services/pueblosService";
import { getPueblos } from "../../../services/pueblosService";
import { UserContext } from "../../../context/UserContext";
import Map from "./Map";
import { RotatingLines } from 'react-loader-spinner';
import BotonBorrarEditar from "./BotonBorrarEditar";
import BotonFavoritos from "./BotonFavoritos";

const EventoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [evento, setEvento] = useState(null);
  const [pueblo, setPueblo] = useState(null);
  const [pueblos, setPueblos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 🔥 Estado para modo edición
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Obtener evento
        const data = await getEvento(id);
        setEvento(data);

        // Obtener pueblo si existe
        if (data.pueblo_id) {
          const puebloData = await getPueblo(data.pueblo_id);
          setPueblo(puebloData);
        }

        // Obtener todos los pueblos para el select
        const pueblosData = await getPueblos();
        setPueblos(pueblosData);

      } catch (error) {
        console.error("Error al cargar evento:", error);
        setError("No se pudo cargar el evento");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const canEditOrDelete = user && evento && (
    evento.user_id === user.user_id || 
    user.role === 'admin'
  );

  const formatDate = (dateString) => {
    if (!dateString) return "No especificada";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  // 🔥 Activar modo edición
  const handleStartEdit = () => {
    if (window.confirm("¿Quieres editar este evento?")) {
      setEditFormData({
        pueblo_id: evento.pueblo_id || "",
        titulo: evento.titulo || "",
        tipo: evento.tipo || "fiesta",
        descripcion: evento.descripcion || "",
        fecha_inicio: formatDateForInput(evento.fecha_inicio),
        fecha_fin: formatDateForInput(evento.fecha_fin),
        url: evento.url || ""
      });
      setIsEditing(true);
    }
  };

  // 🔥 Cancelar edición
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData({});
  };

  // 🔥 Cambios en el formulario
  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 Guardar cambios
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    
    if (!window.confirm("¿Guardar los cambios realizados?")) {
      return;
    }

    try {
      setSaving(true);
      
      const updatedEvento = await updateEvento(id, {
        ...editFormData,
        pueblo_id: Number(editFormData.pueblo_id)
      });

      // Actualizar estado local
      setEvento(updatedEvento.evento || updatedEvento);
      setIsEditing(false);
      alert("✅ Evento actualizado correctamente");

      // Recargar pueblo si cambió
      if (editFormData.pueblo_id !== evento.pueblo_id) {
        const puebloData = await getPueblo(editFormData.pueblo_id);
        setPueblo(puebloData);
      }

    } catch (error) {
      console.error('Error al actualizar:', error);
      alert("❌ Error al actualizar: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
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
    );
  }

  if (error || !evento) {
    return (
      <div className="evento-error">
        <h2>Error</h2>
        <p>{error || "No se encontró el evento"}</p>
        <button onClick={() => navigate('/eventos')}>Volver a eventos</button>
      </div>
    );
  }

  const lat = parseFloat(evento.latitud || pueblo?.latitud);
  const lng = parseFloat(evento.longitud || pueblo?.longitud);
  const hasValidCoordinates = !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;

  return (
    <div className="evento-details-container">
      <div className="evento-details-content">
        
        {/* Header con título y botones */}
        <div className="evento-header">
          {!isEditing ? (
            <h1>{evento.titulo}</h1>
          ) : (
            <h1>✏️ Editando evento</h1>
          )}
            {/* Grupo de botones de acción */}
            {/* Favoritos siempre visible si hay usuario */}
          {user && <BotonFavoritos eventoId={evento.evento_id} />}
          {canEditOrDelete && !isEditing && (
            <BotonBorrarEditar 
              evento={evento}
              onEdit={handleStartEdit}
              onDelete={() => navigate('/eventos')}
            />
          )}
        </div>

        {/* 🔥 MODO EDICIÓN */}
        {isEditing ? (
          <form onSubmit={handleSaveEdit} className="evento-edit-form">
            
            <div className="form-group">
              <label htmlFor="pueblo_id">Pueblo *</label>
              <select
                id="pueblo_id"
                name="pueblo_id"
                value={editFormData.pueblo_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione un pueblo</option>
                {pueblos.map((p) => (
                  <option key={p.pueblo_id} value={p.pueblo_id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="titulo">Título *</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={editFormData.titulo}
                onChange={handleInputChange}
                required
                maxLength={200}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tipo">Tipo *</label>
              <select
                id="tipo"
                name="tipo"
                value={editFormData.tipo}
                onChange={handleInputChange}
                required
              >
                <option value="fiesta">🎉 Fiesta</option>
                <option value="evento_cultural">🎭 Evento Cultural</option>
                <option value="otro">📅 Otro</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={editFormData.descripcion}
                onChange={handleInputChange}
                rows={5}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fecha_inicio">Fecha Inicio</label>
                <input
                  type="date"
                  id="fecha_inicio"
                  name="fecha_inicio"
                  value={editFormData.fecha_inicio}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fecha_fin">Fecha Fin</label>
                <input
                  type="date"
                  id="fecha_fin"
                  name="fecha_fin"
                  value={editFormData.fecha_fin}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="url">URL / Enlace</label>
              <input
                type="url"
                id="url"
                name="url"
                value={editFormData.url}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com"
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-save"
                disabled={saving}
              >
                {saving ? "💾 Guardando..." : "💾 Guardar Cambios"}
              </button>
              <button 
                type="button" 
                className="btn-cancel"
                onClick={handleCancelEdit}
                disabled={saving}
              >
                ❌ Cancelar
              </button>
            </div>

          </form>
        ) : (
          /* 🔥 MODO VISTA */
          <>
            <div className="evento-main-layout">
              
              {/* Columna izquierda: Información */}
              <div className="evento-info-column">
                
                <div className="evento-tipo-badge">
                  {evento.tipo === 'fiesta' && '🎉 Fiesta'}
                  {evento.tipo === 'evento_cultural' && '🎭 Evento Cultural'}
                  {evento.tipo === 'otro' && '📅 Otro'}
                </div>

                <div className="evento-section">
                  <h3>📅 Fechas</h3>
                  <p><strong>Inicio:</strong> {formatDate(evento.fecha_inicio)}</p>
                  {evento.fecha_fin && (
                    <p><strong>Fin:</strong> {formatDate(evento.fecha_fin)}</p>
                  )}
                </div>

                {pueblo && (
                  <div className="evento-section">
                    <h3>📍 Ubicación</h3>
                    <p><strong>Pueblo:</strong> {pueblo.nombre}</p>
                    <p><strong>Provincia:</strong> {pueblo.provincia}</p>
                    {pueblo.ccaa && <p><strong>Comunidad:</strong> {pueblo.ccaa}</p>}
                  </div>
                )}

                {evento.descripcion && (
                  <div className="evento-section">
                    <h3>ℹ️ Descripción</h3>
                    <p className="descripcion-text">{evento.descripcion}</p>
                  </div>
                )}

                {evento.url && (
                  <div className="evento-section">
                    <a 
                      href={evento.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-programa"
                    >
                      🔗 Ver Programa Completo
                    </a>
                  </div>
                )}

              </div>

              {/* Columna derecha: Imagen */}
              <div className="evento-image-column">
                {(evento.url || pueblo?.img) && (
                  <div className="evento-image-wrapper">
                    <img 
                      src={evento.url || pueblo?.img || '/default-event.jpg'} 
                      alt={evento.titulo}
                      className="evento-detail-img"
                    />
                  </div>
                )}
              </div>

            </div>

            {hasValidCoordinates ? (
              <div className="evento-mapa-section">
                <h3>🗺️ Ubicación en el Mapa</h3>
                <Map lat={lat} lng={lng} name={evento.titulo} />
                <p className="coordenadas-info">
                  Coordenadas: {lat.toFixed(4)}, {lng.toFixed(4)}
                </p>
              </div>
            ) : (
              <div className="no-coordenadas">
                <p>📍 Coordenadas no disponibles para este evento</p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default EventoDetails;
