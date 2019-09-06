<template>
  <header>
    <div class="logoArea">
      <p>GymPool</p>
    </div>
    <div class="menuArea">
      <ul>
        <li>健身房會籍轉讓</li>|
        <li>配件</li>|
        <li>文章</li>
      </ul>
    </div>
    <div class="search-bar">
      <select>
        <option value="1">地區</option>
      </select>
      <input type="text" class="search-textbox" />
    </div>
    <div class="loginArea">
      <ul>
        <li>
          <a href="./manage">註冊</a>
        </li>
        <li>
          <a href="./manage">登入</a>
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
  $displayActive: inline-block;
  $menuSpace: 10px 30px;
  background: #ffffff;
  display: flex;
  width: 100%;
  overflow: auto;

  .logoArea {
    max-width: 10%;
    flex: 1;
    padding: $menuSpace;
    background: #f00034;
    color: #ffffff;
    text-align: center;
  }
  .menuArea {
    flex: 5;
    text-align: center;
    li {
      display: $displayActive;
      margin: 10px 10px;
    }
  }
  .search-bar {
    flex: 2;
    text-align: center;
    padding: $menuSpace;
    > * {
      display: $displayActive;
      margin: 10px 0px;
    }
    .search-textbox {
      max-width: 100%;
    }
  }

  .loginArea {
    max-width: 20%;
    flex: 2;
    li {
      display: $displayActive;
      margin: 10px 10px;
      a {
        color: #ff3d00;
        text-decoration: none;
      }
    }
  }
}
</style>

 