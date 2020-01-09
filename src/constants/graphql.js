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
