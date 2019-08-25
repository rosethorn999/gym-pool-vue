<template>
  <div id="manage">
    <div id="nav">
      <h1>Gym Pool</h1>
      <p>{{$t("appDescription")}}</p>
      <div class="headImage"></div>
      <p>Alex</p>
      <div class="item-Menu">
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
    </div>
    <div id="nav2"></div>

    <div id="nav3"></div>
    <router-view class="router-view" />
  </div>
</template>

<script>
export default {
  name: "Manage",
  props: {}
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
