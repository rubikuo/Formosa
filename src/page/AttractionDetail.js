import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_DETAIL } from "../GraphQL/Queries";
import styled from "styled-components";

const DetailPage = styled.div`
  width: 100%;
  min-height: calc(100% - 10vh);
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 100px;
  flex-wrap: wrap;
`;

const Image = styled.img`
  width: 350px;
  height: 350px;
  margin: 20px auto 40px auto;
  border-radius: 2%;
`;

const Container = styled.div`
  width: 350px;
  padding: 20px 10px;
  max-width: 400px;
  font-weight: 500;
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
        <h2 style={{ marginBottom: "30px" }}>{data.attraction.title}</h2>
        <p>{data.attraction.description}</p>
      </Container>
    </DetailPage>
  );
};

export default AttractionDetail;
