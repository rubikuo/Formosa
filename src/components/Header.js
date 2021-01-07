import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Le Voyage de Formosa</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about-taiwan">About Taiwan</Link>
        <Link to="/attractions">Attractions</Link>
        <Link to="/gourmet-cuisine">Gourmet Cuisine</Link>
      </div>
    </header>
  );
};

export default Header;
