import React from "react";
import Nav from "./Nav";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-logo">Rural Vivo 🌾🏡 </h1>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
