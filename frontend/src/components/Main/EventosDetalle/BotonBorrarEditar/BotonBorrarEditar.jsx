// EventActionButtons.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteEvento } from "../../../../services/eventosService"; // Importamos el servicio de eliminación

const EventActionButtons = ({ eventoId, onEdit }) => {
  const navigate = useNavigate();

  // Función para manejar la eliminación del evento
  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      try {
        await deleteEvento(eventoId);  // Usamos el id que recibimos como prop
        alert("Evento eliminado con éxito.");
        navigate('/eventos');  // Redirige a la lista de eventos después de eliminar
      } catch (error) {
        alert("Error al eliminar el evento.");
      }
    }
  };

  // Función para manejar la edición del evento
  const handleEdit = () => {
    const shouldEdit = window.confirm("¿Quieres editar este evento?");
    if (shouldEdit) {
      alert("Redirigiendo a la página de edición...");
      navigate(`/eventos/editar/${eventoId}`);
    }
  };

  return (
    <div className="evento-actions">
      <button className="edit-button" onClick={handleEdit}>Editar</button>
      <button className="delete-button" onClick={handleDelete}>Borrar</button>
    </div>
  );
};

export default EventActionButtons;
