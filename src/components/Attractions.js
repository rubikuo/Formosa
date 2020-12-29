import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import styled from "styled-components";

const GET_ALL_PHOTOS = gql`
  query GetAllphotos {
    attractions {
      id
      image {
        id
        fileName
        url
      }
      region {
        title
      }
    }
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;

  img {
    width: 250px;
    height: 250px;
    margin: 10px;
  }
`;

const AttractionPhotos = ({ region }) => {
  const { loading, error, data } = useQuery(GET_ALL_PHOTOS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data.attractions);
  let render;

  if (
    region === "Select Region" &&
    data !== null &&
    data.attractions !== null
  ) {
    render = data.attractions.map((attraction) => {
      return (
        <Link to={`/attractions/${attraction.id}`}>
          <img
            src={attraction.image.url}
            key={attraction.image.id}
            alt="picture"
          />
        </Link>
      );
    });
  } else {
    render = data.attractions
      .filter(
        (att) =>
          att.region.title === region && att.region.title !== "Select Region"
      )
      .map((attraction) => {
        return (
          <Link to={`/attractions/${attraction.id}`}>
            <img
              src={attraction.image.url}
              key={attraction.image.id}
              alt="picture"
            />
          </Link>
        );
      });
  }

  return <Container>{render}</Container>;
};

export default AttractionPhotos;
