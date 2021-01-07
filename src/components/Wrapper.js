import React from "react";
import styled from "styled-components";

const PageCtn = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  background-color: transparent;
`;

const Wrapper = (props) => {
  return <PageCtn>{props.children}</PageCtn>;
};

export default Wrapper;
