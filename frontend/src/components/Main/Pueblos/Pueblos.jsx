import React, { useEffect, useState } from "react";
import Search from "./Search";
import PueblosList from "./PueblosList"; 
import { getPueblos } from "../../../services/pueblosService"; 

const PueblosContainer = () => {
  const [pueblosList, setPueblosList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar pueblos iniciales
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        setLoading(true);
        const data = await getPueblos(); // Llamada al servicio
        setPueblosList(data);
      } catch (error) {
        console.error("Error al cargar pueblos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, []);

  return (
    <div>
      <h1>Pueblos</h1>
      <Search pueblosList={pueblosList} setPueblosList={setPueblosList} />
      {loading ? (
        <p>Cargando pueblos...</p>
      ) : (
        <PueblosList pueblos={pueblosList} />
      )}
    </div>
  );
};

export default PueblosContainer;
