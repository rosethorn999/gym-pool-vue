<template>
  <div id="app">
    <div id="nav">
      <h1>Gym Pool</h1>
      <p>{{$t("appDescription")}}</p>
      <div class="headImage"></div>
      <p>Alex</p>
      <div class="item-Menu">
        <ul>
          <li data-target :class="{active:routerActive==='index'}" @click="switchRouter">
            <router-link to="/">拍賣</router-link>
          </li>
          <li
            data-target="account"
            :class="{active:routerActive==='account'}"
            @click="switchRouter"
          >
            <router-link to="/account">{{ $t("memberCenter") }}</router-link>
          </li>
          <li>
            <a href="/">前台</a>
          </li>
        </ul>
      </div>
    </div>
    <router-view class="router-view" />
  </div>
</template>

<script>
export default {
  name: "About",
  computed: {
    routerActive() {
      console.log(this.$route.name);
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
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  width: 100vw;
}

#app {
  display: inline-block;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  width: 100%;
  color: #2c3e50;
  background: #222222;
}
#nav {
  padding: 30px;
  display: inline-block;
  vertical-align: top;
  width: 15%;
  position: fixed;
  height: 100vh;
  left: 0px;
  text-align: center;
  h1 {
    color: #fe4220;
  }
  p {
    color: #fff;
    margin-bottom: 0.2em;
  }
  .headImage {
    background-image: url("./assets/20160203022635285.png");
    background-position: center;
    background-size: cover;
    width: 100px;
    height: 100px;
    margin: 20% auto 10%;
  }
  .item-Menu {
    display: block;
    margin: 30px 0;
    ul li {
      display: block;
      color: #fff;
      text-align: end;
      padding: 10px;
      cursor: pointer;
      a {
        color: #fff;
        text-decoration: none;
      }
    }
    .active {
      background: #2c72b1;
    }
  }
}
input[type="number"],
input[type="text"],
select,
textarea {
  border-radius: 2px;
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
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
input.add-record {
  position: fixed;
  bottom: 1%;
  right: 1%;
  cursor: pointer;
  color: #fff;
  margin: 6px 8px;
  width: 85px;
  height: 85px;
  font-size: 14px;
  background-image: url("../../assets/add.png");
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
  margin-left: 15%;
}
.btn {
  height: 40px;
  padding: 5px 30px;
  border-radius: 13px;
  margin-left: 25px;
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
