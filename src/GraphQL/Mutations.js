import { gql } from "@apollo/client";

export const UPDATE_FOOD = gql`
  mutation UpdateFood($where: FoodWhereUniqueInput!, $data: FoodUpdateInput!) {
    updateFood(where: $where, data: $data) {
      id
      rating
    }
  }
`;

export const PUBLISH_ASSET = gql`
  mutation PublishAsset(
    $where: AssetWhereUniqueInput!
    $to: [Stage!]! = [PUBLISHED]
  ) {
    publishAsset(where: $where, to: $to) {
      id
    }
  }
`;

export const CREATE_FOOD = gql`
  mutation CreateFood($data: FoodCreateInput!) {
    createFood(data: $data) {
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

export const PUBLISH_FOOD = gql`
  mutation PublishFood(
    $where: FoodWhereUniqueInput!
    $to: [Stage!]! = [PUBLISHED]
  ) {
    publishFood(where: $where, to: $to) {
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
