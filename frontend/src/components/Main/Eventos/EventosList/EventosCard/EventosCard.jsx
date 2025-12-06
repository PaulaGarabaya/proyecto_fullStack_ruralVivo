import React from "react";
import "./EventosCard.css";
import { Link } from "react-router-dom";

const EventoCard = ({ evento }) => {
  // Extraemos solo la parte de la fecha
  const fechaInicio = evento.fecha_inicio ? evento.fecha_inicio.split("T")[0] : "";
  const fechaFin = evento.fecha_fin ? evento.fecha_fin.split("T")[0] : "";

  return (
    <Link to={`/evento/${evento.evento_id}`} className="evento-card">
      <div
        className="evento-card-img"
        style={{ backgroundImage: `url(${evento.pueblo_img || evento.url})` }}
      />

      <div className="evento-card-content">
        <h3 className="evento-title">{evento.titulo}</h3>
        <p className="evento-pueblo">
          {evento.pueblo_nombre || "Pueblo desconocido"} — {evento.pueblo_provincia || ""}
        </p>
        <p className="evento-fecha">
          {fechaInicio} → {fechaFin}
        </p>
        <p className="evento-descripcion">
          {evento.descripcion?.slice(0, 80)}...
        </p>
      </div>
    </Link>
  );
};

export default EventoCard;


//////////////////////BORRAR Y EDITAR///////////////////////////////// No termina de hacerlo
// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../../../context/UserContext";
// import { deleteEvento } from "../../../services/eventosService";
// import "./EventosCard.css";

// const EventoCard = ({ evento, onDelete }) => {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleDelete = async () => {
//     if (window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
//       try {
//         await deleteEvento(evento.evento_id);
//         alert("Evento eliminado correctamente");
//         if (onDelete) onDelete(evento.evento_id); // Actualiza lista
//       } catch (err) {
//         alert(err.message);
//       }
//     }
//   };

//   const handleEdit = () => {
//     navigate(`/evento/${evento.evento_id}/edit`);
//   };

//   const canEditOrDelete = evento.user_id === user.user_id || user.role === "admin";

//   return (
//     <div className="evento-card">
//       <Link to={`/evento/${evento.evento_id}`} className="evento-card-link">
//         <div
//           className="evento-card-img"
//           style={{ backgroundImage: `url(${evento.img_url || evento.pueblo_img || '/default.jpg'})` }}
//         />
//         <div className="evento-card-content">
//           <h3>{evento.titulo}</h3>
//           <p>{evento.pueblo_nombre || "Pueblo desconocido"}</p>
//           <p>{evento.fecha_inicio} → {evento.fecha_fin}</p>
//         </div>
//       </Link>

//       {canEditOrDelete && (
//         <div className="evento-card-actions">
//           <button onClick={handleEdit}>Editar</button>
//           <button onClick={handleDelete}>Eliminar</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventoCard;
