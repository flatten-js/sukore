import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:screenName',
      component: () => import('@/views/User'),
      props: route => ({
        screenName: route.params.screenName
      }),
      children: [
        {
          path: '',
          component: () => import('@/views/User/children/TabContent.vue'),
          props: () => ({
            type: 'tweet'
          })
        },
        {
          path: 'retweet',
          component: () => import('@/views/User/children/TabContent.vue'),
          props: () => ({
            type: 'retweet'
          })
        }
      ]
    },
    {
      path: '/:screenName',
      component: () => import('@/views/FollowState'),
      children: [
        {
          path: 'following',
          component: () => import('@/views/FollowState/children/Following.vue')
        },
        {
          path: 'followers',
          component: () => import('@/views/FollowState/children/Followers.vue')
        }
      ]
    },
    {
      path: '/:pickupUser/media/:id',
      component: () => import('@/views/PickupDetail'),
      props: route => ({
        id: route.params.id
      })
    },
    {
      path: '/search/:query',
      component: () => import('@/views/Search'),
      props: route => ({
        query: route.params.query
      })
    }
  ]
})
