// app.js
const express = require("express");
const cors = require('cors');
const cowsay = require("cowsay");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
//const swaggerSpec = require("./config/swagger");

require("dotenv").config();
require("./src/config/googleAuth"); // Passport Google Strategy

// ========================================================== INICIALIZACIÓN ==========================================================
const app = express();
// Permitir solicitudes desde cualquier origen (solo desarrollo)

// CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
// Middleware para JSON
app.use(express.json());

// Configurar puerto con valor por defecto
const port = process.env.PORT || 3000;

// ========================================================== MIDDLEWARES ==========================================================
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));
app.use(cookieParser());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ========================================================== RUTAS ==========================================================
// Importar rutas
const authRoutes = require('./src/routes/authRoutes');
// const userRoutes = require('./routes/user.routes');
const pueblosRoutes = require('./src/routes/pueblosRoutes');
const eventosRoutes = require('./src/routes/eventosRoutes');
const favoritosRoutes = require('./src/routes/favoritosRoutes');

app.use('/api', authRoutes);
// app.use(userRoutes);
app.use(pueblosRoutes);
app.use(eventosRoutes);
app.use(favoritosRoutes);
// ========================================================== RUTA RAÍZ ==========================================================
app.get("/", (req, res) => {
  if (req.user) {
    return res.redirect("/dashboard");
  }
  res.redirect("/signup");
});

// ========================================================== MANEJO DE ERRORES ==========================================================
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    message: `La ruta ${req.originalUrl} no existe en este servidor`,
  });
});

app.use((error, req, res, next) => {
  console.error("Error global:", error);
  res.status(500).json({
    error: "Error interno del servidor",
    message: error.message,
  });
});

// ========================================================== INICIAR SERVIDOR ==========================================================
// SOLO UNA llamada a app.listen() - dentro de connectDB
app.listen(port, () => {
    console.log(`Servidor funcionando en puerto ${port}`);
    console.log(
    cowsay.say({
        text: `Movie App funcionando en http://localhost:3000`,
        f: "owl",
    })
    );
});



module.exports = app;
