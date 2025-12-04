import React from "react";
import PuebloCard from "./PueblosCard"; // Antes PokemonCard

const PueblosList = ({ pueblos }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {pueblos.map((pueblo) => (
        <PueblosCard key={pueblo._id} pueblo={pueblo} />
      ))}
    </div>
  );
};

export default PueblosList;
