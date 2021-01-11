import React, { useState, useRef } from "react";
import { CREATE_FOOD, PUBLISH_ASSET, PUBLISH_FOOD } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import axios from "axios";
import styled from "styled-components";
import Rating from "../components/Rating";

const AddForm = styled.form`
  width: 30%;
  box-shadow: 0px 2px 14px 4px rgba(115, 115, 115, 1);
  border-radius: 7px;
  position: absolute;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  background-color: #f0f0f0;
  transition: left 0.8s linear;

  input,
  textarea,
  button {
    width: 80%;
    margin: 5px auto;
    padding: 10px;
  }

  input[type="text"] {
    height: 35px;
  }

  textarea {
    height: 80px;
    resize: none;
  }

  input[type="submit"] {
    background-color: #85b4d3;
    border: none;
    :hover {
      background-color: #2d9fe7;
    }
  }

  button {
    border: none;
    color: #535353;
  }
`;

const RatingWrapper = styled.div`
  position: relative;
  input[type="number"] {
    position: absolute;
    top: 0;
    display: none;
  }
`;

const AddFood = ({
  food,
  setFood,
  refetch,
  scrollValue,
  slideToRight,
  setSlideToRight,
}) => {
  const [foodImg, setFoodImg] = useState(null);
  const [publishAsset] = useMutation(PUBLISH_ASSET);
  const [createFood] = useMutation(CREATE_FOOD);
  const [publishFood] = useMutation(PUBLISH_FOOD);

  const fileInputRef = useRef(null);

  const submitFood = (e) => {
    console.log("hello");
    e.preventDefault();

    const newFood = { ...food }; // clone state

    if (foodImg) {
      // upload Photo with axios
      const imgFormData = new FormData();
      imgFormData.append("fileUpload", foodImg);
      axios
        .post(
          "https://api-ap-northeast-1.graphcms.com/v2/ckj06nasg322k01z57vi4cknq/master/upload",
          imgFormData,
          {
            onUploadProgress: (progressEvent) => {
              console.log(
                "Upload Progress " +
                  Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                  ) +
                  "%"
              );
            },
          }
        )
        // after upload image file publish Asset
        .then((res) => {
          console.log(res);
          const imageId = res.data.id;
          // when publishing assets there is no need to pass "to" variable here, only needs to define to in mutation
          publishAsset({
            variables: {
              where: { id: imageId },
            },
            ignoreResults: false,
          });
          return res.data;
        })
        // make post request with createFood Mutation
        .then((imageData) => {
          newFood.image = imageData;
          const image_id = newFood.image.id;
          console.log(newFood);

          createFood({
            variables: {
              data: {
                title: newFood.title,
                description: newFood.description,
                rating: newFood.rating,
                image: {
                  connect: { id: image_id },
                },
              },
            },
            // after post requst, publishFood
          }).then((res) => {
            console.log("newfoodId", res.data.createFood);
            newFood.id = res.data.createFood.id;
            const newFoodId = newFood.id;

            publishFood({
              variables: {
                where: { id: newFoodId },
              },
            }).then((res) => {
              console.log("resFromFoodPublished", res);
              refetch(); // after post graphql needs to refetch the data, otherwise the frontend wont update
            });
            setSlideToRight(false);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (e) => {
    setFood((food) => ({
      ...food,
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value,
    }));
  };

  const handleSelectedFile = (e) => {
    setFoodImg(e.target.files[0]);
  };

  return (
    <AddForm
      style={
        slideToRight
          ? { top: `${scrollValue + 200}px`, left: 0 }
          : { top: `${scrollValue + 200}px`, left: "-30%" }
      }
      onSubmit={(e) => {
        submitFood(e);
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={food.title}
        required
        name="title"
        onChange={(e) => handleChange(e)}
      />

      <RatingWrapper>
        <Rating
          className="rating"
          valueFrom="addFood"
          food={food}
          setFood={setFood}
        />

        <input
          type="number"
          placeholder="Rating"
          value={parseInt(food.rating)}
          name="rating"
          min={0}
          max={5}
          required
          onChange={(e) => handleChange(e)}
        />
      </RatingWrapper>
      <textarea
        type="text"
        placeholder="Description"
        value={food.description}
        name="description"
        required
        onChange={(e) => handleChange(e)}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleSelectedFile(e)}
      />

      <input type="submit" value="Add Food" />
      <button
        type="button"
        onClick={() => {
          setSlideToRight(false);
          setFood({ ...food, title: "", description: "", rating: 0 });
        }}
      >
        Cancel
      </button>
    </AddForm>
  );
};

export default AddFood;
