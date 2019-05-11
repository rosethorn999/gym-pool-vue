<template>
  <div id="app">
    <div id="nav">
      <h1>Gym Pool</h1>
      <p>{{$t("appDescription")}}</p>
      <!-- <router-link to="/">Buy</router-link>
      <span>&nbsp;|&nbsp;</span>
      <router-link to="/sell">Sell</router-link>-->
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
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
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
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
  cursor: pointer;
  color: #fff;
  margin: 6px 8px;
  height: 36px;
  padding: 6px;
  font-size: 14px;
  background-color: #4caf50;
  border-radius: 2px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:disabled {
    cursor: not-allowed;
    background-color: rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.26);
  }
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
