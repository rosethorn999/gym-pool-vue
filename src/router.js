import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Index from "./views/Index.vue";
import Manage from "./views/Manage.vue";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/manage",
      name: "Manage",
      component: Manage
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
      path: "/store",
      name: "store",
      component: Home
    },
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
      path: "/accountManager",
      name: "accountManager",
      component: () => import("./views/AccountManager.vue")
    },
    {
      path: "*",
      component: Home
    }
  ]
});
