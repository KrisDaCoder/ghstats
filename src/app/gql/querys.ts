import gql from 'graphql-tag';

const GET_ACCOUNT_INFO = gql`
  query GetAccountInfoQuery($username: String!) {
    repositoryOwner(login: $username) {
      login
      ... on User {
        avatarUrl
        repositories {
          totalCount
        }
        name
        bio
        followers {
          totalCount
        }
        following {
          totalCount
        }
        company
        email
        location
      }
      url
    }
  }
`;

const GET_USERS = gql`
  query MyQuery($searchText: String!) {
    search(query: $searchText, type: USER, first: 3) {
      edges {
        node {
          ... on User {
            login
            avatarUrl
            name
          }
        }
      }
    }
  }
`;

export { GET_ACCOUNT_INFO, GET_USERS };
