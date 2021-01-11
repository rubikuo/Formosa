import React, { useState } from "react";
import Wrapper from "../components/Wrapper";
import Rating from "../components/Rating";
import { useQuery } from "@apollo/client";
import { GET_ALL_CUISINES } from "../GraphQL/Queries";
import styled from "styled-components";
import AddFood from "../components/AddFood";
import { FcAddDatabase } from "react-icons/fc";

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

const Ctn = styled.div`
  width: 100%;
  position: relative;
  z-index: 0;

  button#addBtn {
    position: absolute;
    left: 10px;
    width: 70px;
    height: 70px;
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    border: none;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0px 0px 0px 3px rgba(43, 2, 125, 0.5);

    :active {
      outline: none;
    }
    :hover {
      background-color: rgb(43, 2, 125);
    }
  }
`;

const Food = () => {
  const [food, setFood] = useState({
    title: "",
    description: "",
    rating: 0,
  });

  const [scrollValue, setScrollValue] = useState(0);
  const [slideToRight, setSlideToRight] = useState(false);

  window.onscroll = () => {
    console.log(document.documentElement.scrollTop);
    setScrollValue(document.documentElement.scrollTop);
  };
  // the data from useQuery cannot be stored in useState
  const { loading, error, data, refetch } = useQuery(GET_ALL_CUISINES);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Ctn>
      <div>
        <button
          id="addBtn"
          title="Add food"
          style={
            slideToRight
              ? { top: `${scrollValue + 210}px`, display: "none" }
              : { top: `${scrollValue + 210}px`, display: "inline-block" }
          }
          onClick={() => {
            setSlideToRight(true);
          }}
        >
          <FcAddDatabase />
        </button>
        <AddFood
          food={food}
          setFood={setFood}
          refetch={refetch}
          scrollValue={scrollValue}
          slideToRight={slideToRight}
          setSlideToRight={setSlideToRight}
        />
      </div>
      <Wrapper>
        <CardsCtn>
          {[...data.foods].reverse().map((food) => {
            let foodId = food.id;

            return (
              <Card key={food.id}>
                <img src={food.image.url} alt={food.title} />
                <CardBody className="">
                  <h3>{food.title}</h3>
                  <Rating
                    foodId={foodId}
                    foodRating={food.rating}
                    valueFrom="cuisine"
                  />
                  <p>{food.description}</p>
                </CardBody>
              </Card>
            );
          })}
        </CardsCtn>
      </Wrapper>
    </Ctn>
  );
};

export default Food;
