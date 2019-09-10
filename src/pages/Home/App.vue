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
.router-view {
  min-height: 700px;
  width: 100%;
}
.btn {
  height: 40px;
  padding: 5px 30px;
  border-radius: 13px;
  margin: 0px 12px;
  cursor: pointer;
  &.blue {
    background: #1977f2;
    color: #fff;
  }
  &:focus {
    outline: none;
  }
}
</style>
