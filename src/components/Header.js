import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HEADER = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100000;
  height: 10vh;
  background-color: ghostwhite;
  display: flex;
  align-items: center;
`;

const LinkCtn = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <HEADER>
      <h1>Le Voyage de Formosa</h1>
      <LinkCtn>
        <NavLink
          exact={true}
          activeStyle={{
            fontWeight: "bold",
            color: "deeppink",
          }}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          activeStyle={{
            fontWeight: "bold",
            color: "deeppink",
          }}
          to="/about-taiwan"
        >
          About Taiwan
        </NavLink>
        <NavLink
          activeStyle={{
            fontWeight: "bold",
            color: "deeppink",
          }}
          to="/attractions"
        >
          Attractions
        </NavLink>
        <NavLink
          activeStyle={{
            fontWeight: "bold",
            color: "deeppink",
          }}
          to="/food"
        >
          Food
        </NavLink>
      </LinkCtn>
    </HEADER>
  );
};

export default Header;
