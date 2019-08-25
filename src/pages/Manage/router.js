import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Home
    },
    // {
    //   path: "/sell",
    //   name: "sell",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ "./views/Sell.vue")
    // },
    {
      path: "/addRecord",
      name: "add",
      component: () => import("./views/AddRecord.vue")
    },
    {
      path: "/contract/:contractId",
      name: "contract",
      component: () => import("./views/Contract.vue")
    },
    {
      path: "/account",
      name: "account",
      component: () => import("./views/Account.vue")
    },
    {
      path: "*",
      component: Home
    }
  ]
});
