import React, { useState } from "react";
import { FaStar, FaSortAmountDown } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { UPDATE_FOOD } from "../GraphQL/Mutations";
import styled from "styled-components";

const Label = styled.label`
  postion: relative;
  display: inline-block;
  margin-top: 10px;
`;

const RadioBtn = styled.input`
  &[type="radio"] {
    opacity: 0;
  }
  position: absolute;
  width: 29px;
  height: 29px;
`;

const StarIcon = styled(FaStar)`
  cursor: pointer;
  transition: color 200ms;
`;

const Rating = ({ foodId, foodRating, valueFrom, food, setFood }) => {
  const [updateFood] = useMutation(UPDATE_FOOD);
  const [hover, setHover] = useState(0);
  const [ratings, setRatings] = useState(foodRating);

  return (
    <div className="">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <Label htmlFor="rating" key={i}>
            <RadioBtn
              type="radio"
              name="rating"
              value={valueFrom === "cuisine" ? ratings : food.rating}
              onClick={() => {
                if (valueFrom === "cuisine") {
                  setRatings(ratingValue);
                  updateFood({
                    variables: {
                      data: { rating: ratingValue },
                      where: { id: foodId },
                    },
                  });
                } else {
                  setFood({ ...food, rating: ratingValue });
                }
              }}
              onMouseEnter={() => {
                setHover(ratingValue);
              }}
              onMouseLeave={() => {
                setHover(0);
              }}
            />
            <StarIcon
              className="star"
              color={
                valueFrom === "cuisine"
                  ? ratingValue <= (hover || ratings)
                    ? "#ffc107"
                    : "#e4e5e9"
                  : ratingValue <= (hover || food.rating)
                  ? "#ffc107"
                  : "#e4e5e9"
              }
              size={30}
            />
          </Label>
        );
      })}
    </div>
  );
};

export default Rating;
