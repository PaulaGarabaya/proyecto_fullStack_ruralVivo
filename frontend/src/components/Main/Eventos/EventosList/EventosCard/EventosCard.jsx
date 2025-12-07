import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../../context/UserContext";
import  {deleteEvento} from "../../../../../services/eventosService";
import "./EventosCard.css";

const EventoCard = ({ evento, onDelete }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  // Extraer fechas
  const fechaInicio = evento.fecha_inicio ? evento.fecha_inicio.split("T")[0] : "Sin fecha";
  const fechaFin = evento.fecha_fin ? evento.fecha_fin.split("T")[0] : "";

  // Verificar si el usuario puede editar/eliminar
  // El usuario puede hacerlo si:
  // 1. Es el creador (user_id coincide)
  // 2. Es administrador (role === 'admin')
  const canEditOrDelete = user && (
    evento.user_id === user.user_id || 
    user.role === 'admin'
  );

  const handleDelete = async (e) => {
    e.preventDefault(); // Evitar navegación del Link
    
    if (!window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteEvento(evento.evento_id);
      alert("Evento eliminado correctamente");
      
      // Llamar callback para recargar lista
      if (onDelete) {
        onDelete();
      }
    } catch (err) {
      console.error('Error al eliminar evento:', err);
      alert(err.message || 'Error al eliminar el evento');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault(); // Evitar navegación del Link
    navigate(`/eventos/${evento.evento_id}/edit`);
  };

  return (
    <div className="evento-card">
      <Link to={`/evento/${evento.evento_id}`} className="evento-card-link">
        <div
          className="evento-card-img"
          style={{ 
            backgroundImage: `url(${evento.url || evento.pueblo_img || '/default-event.jpg'})` 
          }}
        />

        <div className="evento-card-content">
          <h3 className="evento-title">{evento.titulo}</h3>
          
          <p className="evento-pueblo">
            {evento.pueblo_nombre || "Pueblo desconocido"}
            {evento.pueblo_provincia && ` — ${evento.pueblo_provincia}`}
          </p>
          
          <p className="evento-fecha">
            {fechaInicio} {fechaFin && `→ ${fechaFin}`}
          </p>
          
          <p className="evento-tipo">
            {evento.tipo === 'fiesta' && '🎉 Fiesta'}
            {evento.tipo === 'evento_cultural' && '🎭 Evento Cultural'}
            {evento.tipo === 'otro' && '📅 Otro'}
          </p>
          
          {evento.descripcion && (
            <p className="evento-descripcion">
              {evento.descripcion.slice(0, 100)}
              {evento.descripcion.length > 100 && '...'}
            </p>
          )}
        </div>
      </Link>

      {/* Botones de editar/eliminar solo si el usuario es el creador o admin */}
      {canEditOrDelete && (
        <div className="evento-card-actions">
          <button 
            className="btn-edit" 
            onClick={handleEdit}
            disabled={isDeleting}
          >
            ✏️ Editar
          </button>
          <button 
            className="btn-delete" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? '⏳ Eliminando...' : '🗑️ Eliminar'}
          </button>
        </div>
      )}
    </div>
  );
};

export default EventoCard;