<template>
  <!-- TODO i18n -->
  <div class="index">
    <div class="sliderBanner">
      <div class="background-area">
        <img src="../assets/bg.png" />
      </div>
      <div class="text-area">
        <p class="first-line">{{ $t("recordSell") }}</p>
        <p class="second-line">
          有
          <span class="mark">1000</span>
          多件刊登商品
        </p>
        <p class="second-line">尋找你所在的城市</p>
        <div class="county-area">
          <ul class="circles">
            <li class="north-area">
              <p>300</p>
              <p>件</p>
              <router-link to="/record" class="area-btn">{{ $t("area-north") }}</router-link>
            </li>
            <li class="central-area">
              <p>300</p>
              <p>件</p>
              <router-link to="/record" class="area-btn">{{ $t("area-centre") }}</router-link>
            </li>
            <li class="south-area">
              <p>300</p>
              <p>件</p>
              <router-link to="/record" class="area-btn">{{ $t("area-south") }}</router-link>
            </li>
            <li class="east-area">
              <p>300</p>
              <p>件</p>
              <router-link to="/record" class="area-btn">{{ $t("area-east") }}</router-link>
            </li>
          </ul>
        </div>
        <p>
          看
          <router-link to="/record">全部商品</router-link>
        </p>
      </div>
    </div>
    <div class="why-area">
      <p>為什麼我們需要使用你？</p>
      <p>我們使用你能幫助我什麼？</p>
    </div>
    <div class="we-provide-them">
      <p>我們方便、簡單、好管理</p>
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
      <p>{{ $t("transferMustKnow") }}</p>
      <p>{{ $t("somethingToNotice") }}</p>
    </div>
    <div class="latst-sell">
      <p>最近上架</p>
      <div class="record-container">
        <RecordBox
          v-for="(r,i) in records"
          :key="r.id"
          @click.native="checkout(i)"
          class="record-box"
          :r="r"
          :fitXs="true"
        />
      </div>
      <div class="watch-more-block">
        <router-link class="watch-more" to="/record">看更多</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import RecordBox from "../components/RecordBox.vue";

export default {
  name: "Index",
  components: { RecordBox },
  data: function() {
    return {
      recordCount: 0,
      records: null,
      pagination: { pageSize: 20 },

      selection: {
        gym_types: [
          { val: 1, name: "健身工廠" },
          { val: 2, name: "全真會館" },
          { val: 3, name: "世界健身" },
          { val: 4, name: "成吉思汗" },
          { val: 5, name: "台北健身院" },
          { val: 999, name: "其他" }
        ]
      }
    };
  },
  computed: {
    routerActive() {
      return this.$route.name;
    }
  },
  mounted: function() {
    this.readRecord();
  },
  methods: {
    readRecord() {
      this.records = [];

      // TODO this.pagination.pageSize
      // TODO mobile show 7 records, pc 15 records

      let url = "http://192.168.1.101:8000/api/record";

      this.axios.get(url).then(response => {
        this.recordCount = response.data.count;
        this.records = response.data.results;
      });
    },
    checkout(index) {
      let record = this.records[index];
      localStorage.setItem("record", JSON.stringify(record));
      let id = record.id;
      this.$router.push({ name: "RecordDetail", params: { recordId: id } });
    },
    getPrice(r) {
      let month = 12; //TODO calc month
      return month * r.monthly_rental + r.processing_fee;
    },
    gym_typeCaption(v) {
      let selected = this.selection.gym_types.filter(function(item) {
        return item.val === v;
      });
      if (selected.length > 0) {
        return selected[0].name;
      } else {
        return this.$t("disComputable");
      }
    }
  }
};
</script>

<style scoped lang="scss">
$pc-padding: 10%;
$phone-padding: 40px;
$pc-font-size: 24px;
$phone-font-size: 30px;

.index {
  background: #fff;
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
      margin-bottom: 16px;
      &.first-line {
        margin-top: 0px;
        font-size: 40px;
      }
      &.second-line {
        font-size: $phone-font-size;
      }
    }
    a:visited {
      color: #fff;
    }

    .county-area {
      padding: 10px;
      .circles {
        li {
          display: inline-block;
          margin: 20px;
          border-radius: 50%;
          width: 120px;
          height: 120px;
          p {
            margin: 0px;
            padding: 0;
            line-height: 120px;
            font-size: 26px;
            &:nth-child(2) {
              font-size: 17px;
              margin-top: -90px;
            }
          }
          a.area-btn {
            padding: 2px 10px;
            border: 1px solid #fff;
            color: #dee2e6;
            &:hover {
              color: #fff;
            }
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
      padding-top: 100px;
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
    padding: 30px $phone-padding;
    background: #fff;
    @include pc-width {
      padding: 67px $pc-padding;
    }
    p {
      margin: 0px;
      margin-bottom: 7px;
      font-size: 28px;
      @include pc-width {
        font-size: 40px;
        margin-bottom: 20px;
      }
    }
  }
  .we-provide-them {
    box-sizing: border-box;
    text-align: center;
    padding: 50px $phone-padding 0px;
    background: #ededed;
    font-size: 30px;
    @include pc-width {
      font-size: 40px;
      padding: 50px $pc-padding 100px;
    }
    div {
      margin-top: 50px;
      font-size: $pc-font-size;
      li {
        display: inline-block;
        width: 50%;
        height: 200px;
        border-radius: 50%;
        @include pc-width {
          width: 25%;
          height: 150px;
        }
      }
    }
  }
  .you-should-know {
    box-sizing: border-box;
    height: 307px;
    background-image: url("../assets/bg.png");
    color: #fff;
    padding: 60px $phone-padding 150px;
    width: 100%;
    @include pc-width {
      padding: 52px $pc-padding;
    }
    p {
      font-size: 30px;
      @include pc-width {
        font-size: 40px;
      }
      &:last-child {
        font-size: $pc-font-size;
      }
    }
  }
  .latst-sell {
    padding: 35px $phone-padding;
    font-size: $phone-font-size;
    @include pc-width {
      font-size: $pc-font-size;
      padding: 100px $pc-padding;
    }
    .record-container {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      .record-box {
        width: 298px;
      }
    }
    .watch-more-block {
      height: 150px;
      line-height: 150px;
      text-align: center;
      font-size: 20px;
      .watch-more {
        padding: 10px 25px;
        border: 1px solid #080808;
        color: #080808;
      }
    }
  }
}
</style>
