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
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "微軟正黑體";
}
body {
  width: 100vw;
}

#manage {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #222222;
}
input[type="number"],
input[type="text"],
select,
textarea {
  border-radius: 2px;
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  width: 100%;
  height: 32px;
  &:disabled {
    color: rgba(0, 0, 0, 0.38);
  }
  &:focus {
    outline: none;
  }
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-indent: 5px;
  padding: 5px;
  &:disabled {
    color: rgba(0, 0, 0, 0.38);
  }
  &:focus {
    outline: none;
  }
}
input[type="button"] {
  position: fixed;
  bottom: 1%;
  right: 1%;
  cursor: pointer;
  color: #fff;
  margin: 6px 8px;
  width: 85px;
  height: 85px;
  font-size: 14px;
  background-image: url("../../../assets/add.png");
  background-position: 50% 40%;
  background-size: auto;
  border-radius: 50%;
  border: 0;
  overflow: hidden;
}
select.danger,
input.danger {
  border: #ff5252 solid 1px;
}
p.danger {
  color: #ff5252;
}
.modal {
  top: 0;
  position: fixed;
  z-index: 2000;
  background: #fff;
  width: 100vw;
  height: 100vh;
  .modal-header {
    height: 58px;
    border-bottom: 1px solid rgb(235, 235, 235);
    div {
      display: inline-block;
      width: 50%;
      padding: 0px 10%;
      &:nth-of-type(1) {
        vertical-align: middle;
        text-align: left;
      }
      &:nth-of-type(2) {
        vertical-align: middle;
        text-align: right;
      }
    }
  }
}
.router-view {
  display: inline-block;
  background: #f5f7f8;
  width: 85%;
  min-height: 100vh;
}
</style>
