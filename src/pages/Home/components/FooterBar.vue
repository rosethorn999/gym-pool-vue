<template>
  <footer>
    <div class="footer-block">
      <div class="column">
        <p class="blue">關於</p>
        <ul>
          <li>
            <a href="#">創立動機</a>
          </li>
          <li>
            <a href="#">成功案例</a>
          </li>
        </ul>
      </div>
      <div class="column">
        <p class="blue">幫助</p>
        <ul>
          <li>
            <a href="#">常見問題</a>
          </li>
        </ul>
      </div>
      <div class="column fake"></div>
      <div class="column fans-container">
        <p class="blue">&nbsp;</p>
        <ul>
          <li class="fans-club">
            <a href="#">粉絲團</a>
          </li>
        </ul>
      </div>
    </div>
    <p class="copyright">2019 Copyright</p>
  </footer>
</template>

<script>
export default {
  name: "FooterBar",
  props: {}
};
</script>

<style scoped lang="scss">
$pc-media: 960px;
$pcs-media: 959px;
$pad-media: 760px;
$pads-media: 759px;
$phone-media: 480px;
$phones-media: 479px;
//電腦
@mixin pc-width() {
  @media all and (min-width: $pc-media) {
    @content;
  }
}
//平板
@mixin pad-width() {
  @media all and (min-width: $pad-media) and (max-width: $pcs-media) {
    @content;
  }
}
//小平板
@mixin small-pad-width() {
  @media all and (min-width: $phone-media) and (max-width: $pads-media) {
    @content;
  }
}
//手機
@mixin phone-width() {
  @media all and (max-width: $phones-media) {
    @content;
  }
}

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
    margin-bottom: 8px;
    &.fans-club > a {
      padding: 10px 25px;
      border: 1px solid #fff;
    }
  }
}
.footer-block {
  color: #fff;
  background: #30363b;
  min-height: 200px;
  width: 100%;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 28px 10vw 0px 10vw;
  text-align: left;
  .column {
    display: block;
    flex: 1;
    min-width: 50%;
    height: 200px;
    @include pc-width {
      min-width: 25%;
    }
    &.fake {
      display: none;
      @include pc-width {
        display: block;
      }
    }
    &.fans-container {
      text-align: center;
    }
    p.blue {
      margin: 10px 0px;
      font-size: 20px;
      color: #40a7ff;
    }
  }
}
.copyright {
  color: #fff;
  margin: 0px;
  height: 105px;
  line-height: 105px;
  font-size: 20px;
  @include pc-width {
    height: 66px;
    line-height: 66px;
  }
}
</style>
