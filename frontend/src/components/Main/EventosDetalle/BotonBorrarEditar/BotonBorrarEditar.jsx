// import React, { useContext } from "react";

// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../../../context/UserContext";
// import { deleteEvento } from "../../../../services/eventosService";
// import "./BotonBorrarEditar.css";

// const BotonBorrarEditar = ({ evento, onDelete }) => {
//   const navigate = useNavigate();
//   const { user } = useContext(UserContext);

//   // Si no hay usuario logueado o no hay evento, no mostrar nada
//   if (!user || !evento) return null;

//   // Verificar permisos: debe ser el creador o admin
//   const canEdit = evento.user_id === user.user_id || user.role === 'admin';

//   // Si no tiene permisos, no mostrar los botones
//   if (!canEdit) return null;

//   const handleEdit = () => {
//     navigate(`/eventos/${evento.evento_id}/edit`);
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("⚠️ ¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.")) {
//       return;
//     }

//     try {
//       await deleteEvento(evento.evento_id);
//       alert("✅ Evento eliminado con éxito");
      
//       // Llamar callback si existe, si no, redirigir
//       if (onDelete) {
//         onDelete();
//       } else {
//         navigate('/eventos');
//       }
//     } catch (error) {
//       console.error('Error al eliminar evento:', error);
//       alert("❌ Error al eliminar el evento: " + error.message);
//     }
//   };

//   return (
//     <div className="evento-actions">
//       <button 
//         className="btn-edit" 
//         onClick={handleEdit}
//         title="Editar evento"
//       >
//         ✏️ Editar
//       </button>
//       <button 
//         className="btn-delete" 
//         onClick={handleDelete}
//         title="Eliminar evento"
//       >
//         🗑️ Borrar
//       </button>
//     </div>
//   );
// };

// export default BotonBorrarEditar;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import { deleteEvento } from "../../../../services/eventosService";
import "./BotonBorrarEditar.css";

const BotonBorrarEditar = ({ evento, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  if (!user || !evento) return null;

  const canEdit = evento.user_id === user.user_id || user.role === 'admin';

  if (!canEdit) return null;

  const handleDelete = async () => {
    if (!window.confirm("⚠️ ¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      await deleteEvento(evento.evento_id);
      alert("✅ Evento eliminado con éxito");
      
      if (onDelete) {
        onDelete();
      } else {
        navigate('/eventos');
      }
    } catch (error) {
      console.error('Error al eliminar evento:', error);
      alert("❌ Error al eliminar el evento: " + error.message);
    }
  };

  return (
    <div className="evento-actions">
      <button 
        className="btn-edit" 
        onClick={onEdit}
        title="Editar evento"
      >
        ✏️ Editar
      </button>
      <button 
        className="btn-delete" 
        onClick={handleDelete}
        title="Eliminar evento"
      >
        🗑️ Borrar
      </button>
    </div>
  );
};

export default BotonBorrarEditar;