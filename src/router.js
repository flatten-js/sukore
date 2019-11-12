import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:screenName',
      component: () => import('@/views/Pickup'),
      props: route => ({
        screenName: route.params.screenName
      }),
      children: [
        {
          path: '',
          component: () => import('@/views/Pickup/children/TweetTabContent.vue')
        },
        {
          path: 'retweet',
          component: () => import('@/views/Pickup/children/RetweetTabContent.vue')
        }
      ]
    },
    {
      path: '/:pickupUser/media/:id',
      component: () => import('@/views/PickupDetail'),
      props: route => ({
        id: route.params.id
      })
    }
  ]
})
