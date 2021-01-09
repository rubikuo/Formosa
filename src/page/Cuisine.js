import React, { useState } from "react";
import Wrapper from "../components/Wrapper";
import Rating from "../components/Rating";
import { useQuery } from "@apollo/client";
import { GET_ALL_CUISINES } from "../GraphQL/Queries";
import styled from "styled-components";
import AddFood from "../components/AddFood";

const CardsCtn = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  background-color: white;
  margin: 15px;

  align-item: center;
  padding: 25px 0;
  box-shadow: 2px 2px 3px 0px #757575;

  img {
    width: 300px;
    height: 250px;
    object-fit: cover;
    box-shadow: 0px 0px 2px 0px rgb(80, 80, 80, 0.8);
  }
`;

const CardBody = styled.div`
  width: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;

  p {
    margin-top: 10px;
  }
`;

const Cuisine = () => {
  const [food, setFood] = useState({
    title: "",
    description: "",
    rating: 0,
  });
  // the data from useQuery cannot be stored in useState
  const { loading, error, data, refetch } = useQuery(GET_ALL_CUISINES);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Wrapper>
      <h1>Taiwanese Gourmet Cuisine</h1>
      <CardsCtn>
        {data.foods.map((food) => {
          let foodId = food.id;

          return (
            <Card key={food.id}>
              <img src={food.image.url} alt={food.title} />
              <CardBody className="">
                <h3>{food.title}</h3>
                <Rating foodId={foodId} foodRating={food.rating} />
                <p>{food.description}</p>
              </CardBody>
            </Card>
          );
        })}
      </CardsCtn>
      <AddFood food={food} setFood={setFood} refetch={refetch} />
    </Wrapper>
  );
};

export default Cuisine;
