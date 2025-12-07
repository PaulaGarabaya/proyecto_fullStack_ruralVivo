// import React from "react";
// import './EventosList.css'
// import EventoCard from "./EventosCard"; // Card para cada evento

// const EventosList = ({ eventos }) => {
//   return (
//     <div className="eventos-list">
//       {eventos.map((evento) => (
//         <EventoCard key={evento.evento_id} evento={evento} pueblo={evento.pueblo} />
//       ))}
//     </div>
//   );
// };

// export default EventosList;


import React from "react";
import './EventosList.css';
import EventoCard from "./EventosCard";

const EventosList = ({ eventos, onEventoDeleted }) => {
  return (
    <div className="eventos-list">
      {eventos.map((evento) => (
        <EventoCard 
          key={evento.evento_id} 
          evento={evento}
          onDelete={onEventoDeleted}
        />
      ))}
    </div>
  );
};

export default EventosList;