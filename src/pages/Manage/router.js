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
      name: "Index",
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
      path: "/record/:recordId",
      name: "record",
      component: () => import("./views/Record.vue")
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
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
