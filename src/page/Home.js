import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import MenuCard from "../components/MenuCard";
import styled from "styled-components";

const CardGroup = styled.div`
  width: 100%;
  display: flex;
  margin: 20px auto;
  align-items: center;
  height: 90vh;

  a {
    width: 30%;
    display: inline-block;
  }
`;

const HOME_QUERY = gql`
  query GetHomeInfo {
    homes {
      id
      title
      image {
        id
        url
      }
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(HOME_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
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
    </div>
  );
};

export default Home;
