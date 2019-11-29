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
