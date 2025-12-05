// import React from "react";
// import { Link } from "react-router-dom";

// const EventoCard = ({ evento }) => {
//   return (
//     <Link
//       to={`/evento/${evento.evento_id}`}
//       style={{
//         display: "block",
//         width: "200px",
//         height: "200px",
//         borderRadius: "12px",
//         overflow: "hidden",
//         textDecoration: "none",
//         color: "white",
//         position: "relative",
//         backgroundImage: `url(${evento.img_url || '/path/to/default-image.jpg'})`, // Si no tienes imagen, usar una por defecto
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           bottom: "0",
//           width: "100%",
//           background: "rgba(0,0,0,0.5)",
//           textAlign: "center",
//           padding: "8px 0",
//           fontWeight: "bold",
//         }}
//       >
//         {evento.titulo} {/* Aquí mostramos el título del evento */}
//       </div>
//       <div
//         style={{
//           position: "absolute",
//           top: "0",
//           left: "0",
//           right: "0",
//           background: "rgba(0,0,0,0.6)",
//           color: "white",
//           padding: "4px",
//           fontSize: "12px",
//           textAlign: "center",
//         }}
//       >
//         {evento.tipo} {/* Mostramos el tipo de evento */}
//       </div>
//     </Link>
//   );
// };

// export default EventoCard;


import React from "react";
import "./EventosCard.css";
import { Link } from "react-router-dom";

const EventoCard = ({ evento }) => {
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
          {evento.fecha_inicio} → {evento.fecha_fin}
        </p>
        <p className="evento-descripcion">
          {evento.descripcion?.slice(0, 80)}...
        </p>
      </div>
    </Link>
  );
};


export default EventoCard;
