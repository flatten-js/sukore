import gql from 'graphql-tag'

export const LIKE = {
  GET: {
    ALL: gql`
      query likes {
        likes {
          tid
        }
      }
    `,
    ID: gql`
      query likes (
        $tid: String
      ) {
        likes (where: {
          tid: $tid
        }) {
          id
        }
      }
    `
  },
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
    mutation deleteLike (
      $id: ID
    ) {
      deleteLike (where: {
        id: $id
      }) {
        tid
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
