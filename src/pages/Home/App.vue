<template>
  <div id="app">
    <Header />
    <img alt="Vue logo" src="@/assets/logo.png" />
    <div>
      <a href="./manage">後台</a>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "Home",
  components: {
    Header
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
