import React, { useEffect, useState } from "react";
import './EventosDetalle.css'
import { useParams, useLocation } from "react-router-dom";
import { getEvento } from "../../../services/eventosService"; // Servicio para obtener los datos del evento
import { getPueblo } from "../../../services/pueblosService"; // Servicio para obtener los datos del pueblo
import Map from "./Map"; // Importar el componente del mapa
import { RotatingLines } from 'react-loader-spinner'


const EventoDetails = () => {
  const { id } = useParams(); // Obtener el id del evento desde la URL
  const location = useLocation();
  const [evento, setEvento] = useState(null);
  const [pueblo, setPueblo] = useState(null); // Estado para guardar los datos del pueblo asociado

  // Recuperar datos pasados por query params como fallback
  const searchParams = new URLSearchParams(location.search);
  const titulo = searchParams.get("titulo");
  const tipo = searchParams.get("tipo");
  const descripcion = searchParams.get("descripcion");
  const fecha_inicio = searchParams.get("fecha_inicio");
  const fecha_fin = searchParams.get("fecha_fin");
  const url = searchParams.get("url");
  const latitud = searchParams.get("latitud");
  const longitud = searchParams.get("longitud");

  useEffect(() => {
    // Obtener evento
    const fetchEvento = async () => {
      try {
        const data = await getEvento(id); // Llamada al servicio para obtener los detalles del evento
        setEvento({
          id: data.evento_id,
          titulo: data.titulo,
          tipo: data.tipo,
          descripcion: data.descripcion,
          fecha_inicio: data.fecha_inicio,
          fecha_fin: data.fecha_fin,
          url: data.url,
          latitud: data.latitud, // Coordenadas del evento (si existen)
          longitud: data.longitud, // Coordenadas del evento (si existen)
          pueblo_id: data.pueblo_id, // ID del pueblo asociado
        });
        // Obtener pueblo si el evento tiene un pueblo asociado
        if (data.pueblo_id) {
          const puebloData = await getPueblo(data.pueblo_id);
          setPueblo(puebloData); // Guardamos los datos del pueblo asociado
        }
      } catch (error) {
        console.error("Error al cargar evento:", error);
        setEvento({
          id,
          titulo,
          tipo,
          descripcion,
          fecha_inicio,
          fecha_fin,
          url,
          latitud,
          longitud,
        });
      }
    };

    fetchEvento();
  }, [id]);

  // Si no tenemos datos del evento o del pueblo, mostramos un mensaje
  if (!evento) return <span className="eventos-loading"><RotatingLines
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

  // Determinar las coordenadas a usar
  const lat = evento.latitud || (pueblo && pueblo.latitud); // Si el evento no tiene coordenadas, usar las del pueblo
  const lng = evento.longitud || (pueblo && pueblo.longitud); // Lo mismo para la longitud

  return (
    <div className="evento-details">
      <img className="evento-img" src={evento.pueblo_img} />
      <h2 className="evento-info">{evento.titulo}</h2>
      <p><strong>Tipo:</strong> {evento.tipo}</p>
      <p><strong>Descripción:</strong> {evento.descripcion}</p>
      <p><strong>Fecha de inicio:</strong> {evento.fecha_inicio}</p>
      <p><strong>Fecha de fin:</strong> {evento.fecha_fin}</p>
      {evento.url && (
        <a href={evento.url} target="_blank" rel="noopener noreferrer">Ver Programa</a>
      )}

      {/* Mostrar el nombre del pueblo y la provincia si están disponibles */}
      {pueblo ? (
        <>
          <p className="evento-pueblo-info"><strong>Pueblo:</strong> {pueblo.nombre}</p>
          <p className="evento-pueblo-info"><strong>Provincia:</strong> {pueblo.provincia}</p>
        </>
      ) : (
        <p>No se pudo obtener información del pueblo.</p>
      )}

      {/* Mostrar coordenadas si están disponibles */}
      {lat && lng && (
        <div>
          <p><strong>Ubicación:</strong> Latitud: {lat}, Longitud: {lng}</p>
          {/* Mostrar el mapa con las coordenadas */}
          <Map lat={lat} lng={lng} name={evento.titulo} />
        </div>
      )}

      {/* Si no hay coordenadas disponibles */}
      {(!lat || !lng) && <p>Coordenadas no disponibles</p>}
      {/* Imagen a la derecha */}
      <div className="evento-img-container">
        <img
          src={evento.img_url || evento.pueblo_img || '/default.jpg'}
          alt={evento.titulo}
        />
      </div>
    </div>
  );
};

export default EventoDetails;


//////////////////////BORRAR Y EDITAR///////////////////////////////// No termina de hacerlo
// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../../context/UserContext";
// import { deleteEvento } from "../../../services/eventosService";
// import Map from "./Map";

// const EventoDetailsActions = ({ evento }) => {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();

//   const canEditOrDelete = evento.user_id === user.user_id || user.role === "admin";

//   const handleDelete = async () => {
//     if (window.confirm("¿Deseas eliminar este evento?")) {
//       try {
//         await deleteEvento(evento.evento_id);
//         alert("Evento eliminado");
//         navigate("/eventos"); // volver al listado
//       } catch (err) {
//         alert(err.message);
//       }
//     }
//   };

//   const handleEdit = () => {
//     navigate(`/evento/${evento.evento_id}/edit`);
//   };

//   if (!canEditOrDelete) return null;

//   return (
//     <div className="evento-actions">
//       <button onClick={handleEdit}>Editar</button>
//       <button onClick={handleDelete}>Eliminar</button>
//     </div>
//   );
// };

// export default EventoDetailsActions;
