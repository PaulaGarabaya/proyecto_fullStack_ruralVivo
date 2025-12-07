import { useState, useEffect } from "react";
import { createEvento } from "../../../services/eventosService";
import { getPueblos } from "../../../services/pueblosService";
import './CreateEvent.css'

const CreateEvento = () => {
  const [pueblos, setPueblos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    pueblo_id: "",
    titulo: "",
    tipo: "fiesta",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    url: ""
  });

  useEffect(() => {
    const fetchPueblos = async () => {
      try {
        const data = await getPueblos();
        setPueblos(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los pueblos");
      }
    };

    fetchPueblos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMensaje(null);

    try {
      const response = await createEvento({
        ...formData,
        pueblo_id: Number(formData.pueblo_id),
      });

      setMensaje(`Evento creado correctamente con ID: ${response.evento_id}`);

      setFormData({
        pueblo_id: "",
        titulo: "",
        tipo: "fiesta",
        descripcion: "",
        fecha_inicio: "",
        fecha_fin: "",
        url: ""
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-evento-container">
      <h2>Crear Evento</h2>

      {mensaje && <p className="success">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>

        <label>Pueblo</label>
        <select
          name="pueblo_id"
          value={formData.pueblo_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un pueblo</option>
          {pueblos.map((p) => (
            <option key={p.pueblo_id} value={p.pueblo_id}>
              {p.nombre}
            </option>
          ))}
        </select>

        <label>Título</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />

        <label>Tipo</label>
        <select name="tipo" value={formData.tipo} onChange={handleChange}>
          <option value="fiesta">Fiesta</option>
          <option value="evento_cultural">Evento Cultural</option>
          <option value="otro">Otro</option>
        </select>

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />

        <label>Fecha Inicio</label>
        <input
          type="date"
          name="fecha_inicio"
          value={formData.fecha_inicio}
          onChange={handleChange}
        />

        <label>Fecha Fin</label>
        <input
          type="date"
          name="fecha_fin"
          value={formData.fecha_fin}
          onChange={handleChange}
        />

        <label>URL</label>
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Evento"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvento;
