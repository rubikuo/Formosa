import React, { useState, useRef } from "react";
// import { CREATE_FOOD } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import axios from "axios";

const AddFood = () => {
  const [food, setFood] = useState({
    title: "",
    description: "",
    rating: 0,
  });
  const [foodImg, setFoodImg] = useState(null);
  // const [title, setTitle] = useState("");
  // const [fileName, setFileName] = useState(null);
  // const [desc, setDesc] = useState("");
  // const [rating, setRating] = useState(0);
  const fileInputRef = useRef(null);
  const submitFood = (e) => {
    console.log("hello");
    e.preventDefault();
    const newFood = { ...food };
    // console.log("newFood", newFood);
    // console.log("before", foodImg);
    if (foodImg) {
      console.log("after", foodImg);
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
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (e) => {
    setFood((food) => ({
      ...food,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectedFile = (e) => {
    setFoodImg(e.target.files[0]);
  };

  // const [createFood, { error }] = useMutation(CREATE_FOOD);

  // const addFood = () =>
  //   createFood({
  //     variables: {
  //       data: {
  //         title: title,
  //         fileName: fileName,
  //         description: desc,
  //         rating: rating,
  //       },
  //     },
  //   });

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
