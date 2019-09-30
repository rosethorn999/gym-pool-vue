<template>
  <div class="index">
    <div class="slider-banner">
      <div class="background-area"></div>
      <div class="text-area">
        <p class="first-line">{{ $t("recordSell") }}</p>
        <p class="second-line">
          {{ $t("have") }}
          <span class="mark">{{ recordCount }}</span>
          {{ $t("countOfRecord") }}
        </p>
        <p class="second-line">{{ $t("findOutYourCounty") }}</p>
        <div class="county-area">
          <ul class="circles">
            <li v-for="item in countyScatter" :key="item.county">
              <p>{{ item.count }}</p>
              <p>{{ $t("count") }}</p>
              <router-link to="/record" class="area-btn">{{ item.county }}</router-link>
            </li>
          </ul>
        </div>
        <p>
          {{ $t("view") }}
          <router-link to="/record">{{ $t("allRecord") }}</router-link>
        </p>
      </div>
    </div>
    <div class="why-area">
      <p>{{ $t("whyWeExist") }}</p>
      <p>{{ $t("weCanProvideYouFindPerfectRecord") }}</p>
    </div>
    <div class="we-provide-them">
      <p>{{ $t("ourFeatures") }}</p>
      <div>
        <ul>
          <li>
            <img src="https://via.placeholder.com/90" />
            <p>{{ $t("connectEasily") }}</p>
          </li>
          <li>
            <img src="https://via.placeholder.com/90" />
            <p>{{ $t("totalFree") }}</p>
          </li>
          <li>
            <img src="https://via.placeholder.com/90" />
            <p>{{ $t("infoClearly") }}</p>
          </li>
          <li>
            <img src="https://via.placeholder.com/90" />
            <p>{{ $t("manyProducts") }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="you-should-know">
      <p>{{ $t("transferMustKnow") }}</p>
      <p>
        <router-link to="/notice">{{ $t("somethingToNotice") }}</router-link>
      </p>
    </div>
    <div class="latst-sell">
      <p>{{ $t("leastProduct") }}</p>
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
        <router-link class="watch-more" to="/record">{{ $t("watchMore") }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import RecordBox from "../components/RecordBox.vue";
const { basicRequest } = require("@/apis/api.js");

export default {
  name: "Index",
  components: { RecordBox },
  data: function() {
    return {
      recordCount: 0,
      records: null,
      pagination: {},
      countyScatter: [],

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
    this.getRecordByCounty();
  },
  methods: {
    readRecord() {
      this.records = [];

      const isMobileWidth = window.innerWidth <= 480;
      let _page_size = isMobileWidth ? 7 : 15; // mobile show 7 items, pc 15 items
      let url = "/record?page_size=" + _page_size;

      basicRequest.get(url).then(response => {
        this.recordCount = response.data.count;
        this.records = response.data.results;
      });
    },
    getRecordByCounty() {
      let url = "/group-by-county";

      basicRequest.get(url).then(response => {
        this.countyScatter = response.data;
        this.countyScatter.splice(4, this.countyScatter.length);
        this.countyScatter.sort((a, b) => {
          return b.count - a.count;
        });
      });
    },
    checkout(index) {
      let record = this.records[index];
      localStorage.setItem("record", JSON.stringify(record));
      let id = record.id;
      this.$router.push({ name: "RecordDetail", params: { recordId: id } });
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
.index {
  background: #fff;
  width: 100%;

  .slider-banner {
    height: 100vh;
    position: relative;
    text-align: center;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

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
          margin-bottom: 80px;
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
        li:nth-child(1) {
          border: 2px solid #aa0000;
        }
        li:nth-child(2) {
          border: 2px solid #e6c01e;
        }
        li:nth-child(3) {
          border: 2px solid $grassgreen;
        }
        li:nth-child(4) {
          border: 2px solid #5196e6;
        }
      }
    }
    .text-area {
      box-sizing: border-box;
      width: 100%;
      position: absolute;

      a {
        color: $grassgreen;
      }
    }
    .background-area {
      width: 100%;
      height: 100%;
      background-image: url("../assets/bg.png");
      background-size: cover;
      background-position: center;
      &::after {
        content: " ";
        background: #222;
        opacity: 0.6;
        width: 100%;
        height: 100%;
        display: block;
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
      a:link,
      a:visited {
        color: #dee2e6;
      }
      a:hover {
        color: #fff;
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
        width: 100%;
        @include pc-width {
          width: 298px;
        }
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
