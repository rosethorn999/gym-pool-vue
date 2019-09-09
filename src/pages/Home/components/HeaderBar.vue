<template>
  <header>
    <div class="logo-area">
      <b>
        <router-link to="/">GymPool</router-link>
      </b>
    </div>
    <div class="menu-area">
      <ul>
        <li>
          <router-link to="/record">{{ $t("recordSell") }}</router-link>
        </li>|
        <li>
          <router-link to="/accessory">{{ $t("accessory") }}</router-link>
        </li>|
        <li>
          <router-link to="/article">{{ $t("article") }}</router-link>
        </li>
      </ul>
    </div>
    <div class="search-bar">
      <select class="search-select">
        <option value="1">標題</option>
      </select>
      <input type="text" class="search-textbox" />
    </div>
    <div class="login-area">
      <ul>
        <li>
          <router-link to="/register">{{ $t("register") }}</router-link>
        </li>
        <li>
          <router-link to="/login">{{ $t("login") }}</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderBar",
  props: {}
};
</script>

<style scoped lang="scss">
header {
  background: #ffffff;
  display: flex;
  width: 100%;
  overflow: auto;
  border-bottom: 1px solid #b7b7b7;
}

.logo-area {
  height: 100%;
  line-height: 67px;
  max-width: 10%;
  flex: 1;
  background: #f00034;
  color: #ffffff;
  text-align: center;
  a:link,
  a:visited {
    color: #fff;
  }
}
.menu-area {
  height: 100%;
  line-height: 67px;
  flex: 5;
  text-align: center;
  a:link,
  a:visited {
    color: #000;
  }
  li {
    display: inline-block;
    margin: 0px 10px;
  }
}
.search-bar {
  height: 100%;
  line-height: 67px;
  flex: 2;
  text-align: center;
  > * {
    display: inline-block;
    height: 30px;
  }
  .search-select {
    width: 4rem;
    border-right-color: #fff;
  }
  .search-textbox {
    max-width: 100%;
  }
}
.login-area {
  height: 100%;
  line-height: 67px;
  max-width: 20%;
  flex: 2;
  li {
    display: inline-block;
    a {
      margin-right: 10px;
      color: #ff3d00;
      text-decoration: none;
    }
  }
}
</style>

 