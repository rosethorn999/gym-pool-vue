<template>
  <footer>
    <div class="footer-block">
      <div>
        <h3>關於</h3>
        <ul>
          <li>
            <a href="#">創立動機</a>
          </li>
          <li>
            <a href="#">成功案例</a>
          </li>
        </ul>
      </div>
      <div>
        <h3>幫助</h3>
        <ul>
          <li>
            <a href="#">常見問題</a>
          </li>
          <li>
            <a href="#">常見問題</a>
          </li>
        </ul>
      </div>
      <div></div>
      <div>
        <h3>&nbsp</h3>
        <ul>
          <li class="fans-club">
            <a href="#">粉絲團</a>
          </li>
        </ul>
      </div>
    </div>
    <h2 class="copyright">2019 Copyright</h2>
  </footer>
</template>

<script>
export default {
  name: "FooterBar",
  props: {}
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: #dee2e6;
  &:hover {
    color: #fff;
  }
}

footer {
  text-align: center;
  background: #272e33;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    font-size: 16px;
    line-height: 1.5rem;
    &.fans-club > a {
      padding: 10px 25px;
      border: 1px solid #fff;
    }
  }
}
.footer-block {
  color: #fff;
  background: #30363b;
  height: 200px;
  display: flex;
  padding: 28px 10vw 0px 10vw;
  text-align: left;
  > div {
    flex: 1;
    h3 {
      color: #40a7ff;
    }
  }
}
.copyright {
  height: 50px;
  color: #fff;
  margin: 0px;
  line-height: 50px;
}
</style>
