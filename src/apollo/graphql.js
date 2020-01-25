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
      deleteManyLikes (where: {
        tid: $tid
      }) {
        count
      }
    }
  `
}

export const FAVE = {
  ALL: gql`
    query faves {
      faves {
        screenName
      }
    }
  `,
  ADD: gql`
    mutation createFave (
      $screenName: String!
    ) {
      createFave (data: {
        screenName: $screenName
      }) {
        screenName
      }
    }
  `,
  REMOVE: gql`
    mutation deleteManyFaves (
      $screenName: String
    ) {
      deleteManyFaves (where: {
        screenName: $screenName
      }) {
        count
      }
    }
  `
}
