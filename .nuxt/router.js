import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c492934c = () => interopDefault(import('..\\pages\\classes.vue' /* webpackChunkName: "pages/classes" */))
const _3d3d770e = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _29c001a5 = () => interopDefault(import('..\\pages\\attendance\\_id.vue' /* webpackChunkName: "pages/attendance/_id" */))
const _224b6806 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/classes",
    component: _c492934c,
    name: "classes"
  }, {
    path: "/inspire",
    component: _3d3d770e,
    name: "inspire"
  }, {
    path: "/attendance/:id?",
    component: _29c001a5,
    name: "attendance-id"
  }, {
    path: "/",
    component: _224b6806,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
