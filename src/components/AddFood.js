import React, { useState, useRef } from "react";
import { CREATE_FOOD, PUBLISH_ASSET, PUBLISH_FOOD } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import axios from "axios";

const AddFood = ({ food, setFood, refetch }) => {
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
    <form
      onSubmit={(e) => {
        submitFood(e);
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={food.title}
        required
        name="title"
        onChange={(e) => handleChange(e)}
      />

      <input
        type="number"
        placeholder="rating"
        value={parseInt(food.rating)}
        name="rating"
        min={0}
        max={5}
        required
        onChange={(e) => handleChange(e)}
      />
      <input
        type="text"
        placeholder="description"
        value={food.description}
        name="description"
        required
        onChange={(e) => handleChange(e)}
      />
      <input
        style={{ display: "none" }}
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleSelectedFile(e)}
      />
      <button onClick={() => fileInputRef.current.click()}>Choose Image</button>
      <input type="submit" value="Add" />
    </form>
  );
};

export default AddFood;
