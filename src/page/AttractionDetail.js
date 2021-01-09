import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_DETAIL } from "../GraphQL/Queries";
import styled from "styled-components";

const DetailPage = styled.div`
  width: 100%;
  display: flex;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
`;

const Container = styled.div`
  width: 40%;
  max-width: 400px;
`;

const AttractionDetail = () => {
  const paramId = useLocation().pathname.slice(13);
  console.log("paramId", paramId);
  const { loading, error, data } = useQuery(GET_DETAIL, {
    variables: { id: paramId },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data);
  return (
    <DetailPage>
      <Image src={data.attraction.image.url} alt="" />
      <Container>
        <h2>{data.attraction.title}</h2>
        <p>{data.attraction.description}</p>
      </Container>
    </DetailPage>
  );
};

export default AttractionDetail;
