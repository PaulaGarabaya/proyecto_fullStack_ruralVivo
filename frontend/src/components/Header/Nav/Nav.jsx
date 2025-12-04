// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Nav = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className={`nav-bar ${isMenuOpen ? "active" : ""}`}>
//       <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle navigation menu">
//         &#9776;
//       </button>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//         <li>
//           <Link to="/christmaslist">Lista</Link>
//         </li>
//         <li>
//           <Link to="/contact">Contacto</Link>
//         </li>
//         <li>
//           <Link to="/product">Producto</Link>
//         </li>
//         <li>
//           <Link to="/staff">Equipo</Link>
//         </li>
//         <li>
//           <Link to="/topic">Temas</Link>
//         </li>
//         <li>
//           <Link to="/wishlist">Deseos</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Nav;