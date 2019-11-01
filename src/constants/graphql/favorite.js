import gql from 'graphql-tag'

export const ALL_FAVORITE = gql`
  query favorites {
    favorites {
      tid
    }
  }
`

export const ADD_FAVORITE = gql`
  mutation createFavorite (
    $tid: String
  ) {
    createFavorite ( data: {
      tid: $tid
    }) {
      id
    }
  }
`

export const REMOVE_FAVORITE = gql`
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
