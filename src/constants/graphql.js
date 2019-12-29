import gql from 'graphql-tag'

export const LIKE = {
  ALL: gql`
    query likes {
      likes {
        tid
      }
    }
  `,
  ADD: gql`
    mutation createLike (
      $tid: String
    ) {
      createLike ( data: {
        tid: $tid
      }) {
        tid
      }
    }
  `,
  REMOVE: gql`
    mutation deleteManyLikes (
      $tid: String
    ) {
      deleteManyLikes ( where: {
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
