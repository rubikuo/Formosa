import React, { useState } from "react";
import Wrapper from "../components/Wrapper";
import { gql, useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";

const GET_ALL_CUISINES = gql`
  query GetAllCuisines {
    foods {
      id
      title
      description
      rating
      image {
        id
        url
      }
    }
  }
`;

const ADD_RATING = gql`
  mutation AddRating($id: String!, $rating: Number!) {
    addRating(id: $id, rating: $rating) {
      id
      rating
    }
  }
`;

const UPDATE_FOOD = gql`
  mutation UpdateFood($where: FoodWhereUniqueInput!, $data: FoodUpdateInput!) {
    updateFood(where: $where, data: $data) {
      id
      rating
    }
  }
`;

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
  const [inputValue, setInputValue] = useState(0);
  const { loading, error, data } = useQuery(GET_ALL_CUISINES);
  const [updateFood] = useMutation(UPDATE_FOOD);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data.foods);

  return (
    <Wrapper>
      <h1>Taiwanese Gourmet Cuisine</h1>
      <CardsCtn>
        {data.foods.map((food) => {
          let foodId = food.id;
          console.log(foodId);
          console.log(food.rating);

          const updateValue = (e) => {
            console.log("value", e.target.value);
            setInputValue(parseInt(e.target.value));
          };

          return (
            <Card key={food.id}>
              <img src={food.image.url} alt={food.title} />
              <CardBody className="">
                <h3>{food.title}</h3>
                <h3>{food.rating}</h3>
                <p>{food.description}</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    updateFood({
                      variables: {
                        data: { rating: inputValue },
                        where: { id: foodId },
                      },
                    });
                    setInputValue(0);
                  }}
                >
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => updateValue(e)}
                  />
                  <button type="submit">Update Rating</button>
                </form>
              </CardBody>
            </Card>
          );
        })}
      </CardsCtn>
    </Wrapper>
  );
};

export default Cuisine;
