import React from "react";
import './PueblosList.css'
import PueblosCard from "./PueblosCard";

const PueblosList = ({ pueblos }) => {
  return (
    <div className="pueblos-list">
      {pueblos.map((pueblo) => (
        <PueblosCard key={pueblo.pueblo_id} pueblo={pueblo} />
      ))}
    </div>
  );
};

export default PueblosList;
