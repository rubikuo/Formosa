import React from "react";
import Wrapper from "../components/Wrapper";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_CUISINES = gql`
  query GetAllCuisines {
    foods {
      id
      title
      description
      image {
        id
        url
      }
    }
  }
`;

const Cuisine = () => {
  const { loading, error, data } = useQuery(GET_ALL_CUISINES);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data.foods);
  return (
    <Wrapper>
      <h1>Taiwanese Gourmet Cuisine</h1>
    </Wrapper>
  );
};

export default Cuisine;
