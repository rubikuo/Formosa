import React from "react";
import { useQuery } from "@apollo/client";
import { ABOUT_QUERY } from "../GraphQL/Queries";

import styled from "styled-components";

const AboutPage = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  img {
    width: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  div.ctn {
    position: absolute;
    width: 280px;
    font-weight: 500;

    text-shadow: 5px 2px 2px rgba(250, 250, 250, 0.6);
    line-height: 1.5;
  }

  h2 {
    margin-bottom: 10px;
    color: white;
    text-shadow: 5px 2px 2px rgba(0, 0, 0, 0.6);
  }

  .general {
    top: 30%;
    left: 7%;
  }

  .language {
    top: 40%;
    right: 5%;
  }

  .religion {
    top: 65%;
    right: 5%;
  }

  .population {
    top: 20%;
    right: 2%;
  }
`;

const About = () => {
  const { loading, error, data } = useQuery(ABOUT_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <AboutPage>
      {data.abouts.map((about) => {
        return (
          <div className="wrapper" key={about.id}>
            <img src={about.image.url} alt="" />
            <div className="general ctn">
              <h2>General</h2>
              <p>{about.general}</p>
            </div>
            <div className="language ctn">
              <h2>Lanaguage</h2>
              <p>{about.language}</p>
            </div>
            <div className="religion ctn">
              <h2>Religion</h2>
              <p>{about.religion}</p>
            </div>
            <div className="population ctn">
              <h2>Population</h2>
              <p>{about.population}</p>
            </div>
          </div>
        );
      })}
    </AboutPage>
  );
};

export default About;
