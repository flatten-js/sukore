import gql from 'graphql-tag'

export const LIKE = {
  ALL: gql`
    query likes {
      likes {
        tid
        data
      }
    }
  `,
  ADD: gql`
    mutation createLike (
      $tid: String
      $data: Json
    ) {
      createLike ( data: {
        tid: $tid
        data: $data
      }) {
        tid
        data
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
