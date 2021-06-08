import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Lk from '../views/v-lk'
import Users from '../views/v-users'
import Issues from '../views/v-issues'
import Base from '../views/v-base'
import Stat from '../views/v-stat'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lk',
    name: 'Lk',
    component: Lk
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/issues',
    name: 'Issues',
    component: Issues
  },
  {
    path: '/knowledge',
    name: 'Base',
    component: Base
  },
  {
    path: '/stat',
    name: 'Stat',
    component: Stat
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
