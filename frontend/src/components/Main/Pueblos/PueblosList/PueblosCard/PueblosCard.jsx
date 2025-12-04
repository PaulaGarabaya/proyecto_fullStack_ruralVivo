import React from "react";
import './PueblosCard.css'
import { Link } from "react-router-dom";

const PueblosCard = ({ pueblo }) => {
  return (
    <Link
      to={`/pueblo/${pueblo.pueblo_id}`}
      style={{
        display: "block",
        width: "200px",
        height: "200px",
        borderRadius: "12px",
        overflow: "hidden",
        textDecoration: "none",
        color: "white",
        position: "relative",
        backgroundImage: `url(${pueblo.img_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          background: "rgba(0,0,0,0.5)",
          textAlign: "center",
          padding: "8px 0",
          fontWeight: "bold",
        }}
      >
        {pueblo.nombre}
      </div>
    </Link>
  );
};

export default PueblosCard;
