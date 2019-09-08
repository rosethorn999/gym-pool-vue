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
          <a href="#">健身房會籍轉讓</a>
        </li>|
        <li>
          <a href="#">配件</a>
        </li>|
        <li>
          <a href="#">文章</a>
        </li>
      </ul>
    </div>
    <div class="search-bar">
      <select>
        <option value="1">地區</option>
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
}

.logo-area {
  height: 100%;
  line-height: 67px;
  max-width: 10%;
  flex: 1;
  background: #f00034;
  color: #ffffff;
  text-align: center;
  a:visited {
    color: #fff;
  }
}
.menu-area {
  height: 100%;
  line-height: 67px;
  flex: 5;
  text-align: center;
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

 