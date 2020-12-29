import React from "react";
import styled from "styled-components";

const PageCtn = styled.div`
  width: 100%;
  background: grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
`;

const Wrapper = (props) => {
  return <PageCtn>{props.children}</PageCtn>;
};

export default Wrapper;
