import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const GET_ALL_PHOTOS = gql`
  query GetAllphotos {
    attractions {
      title
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  background-color: white;
  margin: 15px;

  align-items: center;
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
        <Link key={attraction.id} to={`/attractions/${attraction.id}`}>
          <Card>
            <img
              src={attraction.image.url}
              key={attraction.image.id}
              alt={attraction.title}
            />
            <CardBody className="">
              <h3>{attraction.title}</h3>
            </CardBody>
          </Card>
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
            <Card>
              <img
                src={attraction.image.url}
                key={attraction.image.id}
                alt={attraction.title}
              />
              <CardBody className="">
                <h3>{attraction.title}</h3>
              </CardBody>
            </Card>
          </Link>
        );
      });
  }

  return <Container>{render}</Container>;
};

export default AttractionPhotos;
