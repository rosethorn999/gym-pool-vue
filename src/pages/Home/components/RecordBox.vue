<template>
  <div class="record-box" :class="{'xs':fitXs}">
    <div class="image-block">
      <img src="../assets/world_gym__1448962972_16f5e373.jpg" />
    </div>
    <div class="text-box-left">
      <p class="font-size-20">{{ title }}</p>
      <p class="font-size-18">{{ gym_typeCaption }} {{ store }}</p>
      <p class="darkgray-text font-size-14">{{ remark }}</p>
    </div>
    <div class="text-box-right">
      <p
        class="gray-text font-size-20"
      >{{ $t("processing_fee") }}: {{processing_fee}}{{ $t("yuan") }}</p>
      <p
        class="gray-text font-size-20"
      >{{$t("monthly_rental")}}: {{monthly_rental}} / {{ $t("month") }}</p>
      <div>
        <p id="price" class="blue-text font-size-24">NT{{ price }}</p>
        <p id="expiry_date" class="gray-text font-size-20">{{ $t("expiry_date") }}: {{ yyyymm }}</p>
        <div style="clear: both;"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecordBox",
  props: {
    r: {
      type: Object,
      default: () => {
        return {};
      }
    },
    fitXs: { type: Boolean, default: false }
  },
  data: function() {
    return {
      title: null,
      store: null,
      gym_type: 1,
      expiry_date: null,
      monthly_rental: null,
      processing_fee: null,
      remark: null,

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
    gym_typeCaption() {
      let v = this.gym_type;
      let selected = this.selection.gym_types.filter(function(item) {
        return item.val === v;
      });
      if (selected.length > 0) {
        return selected[0].name;
      } else {
        return this.$t("disComputable");
      }
    },
    price() {
      let d = new Date(this.expiry_date).getTime();
      let now = new Date().getTime();

      const monthCount = Math.round((d - now) / 1000 / 60 / 60 / 24 / 30);
      return this.monthly_rental * monthCount + this.processing_fee;
    },
    yyyymm: function() {
      let d = new Date(this.expiry_date);
      let yyyy = d.getFullYear();
      let mm = d.getMonth() + 1;
      return yyyy + "/" + mm + this.$t("month");
    }
  },
  mounted() {
    this.title = this.r.title;
    this.store = this.r.store;
    this.gym_type = this.r.gym_type;
    this.expiry_date = this.r.expiry_date;
    this.monthly_rental = this.r.monthly_rental;
    this.processing_fee = this.r.processing_fee;
    this.remark = this.r.remark;
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.font-size-24 {
  font-size: 24px;
}
.font-size-20 {
  font-size: 20px;
}
.font-size-18 {
  font-size: 18px;
}
.font-size-14 {
  font-size: 14px;
}
.gray-text {
  color: $gray;
}
.darkgray-text {
  color: $darkgray;
}
.blue-text {
  color: $blue;
}

.record-box {
  display: block;
  width: 100%;
  height: auto;
  margin-bottom: 35px;
  padding: 20px $phone-padding;
  box-shadow: 0px 3px 6px #00000029;
  cursor: pointer;
  opacity: 0.9;
  background: #ffffff;
  &:hover {
    opacity: 1;
  }
  @include pc-width {
    width: 100%;
    height: 143px;
    padding: 10px 15px;
    font-size: $pc-font-size;
    min-height: auto;
    display: flex;
  }
  p {
    margin: 0px;
    line-height: 1.5rem;
    @include pc-width {
      line-height: 2rem;
    }
  }
  .image-block {
    width: 100%;
    height: 122px;
    border: 1px solid #707070;
    min-width: 150px;
    overflow: hidden;
    @include pc-width {
      width: 213px;
      height: 100%;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
  .text-box-left {
    padding-top: 10px;
    text-align: left;
    @include pc-width {
      flex: 3;
      padding-left: 3%;
    }
  }
  .text-box-right {
    padding-top: 20px;
    text-align: right;
    @include pc-width {
      flex: 3;
      padding-right: 3%;
    }
  }
  #price {
    float: left;
  }
  #expiry_date {
    float: right;
  }
}

.record-box.xs {
  display: block;
  width: 100%;
  height: auto;
  margin-bottom: 35px;
  padding: 20px $phone-padding;
  box-shadow: 0px 3px 6px #00000029;
  cursor: pointer;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
  @include pc-width {
  }
  p {
    margin: 0px;
    line-height: 1.5rem;
    @include pc-width {
    }
  }
  .image-block {
    width: 100%;
    height: 122px;
    border: 1px solid #707070;
    min-width: 150px;
    overflow: hidden;
    @include pc-width {
    }
    img {
      width: 100%;
      height: auto;
    }
  }
  .text-box-left {
    padding-top: 10px;
    text-align: left;
    @include pc-width {
    }
  }
  .text-box-right {
    padding-top: 20px;
    text-align: right;
    @include pc-width {
    }
  }
  #price {
    float: left;
  }
  #expiry_date {
    float: right;
  }
}
</style>
