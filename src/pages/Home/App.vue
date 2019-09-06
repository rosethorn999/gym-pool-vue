<template>
  <div id="app">
    <HeaderBar></HeaderBar>
    <router-view class="router-view" />
    <FooterBar></FooterBar>
  </div>
</template>

<script>
import HeaderBar from "./components/HeaderBar.vue";
import FooterBar from "./components/FooterBar.vue";

export default {
  name: "Index",
  components: {
    HeaderBar,
    FooterBar
  },
  props: {},
  computed: {
    routerActive() {
      return this.$route.name;
    }
  },
  methods: {
    switchRouter(e) {
      let targetPage = e.currentTarget.dataset.target;
      console.log(targetPage);
      this.$router.push("/" + targetPage);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a {
  text-decoration: none;
}
ul {
  padding-inline-start: 0px;
}
</style>
