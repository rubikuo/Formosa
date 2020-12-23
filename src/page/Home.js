import React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

// const PHOTOS_QUERY = gql`
//   query {

//   }
// `;

const Home = () => {
  return (
    <main>
      <Link to="/about">ABOUT</Link>
    </main>
  );
};

export default Home;
