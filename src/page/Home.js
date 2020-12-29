import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import MenuCard from "../components/MenuCard";
import styled from "styled-components";

const CardGroup = styled.div`
  width: 90%;
  background-color: red;
`;

const HOME_QUERY = gql`
  query GetHomeInfo {
    homes {
      id
      title
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(HOME_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Link to="/about">ABOUT</Link>
      <CardGroup>
        {data.homes.map((home) => {
          return (
            <Link
              key={home.id}
              to={home.title.toLowerCase().split(" ").join("-")}
            >
              <MenuCard title={home.title} />
            </Link>
          );
        })}
      </CardGroup>
    </div>
  );
};

export default Home;
