import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/manifest',
    name: 'Manifest',
    // route level code-splitting
    // this generates a separate chunk (manifest.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "manifest" */ '../views/Manifest.vue'),
  },
  {
    path: '/manifest-find',
    name: 'ManifestFind',
    component: () => import('../views/ManifestFind'),
  },
  {
    path: '/shipment',
    name: 'Shipment',
    component: () => import('../views/Shipment.vue'),
  },
  {
    path: '/shipment-find',
    name: 'ShipmentFind',
    component: () => import('../views/ShipmentFind.vue'),
  },
  {
    path: '*',
    name: 'Not Found',
    component: () => import(/* webpackChunkName: "manifest" */ '../views/NotFoundComponent.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
