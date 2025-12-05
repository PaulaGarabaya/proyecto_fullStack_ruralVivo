import React, { useEffect, useState } from "react";
import './PueblosDetalle.css'
import { useParams, useLocation } from "react-router-dom";
import { getPueblo } from "../../../services/pueblosService"; // asegúrate de la ruta correcta
import Map from "./Map"; // Import del mapa
import { RotatingLines } from 'react-loader-spinner'


const PuebloDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [pueblo, setPueblo] = useState(null);

  // Recuperar datos pasados por query params como fallback
  const searchParams = new URLSearchParams(location.search);
  const nombre = searchParams.get("nombre");
  const provincia = searchParams.get("provincia");
  const CCAA = searchParams.get("CCAA");
  const img_url = searchParams.get("img_url");
  const latitud = searchParams.get("latitud");
  const longitud = searchParams.get("longitud");

  useEffect(() => {
    const fetchPueblo = async () => {
      try {
        const data = await getPueblo(id); // usamos tu servicio
        setPueblo({
          id: data.pueblo_id,
          nombre: data.nombre,
          provincia: data.provincia,
          CCAA: data.CCAA,
          img_url: data.img_url,
          latitud: data.latitud,
          longitud: data.longitud,
        });
      } catch (error) {
        console.error("Error al cargar pueblo:", error);
        // Usar datos del query params si fetch falla
        setPueblo({
          id,
          nombre,
          provincia,
          CCAA,
          img_url,
          latitud,
          longitud,
        });
      }
    };

    fetchPueblo();
  }, [id]);

  if (!pueblo) return <span className="pueblos-loading"><RotatingLines
                visible={true}
                height="96"
                width="96"
                color="#8C6A43"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
                /></span>;

  return (
    <div className="pueblo-details"> 
      <h2>{pueblo.nombre}</h2>
      {pueblo.img_url && (
        <img
          src={pueblo.img_url}
          alt={pueblo.nombre}
          style={{ width: "300px", height: "200px", objectFit: "cover" }}
        />
      )}
      <p className="pueblo-info">Provincia: {pueblo.provincia}</p>
      <p className="pueblo-info">CCAA: {pueblo.CCAA}</p>
      <p>Latitud: {pueblo.latitud}</p>
      <p>Longitud: {pueblo.longitud}</p>
      {/* Mapa */}
      <Map className="map-container" lat={pueblo.latitud} lng={pueblo.longitud} name={pueblo.nombre} />
    </div>
  );
};

export default PuebloDetails;
