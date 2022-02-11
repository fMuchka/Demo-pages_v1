import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import ('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/api_report',
    name: 'API Report',
    component: () => import(/* webpackChunkName: "api_report" */ '../views/API Report.vue')
  }
]

const router = new VueRouter({
    routes
});

export default router
