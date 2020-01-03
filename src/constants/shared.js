import { LIKE } from '@/constants/graphql'

export const sharedUpdateLike = ($store, $apollo, media) => {
  $store.commit('updateMediaListState', { tid: media.id })

  if (media.state) {
    $apollo.query({
      query: LIKE.GET.ID,
      variables: {
        tid: media.id
      }
    })
    .then(({ data }) => {
      $apollo.mutate({
        mutation: LIKE.REMOVE,
        variables: {
          id: data.likes[0].id
        },
        update: (store) => {
          const data = store.readQuery({ query: LIKE.GET.ALL })
          data.likes = data.likes.filter(like => like.tid !== media.id)
          store.writeQuery({ query: LIKE.GET.ALL, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteLike: {
            __typename: 'Like',
            tid: media.id
          }
        }
      })
      .catch((err) => {
        $store.commit('updateMediaListState', { tid: media.id })
      })
    })
  } else {
    $apollo.mutate({
      mutation: LIKE.ADD,
      variables: {
        tid: media.id
      },
      update: (store, { data: { createLike } }) => {
        const data = store.readQuery({ query: LIKE.GET.ALL })
        data.likes.push(createLike)
        store.writeQuery({ query: LIKE.GET.ALL, data })
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