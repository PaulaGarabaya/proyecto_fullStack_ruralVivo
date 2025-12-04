// import React from "react";
// import EventoCard from "./EventosCard"; // Asegúrate de crear este componente de tarjeta de evento

// const EventosList = ({ eventos }) => {
//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
//       {eventos.map((evento) => (
//         <EventoCard key={evento.evento_id} evento={evento} />
//       ))}
//     </div>
//   );
// };

// export default EventosList;

import React from "react";
import './EventosList.css'
import EventoCard from "./EventosCard"; // Card para cada evento

const EventosList = ({ eventos }) => {
  return (
    <div className="eventos-list">
      {eventos.map((evento) => (
        <EventoCard key={evento.evento_id} evento={evento} pueblo={evento.pueblo} />
      ))}
    </div>
  );
};

export default EventosList;
