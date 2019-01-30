import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _42a66b6a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _5d52d2fc = () => interopDefault(import('..\\pages\\_lang\\index.vue' /* webpackChunkName: "pages__lang_index" */))
const _76d11804 = () => interopDefault(import('..\\pages\\_lang\\dashboard\\index.vue' /* webpackChunkName: "pages__lang_dashboard_index" */))
const _7d62af2e = () => interopDefault(import('..\\pages\\_lang\\lending-registration\\index.vue' /* webpackChunkName: "pages__lang_lending-registration_index" */))
const _6cb5cac0 = () => interopDefault(import('..\\pages\\_lang\\link.vue' /* webpackChunkName: "pages__lang_link" */))
const _70f8fc6d = () => interopDefault(import('..\\pages\\_lang\\marketplace\\index.vue' /* webpackChunkName: "pages__lang_marketplace_index" */))
const _4d6213d3 = () => interopDefault(import('..\\pages\\_lang\\profile.vue' /* webpackChunkName: "pages__lang_profile" */))
const _433d3f80 = () => interopDefault(import('..\\pages\\_lang\\template.vue' /* webpackChunkName: "pages__lang_template" */))
const _1387c192 = () => interopDefault(import('..\\pages\\_lang\\dashboard\\platforms.vue' /* webpackChunkName: "pages__lang_dashboard_platforms" */))
const _bc837c00 = () => interopDefault(import('..\\pages\\_lang\\lending-registration\\profile.vue' /* webpackChunkName: "pages__lang_lending-registration_profile" */))
const _550d4b6c = () => interopDefault(import('..\\pages\\_lang\\dashboard\\_id.vue' /* webpackChunkName: "pages__lang_dashboard__id" */))
const _e4f593d6 = () => interopDefault(import('..\\pages\\_lang\\marketplace\\_id.vue' /* webpackChunkName: "pages__lang_marketplace__id" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/",
      component: _42a66b6a,
      name: "index"
    }, {
      path: "/:lang",
      component: _5d52d2fc,
      name: "lang"
    }, {
      path: "/:lang/dashboard",
      component: _76d11804,
      name: "lang-dashboard"
    }, {
      path: "/:lang/lending-registration",
      component: _7d62af2e,
      name: "lang-lending-registration"
    }, {
      path: "/:lang/link",
      component: _6cb5cac0,
      name: "lang-link"
    }, {
      path: "/:lang/marketplace",
      component: _70f8fc6d,
      name: "lang-marketplace"
    }, {
      path: "/:lang/profile",
      component: _4d6213d3,
      name: "lang-profile"
    }, {
      path: "/:lang/template",
      component: _433d3f80,
      name: "lang-template"
    }, {
      path: "/:lang/dashboard/platforms",
      component: _1387c192,
      name: "lang-dashboard-platforms"
    }, {
      path: "/:lang/lending-registration/profile",
      component: _bc837c00,
      name: "lang-lending-registration-profile"
    }, {
      path: "/:lang/dashboard/:id",
      component: _550d4b6c,
      name: "lang-dashboard-id"
    }, {
      path: "/:lang/marketplace/:id",
      component: _e4f593d6,
      name: "lang-marketplace-id"
    }],

    fallback: false
  })
}
