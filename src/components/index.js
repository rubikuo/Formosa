import gql from "graphql-tag";

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

export default ABOUT_QUERY;
