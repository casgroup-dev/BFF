import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import usersApi from '../apis/users'

Vue.use(Router)

const router = new Router({
  routes,
  linkActiveClass: 'nav-item active'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !usersApi.isLoggedIn()) {
    next({name: 'login', query: {next: to.fullPath}})
  }
  next()
})

export default router
