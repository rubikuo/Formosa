import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
const ABOUT_QUERY = gql`
  query {
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
  return (
    <Query query={ABOUT_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <h1>Fetching data...</h1>;
        if (error) return <h1>Error occured...</h1>;

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
      }}
    </Query>
  );
};

export default About;
