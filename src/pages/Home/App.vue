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
  mounted() {
    this.$store.commit("checkLoginState");
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap");
* {
  box-sizing: border-box;
}
#app {
  font-family: "Noto Sans TC", Arial, sans-serif;
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
    background: $blue;
    color: #fff;
  }
  &:focus {
    outline: none;
  }
}
</style>
