import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Record from "./views/Record.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import Accessory from "./views/Accessory.vue";
import Article from "./views/Article.vue";

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
      path: "/record",
      name: "Record",
      component: Record
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/accessory",
      name: "Accessory",
      component: Accessory
    },
    {
      path: "/article",
      name: "Article",
      component: Article
    }

    // {
    //   path: "/sell",
    //   name: "sell",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ "./views/Sell.vue")
    // },
  ]
});
