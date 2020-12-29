import React, { useState } from "react";

import { gql, useQuery } from "@apollo/client";
import AttractionPhotos from "../components/Attractions";
import Wrapper from "../components/Wrapper";
import styled, { css } from "styled-components";

const GET_REGIONS = gql`
  query GetRegions {
    regions {
      id
      title
    }
  }
`;

const Attraction = () => {
  const [region, setRegion] = useState("Select Region");
  const { loading, error, data } = useQuery(GET_REGIONS);
  const onRegionSelected = (e) => {
    setRegion(e.target.value);
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  let altered = [...data.regions];
  altered.unshift({
    __typename: "Region",
    id: "option",
    title: "Select Region",
  });

  return (
    <Wrapper>
      <h1>Attractions</h1>
      <select name="region" onChange={onRegionSelected}>
        {altered.map((region) => (
          <option key={region.id} value={region.title}>
            {region.title}
          </option>
        ))}
      </select>
      <AttractionPhotos region={region} />
    </Wrapper>
  );
};

export default Attraction;
