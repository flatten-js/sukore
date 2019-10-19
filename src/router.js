import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/components/views/Pickup'),
      children: [
        {
          path: '',
          component: () => import('@/components/views/Pickup/children/TabContent.vue'),
          props: { state: true }
        },
        {
          path: 'retweet',
          component: () => import('@/components/views/Pickup/children/TabContent.vue'),
          props: { state: false }
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
