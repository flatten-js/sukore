import { LIKE } from '@/apollo/graphql'

export const sharedUpdateLike = ($store, $apollo, media) => {
  $store.commit('updateMediaListState', { tid: media.id })

  if (media.state) {
    $apollo.mutate({
      mutation: LIKE.REMOVE,
      variables: {
        tid: media.id
      },
      update: (store) => {
        const data = store.readQuery({ query: LIKE.ALL })
        data.likes = data.likes.filter(like => like.tid !== media.id)
        store.writeQuery({ query: LIKE.ALL, data })
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteManyLikes: {
          __typename: 'Like',
          count: 0
        }
      }
    })
    .catch(() => {
      $store.commit('updateMediaListState', { tid: media.id })
    })
  } else {
    $apollo.mutate({
      mutation: LIKE.ADD,
      variables: {
        tid: media.id
      },
      update: (store, { data: { createLike } }) => {
        const data = store.readQuery({ query: LIKE.ALL })
        data.likes.push(createLike)
        store.writeQuery({ query: LIKE.ALL, data })
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createLike: {
          __typename: 'Like',
          tid: media.id
        }
      }
    })
    .catch(() => {
      $store.commit('updateMediaListState', { tid: media.id })
    })
  }
}
