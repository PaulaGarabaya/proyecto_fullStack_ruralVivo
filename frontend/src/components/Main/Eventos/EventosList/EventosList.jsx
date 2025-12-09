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