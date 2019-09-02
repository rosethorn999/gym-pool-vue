<template>
  <div class="contract">
    <div class="container">
      <div class="block">
        <h3>{{ $t("basicInfo") }}</h3>
        <div class="form-group">
          <label>{{ $t("_id") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="id" disabled />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("title") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="text" v-model="title" />
            </div>
          </div>
        </div>
      </div>
      <div class="block">
        <h3>{{ $t("productInfo") }}</h3>
        <div class="form-group">
          <label>{{ $t("price") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="number" v-model.number="price" disabled />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("monthly_rental") }}</label>
          <div class="control-box">
            <div class="control-box">
              <input type="number" v-model.number="monthlyRental" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("gym_type") }}</label>
          <div class="control-box">
            <select v-model="gymType">
              <option :value="-1">{{$t('gym_type')}}</option>
              <option
                v-for="item in selection.gymTypes"
                :key="item.val"
                :value="item.val"
              >{{item.name}}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("store") }}</label>
          <div class="control-box">
            <input type="text" v-model="store" />
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("location") }}</label>
          <div class="control-box">
            <input type="text" v-model="location" />
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("expiryDate") }}</label>
          <div class="control-box">
            <div>
              <input type="date" />
              <div class="expiryDate">{{productLife}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="block">
        <h3>{{ $t("storeInfo") }}</h3>
        <div class="form-group">
          <label>{{ $t("storeFeature") }}</label>
          <div class="control-box">
            <template v-for="(f,index) in selection.features">
              <label :for="f.val" :key="index">
                <input type="checkbox" :id="f.val" :value="f.val" v-model="features" />
                {{f.caption}}
              </label>
            </template>
          </div>
        </div>
      </div>
      <div class="block">
        <h3>{{ $t("feeInfo") }}</h3>
        <div class="form-group">
          <label>{{ $t("processing_fee") }}</label>
          <div class="control-box">
            <input type="text" v-model="processing_fee" />
          </div>
        </div>
      </div>
      <div class="block">
        <h3>{{ $t("otherInfo") }}</h3>
        <div class="form-group">
          <label>{{ $t("remark") }}</label>
          <div class="control-box">
            <input type="text" v-model="remark" />
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("create_time") }}</label>
          <div class="control-box">
            <input type="text" v-model="create_time" disabled />
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("deal_date") }}</label>
          <div class="control-box">
            <input type="text" v-model="deal_date" disabled />
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("markAsSoldout") }}</label>
          <div class="control-box">
            <div>
              <label>
                {{ $t("yes") }}
                <input type="checkbox" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="button-box">
        <input type="button" class="btn" :value="$t('cancal')" @click="backToList" />
        <input type="button" class="btn blue" :value="$t('done')" @click="done" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addRecord",
  props: {},
  data() {
    return {
      id: "",
      title: "",
      price: null,
      gymType: -1,
      store: "",
      monthlyRental: null,
      location: "",
      expiryDate: "",
      create_time: "",
      deal_date: "",
      remark: "",
      features: [],
      processing_fee: 0,

      selection: {
        gymTypes: [
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
    gymTypeCaption() {
      let v = this.gymType;
      let selected = this.selection.gymTypes.filter(function(item) {
        return item.val === v;
      });
      if (selected.length > 0) {
        return selected[0].name;
      } else {
        return this.$t("disComputable");
      }
    },
    productLife() {
      // TODO calc
      let ret = "";

      // let now = new Date();
      // let nowYYYY = now.getFullYear();
      // let nowMM = now.getMonth() + 1;

      // let expiryArr = this.expiryDate.map(function(item) {
      //   return Number(item);
      // });
      // let YYYY = expiryArr[0];
      // let MM = expiryArr[1];
      // if (YYYY === -1 || MM === -1) {
      //   ret = this.$t("disComputable");
      // } else if (nowYYYY > YYYY) {
      //   ret = this.$t("expired");
      // } else if (nowYYYY === YYYY && nowMM >= MM) {
      //   ret = this.$t("expired");
      // } else {
      //   let life = MM - nowMM < 0 ? 12 - nowMM + MM + this.$t("month") : MM - nowMM + this.$t("month");
      //   if (YYYY > nowYYYY) {
      //     let gap = MM - nowMM < 0 ? -1 : 0;
      //     if (YYYY - nowYYYY + gap !== 0) {
      //       ret = YYYY - nowYYYY + gap + this.$t("year");
      //     }
      //   }
      //   ret += life;
      // }

      ret = "X" + this.$t("month");
      return ret;
    }
  },
  mounted() {},
  methods: {
    backToList() {
      this.$router.push({ name: "index" });
    },
    done() {
      // TODO save
      this.$router.push({ name: "index" });
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

.container {
  width: 100%;
  padding: 50px 250px;
}

.block {
  width: 100%;

  background: #ffffff;
  box-shadow: 0px 3px 6px #00000029;
  padding: 10px 20px;
  margin-bottom: 30px;
  h3 {
    color: #0350cc;
  }
  > div {
    padding: 0px 180px;
  }
}
.form-group {
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  label {
    text-align: right;
    flex: 1;
    min-width: 80px;
    padding-right: 18px;
  }
  .control-box {
    flex: 4;
    width: 100%;
    > div,
    > input,
    > select {
      width: 100%;
    }
  }
}
.button-box {
  text-align: right;
}
</style>
