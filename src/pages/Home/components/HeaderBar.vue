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
      <input type="text" class="search-textbox" v-model="search" />
      <input type="button" class="btn search-btn" :value="$t('search')" @click="goRecords()" />
    </div>
    <div class="login-area">
      <template v-if="logined">
        <ul>
          <li>
            <a href="./manage">{{ $t("admin") }}</a>
          </li>
          <li>
            <a href="#" @click="logout">{{ $t("logout") }}</a>
          </li>
        </ul>
      </template>
      <template v-else>
        <ul>
          <li>
            <router-link to="/invitation">{{ $t("register") }}</router-link>
          </li>
          <li>
            <router-link to="/login">{{ $t("login") }}</router-link>
          </li>
        </ul>
      </template>
    </div>
    <div class="mobile-menu-area" @click="triggerMobileMenu(!isMobileMenuOpened)">
      <div ref="tirgger-button" class="tirgger-button">
        <p></p>
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </div>
    </div>
    <div ref="mobile-overlay" class="overlay">
      <div class="overlay-content">
        <div class="search-bar-mobile">
          <select class="search-select">
            <option value="1">標題</option>
          </select>
          <input type="text" class="search-textbox" v-model="search" />
          <input type="button" class="btn search-btn" :value="$t('search')" @click="goRecords()" />
        </div>
        <template v-if="logined">
          <ul>
            <li>
              <a href="./manage">{{ $t("admin") }}</a>
            </li>
            <li>
              <a href="#" @click="logout">{{ $t("logout") }}</a>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul>
            <li>
              <router-link to="/invitation">{{ $t("register") }}</router-link>
            </li>
            <li>
              <router-link to="/login">{{ $t("login") }}</router-link>
            </li>
          </ul>
        </template>
        <ul>
          <li>
            <router-link to="/record">{{ $t("recordSell") }}</router-link>
          </li>
          <li>
            <router-link to="/accessory">{{ $t("accessory") }}</router-link>
          </li>
          <li>
            <router-link to="/article">{{ $t("article") }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderBar",
  props: {},
  data: function() {
    return {
      search: "",
      isMobileMenuOpened: false
    };
  },
  watch: {
    $route() {
      this.triggerMobileMenu(false);
    }
  },
  computed: {
    logined() {
      return this.$store.state.token !== "";
    }
  },
  methods: {
    goRecords() {
      let key = this.search.trim();
      this.$router.push({ name: "Record", query: { search: key } });
    },
    logout() {
      this.$store.commit("logout");
    },
    triggerMobileMenu(open) {
      this.isMobileMenuOpened = open;

      if (open) {
        this.$refs["mobile-overlay"].style.height = "calc(100% - 67px)";
        this.$refs["tirgger-button"].classList.add("closed");
        document.querySelector("body").style.overflow = "hidden";
      } else {
        this.$refs["mobile-overlay"].style.height = "0%";
        this.$refs["tirgger-button"].classList.remove("closed");
        document.querySelector("body").style.overflow = "auto";
      }
    }
  }
};
</script>

<style scoped lang="scss">
header {
  background: $red;
  display: flex;
  width: 100%;
  overflow: auto;
  text-align: center;
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  padding: 0px 20px;
  font-size: 20px;
  @include pc-width {
    padding: 0px;
    background: #fff;
  }
}

.logo-area {
  height: 100%;
  line-height: 67px;
  width: 100%;
  background: $red;
  color: #fff;
  text-align: left;
  font-size: 28px;
  a:link,
  a:visited {
    color: #fff;
  }
  @include pc-width {
    text-align: center;
    max-width: 300px;
    flex: 2;
  }
}
.menu-area {
  height: 100%;
  line-height: 67px;
  text-align: center;
  display: none;
  @include pc-width {
    flex: 4;
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
    flex: 3;
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
    max-width: calc(100% - 10rem);
    border: 1px solid $gray;
  }
  .search-btn {
    display: inline-block;
    vertical-align: middle;
    width: 4rem;
    padding: 0px;
    margin-right: 0px;
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
      color: $red;
      text-decoration: none;
    }
  }
}
.mobile-menu-area {
  .tirgger-button > div {
    width: 35px;
    height: 5px;
    background-color: #fff;
    margin: 6px 0;
    transition: 0.4s;
  }
  .closed .bar1 {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    transform: rotate(-45deg) translate(-9px, 6px);
  }
  .closed .bar2 {
    opacity: 0;
  }
  .closed .bar3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
  }
  @include pc-width {
    display: none;
  }
}
.overlay {
  height: 0%;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 67px;
  left: 0;
  background-color: $red;
  overflow-y: hidden;
  transition: 0.5s;
  .overlay-content {
    position: relative;
    width: 100%;
    text-align: left;
    margin-top: 30px;
    padding: 0px 20px;
  }

  .search-bar-mobile {
    width: 100%;
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
      max-width: calc(100% - 10rem);
      border: 1px solid $gray;
    }
    .search-btn {
      display: inline-block;
      vertical-align: middle;
      width: 4rem;
      padding: 0px;
      margin-right: 0px;
    }
  }
  ul {
    margin-bottom: 2em;
  }
  li {
    color: #fff;
    line-height: 3rem;
    display: block;
  }
  a {
    font-size: 20px;
    color: #fff;
  }
}
</style>

 