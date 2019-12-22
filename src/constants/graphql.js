import gql from 'graphql-tag'

export const FAVORITE = {
  ALL: gql`
    query favorites {
      favorites {
        tid
      }
    }
  `,
  ADD: gql`
    mutation createFavorite (
      $tid: String
    ) {
      createFavorite ( data: {
        tid: $tid
      }) {
        tid
      }
    }
  `,
  REMOVE: gql`
    mutation deleteManyFavorites (
      $tid: String
    ) {
      deleteManyFavorites ( where: {
        tid: $tid
      }) {
        count
      }
    }
  `
}

export const HOME_USER = {
  ALL: gql`
    query homeUsers {
      homeUsers {
        screenName
      }
    }
  `,
  ADD: gql`
    mutation createHomeUser (
      $screenName: String!
    ) {
      createHomeUser (data: {
        screenName: $screenName
      }) {
        screenName
      }
    }
  `,
  REMOVE: gql`
    mutation deleteManyHomeUsers (
      $screenName: String
    ) {
      deleteManyHomeUsers (where: {
        screenName: $screenName
      }) {
        count
      }
    }
  `
}
