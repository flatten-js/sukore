import gql from 'graphql-tag'

export const ALL_FAVORITE = gql`
  query favorites {
    favorites {
      tid
    }
  }
`
