import gql from 'graphql-tag'

export const LIKE = {
  ALL: gql`
    query likes (
      $iid: String!
    ) {
      likes (
        where: {
          usrs_some: {
            iid: $iid
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
      $iid: String!
      $tid: String!
      $data: Json!
    ) {
      upsertLike (
        where: {
          tid: $tid
        }
        upsert: {
          create: {
            tid: $tid
            data: $data
            usrs: {
              connect: {
                iid: $iid
              }
            }
          }
          update: {
            usrs: {
              connect: {
                where: {
                  iid: $iid
                }
              }
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
      $iid: String!
      $tid: String!
    ) {
      updateLike (
        data: {
          usrs: {
            disconnect: {
              iid: $iid
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
      $iid: String!
    ) {
      faves (
        where: {
          usrs_some: {
            iid: $iid
          }
        }
      ) {
        uid
      }
    }
  `,
  UPSERT: gql`
    mutation upsertFave (
      $iid: String!
      $uid: String!
    ) {
      upsertFave (
        where: {
          uid: $uid
        }
        upsert: {
          create: {
            uid: $uid
            usrs: {
              connect: {
                iid: $iid
              }
            }
          }
          update: {
            usrs: {
              connect: {
                where: {
                  iid: $iid
                }
              }
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
      $iid: String!
      $uid: String!
    ) {
      updateFave (
        data: {
          usrs: {
            disconnect: {
              iid: $iid
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
