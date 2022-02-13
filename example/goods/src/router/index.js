import Vue from 'vue'
import VueRouter from 'vue-router'
import { name } from '../../package.json';

Vue.use(VueRouter)

const routes = [
  {
    path: '/list',
    name: 'List',
    component: () => import(/* webpackChunkName: "List" */ '../views/List.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Detail" */ '../views/Detail.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: window.__POWERED_BY_QIANKUN__ ? name : '/',
  routes
})

export default router
