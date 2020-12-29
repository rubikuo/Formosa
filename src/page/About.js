import React from "react";

import { useQuery, gql } from "@apollo/client";

const ABOUT_QUERY = gql`
  query GetAboutInfo {
    abouts {
      id
      image {
        fileName
        url
      }
    }
  }
`;

const About = () => {
  const { loading, error, data } = useQuery(ABOUT_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.abouts.map((about) => {
        return (
          <div key={about.id}>
            <img src={about.image.url} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default About;
