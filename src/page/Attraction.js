import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import AttractionPhotos from "../components/Attractions";
import Wrapper from "../components/Wrapper";
import styled from "styled-components";

const Select = styled.select`
  background: #fafdfe;
  height: 28px;
  width: 200px;
  padding: 5px;
  line-height: 28px;
  border: 1px solid #9bc0dd;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  margin-top: 20px;
`;

const ScrollTopBtn = styled.button`
  position: fixed;
  bottom: 20px;
  right: 15px;
  z-index: 99;
  font-size: 18px;
  border: 2px solid rgba(43, 2, 125, 0.8);
  outline: none;
  cursor: pointer;
  padding: 15px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  text-align: center;

  :hover {
    color: white;
    background-color: #555;
  }
`;

const GET_REGIONS = gql`
  query GetRegions {
    regions {
      id
      title
    }
  }
`;

const Attraction = () => {
  const [region, setRegion] = useState("All Regions");
  const [topBtnStyle, setTopBtnStyle] = useState("hide");

  const scrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setTopBtnStyle("show");
    } else {
      setTopBtnStyle("hide");
    }
  }
  const onRegionSelected = (e) => {
    setRegion(e.target.value);
  };
  const { loading, error, data } = useQuery(GET_REGIONS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  let altered = [...data.regions];
  altered.unshift({
    __typename: "Region",
    id: "option",
    title: "All Regions",
  });

  return (
    <Wrapper>
      <Select name="region" onChange={onRegionSelected}>
        {altered.map((region) => (
          <option key={region.id} value={region.title}>
            {region.title}
          </option>
        ))}
      </Select>
      <AttractionPhotos region={region} />
      <ScrollTopBtn
        style={
          topBtnStyle === "hide" ? { display: "none" } : { display: "block" }
        }
        onClick={scrollTop}
      >
        Top
      </ScrollTopBtn>
    </Wrapper>
  );
};

export default Attraction;
