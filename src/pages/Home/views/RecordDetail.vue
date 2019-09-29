<template>
  <div class="recordDetail">
    <div class="you-should-know">
      <h1>{{ $t("transferMustKnow") }}</h1>
      <p>{{ $t("somethingToNotice") }}</p>
    </div>
    <div class="container">
      <div class="controller" @click="goBack">
        <img src="https://via.placeholder.com/40x25" />
        {{ $t("back") }}
      </div>
      <div class="record-container">
        <div class="upper-box">
          <div class="left-box">
            <img class="main-image" src="https://via.placeholder.com/583x334" />
            <div class="img-box">
              <img src="https://via.placeholder.com/105x60" />
              <img src="https://via.placeholder.com/105x60" />
              <img src="https://via.placeholder.com/105x60" />
              <img src="https://via.placeholder.com/105x60" />
              <img src="https://via.placeholder.com/105x60" />
              <img src="https://via.placeholder.com/105x60" />
              <img src="https://via.placeholder.com/105x60" />
            </div>
            <div class="tag-box">
              <a href="#">#tag</a>
              <a href="#">#tag</a>
              <a href="#">#tag</a>
              <a href="#">#tag</a>
              <a href="#">#tag</a>
              <a href="#">#tag</a>
              <a href="#">#tag</a>
              <a href="#">#tag</a>
              <a href="#">#tag</a>
              <a href="#">#tag</a>
              <a href="#">#tag</a>
              <a href="#">#tag</a>
              <a href="#">#tag</a>
            </div>
          </div>
          <div class="right-box">
            <h1>{{title}}</h1>
            <h3>{{gym_typeCaption(gym_type)}} {{store}}</h3>
            <h4>{{ $t("expiry_date") }}: {{expiry_date}}</h4>
            <p>&nbsp;</p>
            <p>{{ $t("create_time") }}: {{create_time}}</p>
            <p>{{ $t("location") }}: {{county}}{{district}}</p>
            <p>{{ $t("sellerInfo") }}: {{creator}}</p>
            <h3>&nbsp;</h3>
            <h1>
              {{ $t("price") }} :
              <span class="blue">NT{{price}}</span>
            </h1>
            <h3 class="gray">{{monthly_rental}}/{{ $t("month") }}</h3>
            <h3 class="gray">{{ $t("processing_fee") }}: {{processing_fee}}{{ $t("yuan") }}</h3>
            <div class="contacts-box">
              <img src="https://via.placeholder.com/50" />
              <img src="https://via.placeholder.com/50" />
              <img src="https://via.placeholder.com/50" />
            </div>
          </div>
        </div>

        <div class="bottom-box">
          <div class="header">{{ $t("remark") }}</div>
          <div class="remark">{{remark}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recordDetail",
  components: {},
  data: function() {
    return {
      id: "",
      title: "",
      gym_type: -1,
      store: "",
      monthly_rental: null,
      county: "",
      district: "",
      expiry_date: "",
      create_time: "",
      deal_date: "",
      remark: "",
      features: [],
      processing_fee: 0,
      creator: "",

      selection: {
        gym_types: [
          { val: 0, name: "健身工廠" },
          { val: 1, name: "全真會館" },
          { val: 2, name: "世界健身" },
          { val: 3, name: "成吉思汗" },
          { val: 4, name: "台北健身院" },
          { val: 999, name: "其他" }
        ],
        features: [
          { val: "saunaRoom", caption: this.$t("features.saunaRoom") },
          { val: "swimPool", caption: this.$t("features.swimPool") },
          { val: "fitnessClass", caption: this.$t("features.fitnessClass") },
          { val: "freeParking", caption: this.$t("features.freeParking") }
        ]
      }
    };
  },
  computed: {
    price() {
      // TODO month*monthly_rental+processing_fee
      return 555;
    }
  },
  watch: {},
  mounted() {
    let record = localStorage.getItem("record") ? JSON.parse(localStorage.getItem("record")) : {};

    this.id = record._id;
    this.title = record.title;
    this.gym_type = record.gym_type;
    this.store = record.store;
    this.monthly_rental = record.monthly_rental;
    this.county = record.county;
    this.district = record.district;
    this.expiry_date = record.expiry_date;
    this.remark = record.remark;
    this.features = record.features;
    this.processing_fee = record.processing_fee;
    this.create_time = record.create_time;
    this.deal_date = record.deal_date;
    this.creator = record.creator;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
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
* {
  padding: 0;
  margin: 0;
}
.blue {
  color: $blue;
}
.gray {
  color: #989898;
}
.recordDetail {
  background: #fff;
}
.container {
  padding: $phone-padding;
  @include pc-width {
    padding: 0px $pc-padding;
  }
}

.you-should-know {
  box-sizing: border-box;
  height: 244px;
  background-image: url("../assets/bg.png");
  color: #fff;
  padding: 52px $phone-padding;
  width: 100%;
  @include pc-width {
    padding: 52px $pc-padding;
  }
}
.controller {
  margin: 10px 0px;
  cursor: pointer;
  @include pc-width {
    margin-bottom: 100px;
  }
}

.record-container {
  margin-bottom: 100px;
  @include pc-width {
    margin-bottom: 200px;
  }
  .upper-box {
    display: flex;
    margin-bottom: 30px;
    flex-wrap: wrap;
    .left-box {
      flex: 1;
      width: 100%;
      min-width: 100%;
      @include pc-width {
        min-width: auto;
        width: 50%;
      }
      .main-image {
        width: 100%;
        border: 1px solid #707070;
      }
      .img-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        overflow: auto;
        margin: 33px 0px 41px 0px;
        img {
          cursor: pointer;
          width: 100%;
          flex: 1;
          border: 1px solid #707070;
          max-width: 105px;
          margin-right: 10px;
        }
      }
      .tag-box {
        a {
          display: inline-block;
          margin-right: 18px;
        }
      }
    }
    .right-box {
      flex: 1;
      width: 100%;
      min-width: 100%;
      @include pc-width {
        min-width: auto;
        padding-left: 10%;
        width: 50%;
      }
      h1 {
        line-height: 50px;
      }
      h3 {
        line-height: 35px;
      }
      h4 {
        line-height: 32px;
      }
      p {
        line-height: 20px;
        margin: 3px 0px;
      }
      .contacts-box {
        img {
          cursor: pointer;
          margin: 30px 25px 0px 0px;
        }
      }
    }
  }
  .bottom-box {
    width: 100%;
    height: 400px;
    border: 1px solid #707070;
    .header {
      line-height: 45px;
      height: 45px;
      padding: 0px 25px;
      background: #f4f4f4;
      border-bottom: 1px solid #707070;
    }
    .remark {
      padding: 31px 25px;
    }
  }
}
</style>
