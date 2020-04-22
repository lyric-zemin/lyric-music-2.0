import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '@/views/recommend/recommend.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/singer',
    component: () => import(/* webpackChunkName: "singer" */ '@/views/singer/singer.vue'),
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "singer-detail" */ '@/views/singer-detail/singer-detail.vue')
      }
    ]
  },
  {
    path: '/rank',
    component: () => import(/* webpackChunkName: "rank" */ '@/views/rank/rank.vue')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/search/search.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
