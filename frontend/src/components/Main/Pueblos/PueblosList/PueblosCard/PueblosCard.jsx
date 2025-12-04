import React from "react";
import { Link } from "react-router-dom";

const PuebloCard = ({ pueblo }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "200px",
        height: "150px",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        backgroundImage: `url(${pueblo.img_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textShadow: "1px 1px 2px rgba(0,0,0,0.7)"
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          background: "rgba(0,0,0,0.5)",
          padding: "8px",
          textAlign: "center"
        }}
      >
        <h4 style={{ margin: 0 }}>{pueblo.nombre}</h4>
      </div>
      <Link
        to={`/pueblos/${pueblo._id}`}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "rgba(255,255,255,0.7)",
          color: "#000",
          padding: "4px 8px",
          borderRadius: "4px",
          textDecoration: "none",
          fontSize: "12px"
        }}
      >
        Ver detalles
      </Link>
    </div>
  );
};

export default PuebloCard;
