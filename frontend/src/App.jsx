import './App.css'
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Pueblos from "./components/Main/Pueblos"
import PuebloDetails from "./components/Main/PueblosDetalle";
import Eventos from './components/Main/Eventos';  // Componente para la lista de eventos
import EventoDetails from './components/Main/EventosDetalle'; // Componente para el detalle de un evento
import Singup from './components/Main/Singup';
import Login from './components/Main/Login';
import CrearEventos from './components/Main/CreateEvent';
import Favoritos from './components/Main/Favoritos';
// import Home from './components/Main/Home';
import Profile from './components/Main/Profile';


function App() {
  return (
    <>
      {/* Header global */}
      <Header />

      {/* Definición de rutas */}
      <Routes>
        {/* Ruta para la lista de pueblos */}
        <Route 
          path="/pueblos"
          element={
            <>
              <Main />
              <Pueblos />
            </>
          }
        />
        
        {/* Ruta para el detalle de un pueblo */}
        <Route path="/pueblo/:id" element={<PuebloDetails />} />

        {/* Ruta para la lista de eventos */}
        <Route 
          path="/eventos"
          element={
            <>
              <Main />
              <Eventos /> {/* Aquí renderizas la lista de eventos */}
            </>
          }
        />

        {/* Ruta para el detalle de un evento */}
        <Route path="/evento/:id" element={<EventoDetails />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crear-eventos" element={<CrearEventos />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/profile" element={<Profile />} />

        {/* <Route path="/" element={<Home />} /> */}
      </Routes>

      {/* Footer global */}
      <Footer />
    </>
  );
}
export default App
