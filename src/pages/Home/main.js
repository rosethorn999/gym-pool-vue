import Vue from "vue";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import i18n from "./i18n";
import * as firebase from "firebase/app";
import "firebase/firestore";
import axios from "axios";

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCmTvef6k5YfhnhjDRtabH1fnL5DR4-bug",
  authDomain: "gympool-8d1db.firebaseapp.com",
  databaseURL: "https://gympool-8d1db.firebaseio.com",
  projectId: "gympool-8d1db",
  storageBucket: "gympool-8d1db.appspot.com",
  messagingSenderId: "313833525329"
};
firebase.initializeApp(config);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
