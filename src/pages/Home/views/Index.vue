<template>
  <div class="index">
    <div class="sliderBanner">
      <div class="background-area">
        <img src="../assets/bg.png" />
      </div>
      <div class="text-area">
        <p>健身會籍轉讓</p>
        <p>
          有
          <span class="mark">1000</span>
          多件刊登商品
        </p>
        <p>尋找你所在的城市</p>
        <div class="city-Area">
          <ul class="circles">
            <li class="north-area">
              <p>300</p>
              <p class="secend-line">件</p>
            </li>
            <li class="central-area">
              <p>300</p>
              <p class="secend-line">件</p>
            </li>
            <li class="south-area">
              <p>300</p>
              <p class="secend-line">件</p>
            </li>
            <li class="east-area">
              <p>300</p>
              <p class="secend-line">件</p>
            </li>
          </ul>
          <ul class="buttons">
            <li>
              <a href="#">北部</a>
            </li>
            <li>
              <a href="#">中部</a>
            </li>
            <li>
              <a href="#">南部</a>
            </li>
            <li>
              <a href="#">東部</a>
            </li>
          </ul>
        </div>
        <p>
          看
          <a href="#">全部商品</a>
        </p>
      </div>
    </div>
    <div class="why-area">
      <h3>為什麼我們需要使用你？</h3>
      <h3>我們使用你能幫助我什麼？</h3>
    </div>
    <div class="we-provide-them">
      <h1>我們方便、簡單、好管理</h1>
      <div>
        <ul>
          <li>
            <img src="https://via.placeholder.com/90" />
            <p>方便聯絡</p>
          </li>
          <li>
            <img src="https://via.placeholder.com/90" />
            <p>完全免費</p>
          </li>
          <li>
            <img src="https://via.placeholder.com/90" />
            <p>資訊透明</p>
          </li>
          <li>
            <img src="https://via.placeholder.com/90" />
            <p>多樣商品</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="you-should-know">
      <h1>健身會籍轉讓需知</h1>
      <p>需要注意的事情</p>
    </div>
    <div class="latst-sell">
      <h1>最近上架</h1>
      <div class="recorde-container">
        <div class="recorde-box" v-for="item in 15">
          <img src="../assets/world_gym__1448962972_16f5e373.jpg" />
          <div class="text-box">
            <p>轉讓世界健身 竹北店 會籍</p>
            <p>World Gym 竹北店</p>
            <div>
              <span class="gray-text">到期時間: 2019/11月</span>
              <span class="blue-text">NT12000</span>
            </div>
          </div>
        </div>
      </div>
      <div class="watch-more-block">
        <a class="watch-more" href="#">看更多</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  components: {},
  props: {},
  computed: {
    routerActive() {
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

<style scoped lang="scss">
$grassgreen: #2ed97d;

.index {
  background: #f5f7f8;
  width: 100%;

  .sliderBanner {
    height: 100vh;
    position: relative;
    text-align: center;
    color: #ffffff;

    .mark {
      background: $grassgreen;
    }
    p {
      padding: 15px 0;
      font-size: 24px;
    }

    .city-Area {
      .circles {
        li {
          display: inline-block;
          margin: 0px 20px;
          border-radius: 50%;
          width: 120px;
          height: 120px;
          p {
            margin: 0px;
            padding: 0;
            line-height: 120px;
          }
          p.secend-line {
            margin-top: -90px;
          }
        }
      }
      .buttons {
        li {
          display: inline-block;
          margin: 0px 20px;
          width: 120px;
        }
        a {
          padding: 2px 10px;
          border: 1px solid #fff;
          color: #dee2e6;
          &:hover {
            color: #fff;
          }
        }
      }

      .north-area {
        border: 2px solid #aa0000;
      }
      .central-area {
        border: 2px solid #e6c01e;
      }
      .south-area {
        border: 2px solid $grassgreen;
      }
      .east-area {
        border: 2px solid #5196e6;
      }
    }
    .text-area {
      box-sizing: border-box;
      padding: 150px 0 0 0;
      width: 100%;
      position: absolute;
      top: 0;
      height: 100vh;
      a {
        color: $grassgreen;
      }
    }
    .background-area {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      > img {
        height: 100vh;
        width: 100%;
        filter: brightness(50%);
      }
    }
  }
  .why-area {
    padding: 50px 20% 75px;
    background: #fff;
    h3 {
      font-size: 30px;
      padding: 0px 5% 0;
    }
  }
  .we-provide-them {
    box-sizing: border-box;
    text-align: center;
    padding-top: 50px;

    li {
      display: inline-block;
      margin: 50px 90px;
      border-radius: 50%;
      width: 120px;
      height: 120px;
    }
  }
  .you-should-know {
    box-sizing: border-box;
    height: 244px;
    background-image: url("../assets/bg.png");
    color: #fff;
    padding: 52px 20%;
    width: 100vw;
  }
  .latst-sell {
    padding: 100px 136px;
    .recorde-container {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .recorde-box {
        margin-top: 24px;
        box-shadow: 0px 3px 6px #00000029;
        min-height: 235px;
        width: 300px;
        border-radius: 10px;
        cursor: pointer;
        opacity: 0.9;
        &:hover {
          opacity: 1;
        }
        > img {
          border-radius: 10px;
          width: 100%;
          height: 136px;
        }
        .text-box {
          height: 100px;
          padding: 5px;
          position: relative;
          > p {
            margin: 0px;
            line-height: 1.5rem;
          }
          > div {
            position: absolute;
            bottom: 5px;
            width: 90%;
            display: flex;
            justify-content: space-between;
          }
          .gray-text {
            color: #989898;
          }
          .blue-text {
            color: #0099ff;
          }
        }
      }
    }
    .watch-more-block {
      margin-top: 50px;
      text-align: center;
      .watch-more {
        padding: 10px 25px;
        border: 1px solid #080808;
        color: #080808;
      }
    }
  }
}
</style>
