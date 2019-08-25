<template>
  <div class="index">
    <Header></Header>
    <h1>This is a Index page INSIDE</h1>
    <ul>
      <li
        data-target="store"
        :class="{active:routerActive==='store'||routerActive==='home'}"
        @click="switchRouter"
      >
        <router-link to="/store">拍賣</router-link>
      </li>
      <li
        data-target="accountManager"
        :class="{active:routerActive==='accountManager'}"
        @click="switchRouter"
      >
        <router-link to="/accountManager">會員中心</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "Index",
  components: {
    Header
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

<style scoped lang="scss">
.index {
  display: inline-block;
  background: #f5f7f8;
  width: 85%;
  height: 100vh;
}
</style>
