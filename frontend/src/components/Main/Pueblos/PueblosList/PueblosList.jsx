import React from "react";
import PueblosCard from "./PueblosCard";

const PueblosList = ({ pueblos }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {pueblos.map((pueblo) => (
        <PueblosCard key={pueblo.pueblo_id} pueblo={pueblo} />
      ))}
    </div>
  );
};

export default PueblosList;
