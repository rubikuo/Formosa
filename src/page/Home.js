import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { HOME_QUERY } from "../GraphQL/Queries";
import { Link } from "react-router-dom";
import MenuCard from "../components/MenuCard";
import styled from "styled-components";

const CardGroup = styled.div`
  width: 90%;
  min-height: 90vh;
  display: flex;
  margin: 20px auto;
  align-items: center;
  flex-wrap: wrap;

  Link {
    width: 30%;
    display: inline-block;
    background-color: red;
    color: purple;
  }
`;

const Home = () => {
  const location = useLocation();
  console.log(location);
  // fetch query data
  const { loading, error, data } = useQuery(HOME_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <CardGroup>
      {data.homes.map((home) => {
        return (
          <Link
            key={home.id}
            to={home.title.toLowerCase().split(" ").join("-")}
          >
            <MenuCard title={home.title} imageUrl={home.image.url} />
          </Link>
        );
      })}
    </CardGroup>
  );
};

export default Home;
