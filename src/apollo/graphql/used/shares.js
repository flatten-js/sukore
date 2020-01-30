import { LIKE, FAVE } from '@/apollo/graphql'

export const shareUpdateLike = ($store, $apollo, iid, media) => {
  const querys = { query: LIKE.ALL, variables: { iid } }

  $store.commit('updateMediaListState', { tid: media.id })

  if (media.state) {
    $apollo.mutate({
      mutation: LIKE.DIS_CONNECT,
      variables: {
        iid,
        tid: media.id
      },
      update: (store) => {
        const data = store.readQuery(querys)
        data.likes = data.likes.filter(like => like.tid !== media.id)
        store.writeQuery({ ...querys, data })
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateLike: {
          __typename: 'Like',
          tid: media.id,
          data: media
        }
      }
    })
    .catch(() => {
      $store.commit('updateMediaListState', { tid: media.id })
    })
  } else {
    $apollo.mutate({
      mutation: LIKE.UPSERT,
      variables: {
        iid,
        tid: media.id,
        data: media
      },
      update: (store, { data: { upsertLike } }) => {
        const data = store.readQuery(querys)
        data.likes.push(upsertLike)
        store.writeQuery({ ...querys, data })
      },
      optimisticResponse: {
        __typename: 'Mutation',
        upsertLike: {
          __typename: 'Like',
          tid: media.id,
          data: media
        }
      }
    })
    .catch(() => {
      $store.commit('updateMediaListState', { tid: media.id })
    })
  }
}

export const shareUpdateFave = ($store, $apollo, iid, user) => {
  const querys = { query: FAVE.ALL, variables: { iid } }

  $store.commit('updateFave')

  if (user.fave) {
    $apollo.mutate({
      mutation: FAVE.DIS_CONNECT,
      variables: {
        iid,
        uid: user.id
      },
      update: (store) => {
        const data = store.readQuery(querys)
        data.faves = data.faves.filter(fave => fave.uid !== user.id)
        store.writeQuery({ ...querys, data })
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateFave: {
          __typename: 'Fave',
          uid: user.id
        }
      }
    })
    .catch(() => {
      $store.commit('updateFave')
    })
  } else {
    $apollo.mutate({
      mutation: FAVE.UPSERT,
      variables: {
        iid,
        uid: user.id
      },
      update: (store, { data: { upsertFave } }) => {
        const data = store.readQuery(querys)
        data.faves.push(upsertFave)
        store.writeQuery({ ...querys, data })
      },
      optimisticResponse: {
        __typename: 'Mutation',
        upsertFave: {
          __typename: 'Fave',
          uid: user.id
        }
      }
    })
    .catch(() => {
      $store.commit('updateFave')
    })
  }
}
