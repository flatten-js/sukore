import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:screenName',
      component: () => import('@/components/views/Pickup'),
      props: route => ({
        screenName: route.params.screenName
      }),
      children: [
        {
          path: '',
          component: () => import('@/components/views/Pickup/children/TweetTabContent.vue')
        },
        {
          path: 'retweet',
          component: () => import('@/components/views/Pickup/children/RetweetTabContent.vue')
        }
      ]
    },
    {
      path: '/:id',
      component: () => import('@/components/views/PickupDetail'),
      props: route => ({
        id: route.params.id
      })
    }
  ]
})
