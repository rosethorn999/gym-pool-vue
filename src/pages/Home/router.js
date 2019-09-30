import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Record from "./views/Record.vue";
import RecordDetail from "./views/RecordDetail.vue";
import Register from "./views/Register.vue";
import Invitation from "./views/Invitation.vue";
import Login from "./views/Login.vue";
import ResetPassword from "./views/ResetPassword.vue";
import Notice from "./views/Notice.vue";
import PrivacyPolicy from "./views/PrivacyPolicy.vue";
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
      path: "/record/:recordId",
      name: "RecordDetail",
      component: RecordDetail
    },
    {
      path: "/invitation",
      name: "Invitation",
      component: Invitation
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
      path: "/resetPassword",
      name: "ResetPassword",
      component: ResetPassword
    },
    {
      path: "/notice",
      name: "Notice",
      component: Notice
    },
    {
      path: "/privacyPolicy",
      name: "PrivacyPolicy",
      component: PrivacyPolicy
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
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
