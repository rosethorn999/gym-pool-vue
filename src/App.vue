<template>
  <div id="app">
    <div id="nav">
      <h1>Gym Pool</h1>
      <p>{{$t("appDescription")}}</p>
      <!-- <router-link to="/">Buy</router-link>
      <span>&nbsp;|&nbsp;</span>
      <router-link to="/sell">Sell</router-link>-->
      <div class="headImage">
      </div>
      <p>Alex</p>
      <div class="item-Menu">
        <ul>
          <li class="active">拍賣</li>
          <li>會員中心</li>          
        </ul>
      </div>
    </div>
    <div id="nav2">
      
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "微軟正黑體";
}
body {
  width: 100vw;
}

h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
  h1 {
    color: #fe4220;
  }
  p {
    color: #fff;
    margin-bottom: 0.2em;
  }
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
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
    }
    .active {
      background: #2c72b1;
    }
  }
}
#nav2 {
  display: inline-block;
  width: 15%;
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
  background-image: url("./assets/add.png");
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
</style>
