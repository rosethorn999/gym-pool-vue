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
          <router-link to="/invitation">{{ $t("register") }}</router-link>
        </li>
        <li>
          <router-link to="/login">{{ $t("login") }}</router-link>
        </li>
      </ul>
    </div>
    <div class="mobile-menu-area">
      <p>
        <img src="https://via.placeholder.com/30" />
      </p>
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
  background: #f00034;
  display: flex;
  width: 100%;
  overflow: auto;
  text-align: center;
  border-bottom: 1px solid #b7b7b7;
  padding: 0px 20px;
  font-size: 20px;
  @include pc-width {
    padding: 0px;
    background: #ffffff;
  }
}

.logo-area {
  height: 100%;
  line-height: 67px;
  width: 100%;
  background: #f00034;
  color: #ffffff;
  text-align: left;
  font-size: 28px;
  a:link,
  a:visited {
    color: #fff;
  }
  @include pc-width {
    text-align: center;
    max-width: 10%;
    flex: 1;
  }
}
.menu-area {
  height: 100%;
  line-height: 67px;
  text-align: center;
  display: none;
  @include pc-width {
    flex: 5;
    display: block;
  }
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
  text-align: center;
  display: none;
  @include pc-width {
    flex: 2;
    display: block;
  }
  .search-select {
    display: inline-block;
    height: 30px;
    width: 5rem;
    vertical-align: middle;
    border-right-color: #fff;
  }
  .search-textbox {
    display: inline-block;
    height: 30px;
    vertical-align: middle;
    max-width: 100%;
  }
}
.login-area {
  height: 100%;
  line-height: 67px;
  max-width: 20%;
  display: none;
  @include pc-width {
    flex: 2;
    display: block;
  }
  li {
    display: inline-block;
    a {
      margin-right: 10px;
      color: #ff3d00;
      text-decoration: none;
    }
  }
}
.mobile-menu-area {
  @include pc-width {
    display: none;
  }
}
</style>

 