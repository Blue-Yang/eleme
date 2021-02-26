import Vue from 'vue'
import VueRouter from 'vue-router'
// import Goods from "components/goods/goods";
import Ratings from "components/ratings/ratings";
import Seller from 'components/seller/seller'


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: '/goods'
  },
  {
    path: "/goods",
    name: "Goods",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "goods" */ "../components/goods/goods.vue")
  },
  {
    path: "/ratings",
    name: "Ratings",
    component: Ratings
  },
  {
    path: '/seller',
    name: 'Seller',
    component: Seller
  }
];

const router = new VueRouter({
  routes
})

export default router
