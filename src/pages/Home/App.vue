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
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
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
  margin-block-start: 0em;
  margin-block-end: 0em;
}
</style>
