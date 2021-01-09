import { gql } from "@apollo/client";

export const HOME_QUERY = gql`
  query GetHomeInfo {
    homes {
      id
      title
      image {
        id
        url
      }
    }
  }
`;

export const GET_ALL_PHOTOS = gql`
  query GetAllphotos {
    attractions {
      title
      id
      image {
        id
        fileName
        url
      }
      region {
        title
      }
    }
  }
`;

export const GET_DETAIL = gql`
  query GetDetail($id: ID!) {
    attraction(where: { id: $id }) {
      id
      image {
        url
      }
      title
      description
    }
  }
`;

export const GET_ALL_CUISINES = gql`
  query GetAllCuisines {
    foods {
      id
      title
      description
      rating
      image {
        id
        url
      }
    }
  }
`;
