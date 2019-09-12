<template>
  <div class="recordDetail">
    <div class="container">
      <div class="you-should-know">
        <h1>健身會籍轉讓需知</h1>
        <p>需要注意的事情</p>
      </div>
      <div class="controller" @click="backToList">
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
            <p>{{ $t("location") }}: {{location}}</p>
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
  mounted() {
    let record = localStorage.getItem("record") ? JSON.parse(localStorage.getItem("record")) : {};

    this.id = record._id;
    this.title = record.title;
    this.gym_type = record.gym_type;
    this.store = record.store;
    this.monthly_rental = record.monthly_rental;
    this.location = record.location;
    this.expiry_date = record.expiry_date;
    this.remark = record.remark;
    this.features = record.features;
    this.processing_fee = record.processing_fee;
    this.create_time = record.create_time;
    this.deal_timme = record.deal_timme;
    this.creator = record.creator;
  },
  data: function() {
    return {
      id: "",
      title: "",
      gym_type: -1,
      store: "",
      monthly_rental: null,
      location: "",
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
  methods: {
    backToList() {
      this.$router.push({ name: "Record" });
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

* {
  padding: 0;
  margin: 0;
}
.blue {
  color: #1597fa;
}
.gray {
  color: #989898;
}
.recordDetail {
  background: #f5f7f8;
}
.container {
  padding: 0px 234px;
}

.you-should-know {
  box-sizing: border-box;
  height: 244px;
  background-image: url("../assets/bg.png");
  color: #fff;
  padding: 52px 20%;
  width: 100%;
}
.controller {
  margin: 10px 0px;
  cursor: pointer;
}

.record-container {
  margin-top: 100px;
  padding: 0px 50px 100px 50px;
  .upper-box {
    display: flex;
    margin-bottom: 30px;
    .left-box {
      flex: 1;
      width: 50%;
      .main-image {
        width: 583px;
        border: 1px solid #707070;
      }
      .img-box {
        width: 583px;
        display: flex;
        justify-content: space-between;
        overflow: auto;
        margin: 33px 0px 41px 0px;
        img {
          cursor: pointer;
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
      padding-left: 88px;
      flex: 1;
      width: 50%;
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
    height: 480px;
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
  ul {
    li.list-tiem {
      font-size: 24px;
      padding: 9px;
      display: flex;
      height: 143px;
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 0px 2px 5px #00000029;
      transition: background 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      margin-bottom: 24px;
      &:hover {
        background: #eee;
      }
      div {
        flex: 1;
      }
    }
  }
  .image-block {
    width: 30%;
    min-width: 150px;
    overflow: hidden;
    position: relative;
    padding: 0.5%;
    .image-box {
      width: 80%;
      min-width: 150px;
      height: 120px;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    }
  }
  .pagination-block {
    height: 100px;
    margin-top: 50px;
    text-align: center;
    .pagination-btn {
      margin: 0px 50px;
      padding: 10px 25px;
      border: 1px solid #707070;
      color: #0058e5;
    }
  }
}
</style>
