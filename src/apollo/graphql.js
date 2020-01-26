import gql from 'graphql-tag'

export const LIKE = {
  ALL: gql`
    query likes (
      $screenName: String!
    ) {
      likes (
        where: {
          usrs_some: {
            screenName: $screenName
          }
        }
      ) {
        tid
        data
      }
    }
  `,
  UPSERT: gql`
    mutation upsertLike (
      $screenName: String!
      $tid: String!
      $data: Json!
    ) {
      upsertLike (
        where: {
          tid: $tid
        }
        create: {
          tid: $tid
          data: $data
          usrs: {
            connect: {
              screenName: $screenName
            }
          }
        }
        update: {
          usrs: {
            connect: {
              screenName: $screenName
            }
          }
        }
      ) {
        tid
        data
      }
    }
  `,
  DIS_CONNECT: gql`
    mutation updateLike (
      $screenName: String!
      $tid: String!
    ) {
      updateLike (
        data: {
          usrs: {
            disconnect: {
              screenName: $screenName
            }
          }
        }
        where: {
          tid: $tid
        }
      ) {
        tid
        data
      }
    }
  `
}

export const FAVE = {
  ALL: gql`
    query faves (
      $screenName: String!
    ) {
      faves (
        where: {
          usrs_some: {
            screenName: $screenName
          }
        }
      ) {
        uid
      }
    }
  `,
  UPSERT: gql`
    mutation upsertFave (
      $screenName: String!
      $uid: String!
    ) {
      upsertFave (
        where: {
          uid: $uid
        }
        create: {
          uid: $uid
          usrs: {
            connect: {
              screenName: $screenName
            }
          }
        }
        update: {
          usrs: {
            connect: {
              screenName: $screenName
            }
          }
        }
      ) {
        uid
      }
    }
  `,
  DIS_CONNECT: gql`
    mutation updateFave (
      $screenName: String!
      $uid: String!
    ) {
      updateFave (
        data: {
          usrs: {
            disconnect: {
              screenName: $screenName
            }
          }
        }
        where: {
          uid: $uid
        }
      ) {
        uid
      }
    }
  `
}
