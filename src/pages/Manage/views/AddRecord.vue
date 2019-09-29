<template>
  <div class="record">
    <div class="container">
      <div class="block">
        <h3>{{ $t("basicInfo") }}</h3>
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
              <input type="number" v-model.number="monthly_rental" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("gym_type") }}</label>
          <div class="control-box">
            <select v-model="gym_type">
              <option :value="-1">{{$t('gym_type')}}</option>
              <option
                v-for="item in selection.gym_types"
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
            <select v-model="county">
              <option :value="null">{{$t('county')}}</option>
              <option
                v-for="county in selection.zipcode"
                :key="county.name"
                :value="county.name"
              >{{county.name}}</option>
            </select>
            <select v-model="district">
              <option :value="null">{{$t('district')}}</option>
              <option
                v-for="district in districts"
                :key="district.name"
                :value="district.name"
              >{{district.name}}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t("expiry_date") }}</label>
          <div class="control-box">
            <DatePick :isFullYYYY="false" v-model="expiry_date" />
            <div class="expiry_date">{{productLife}}</div>
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
            <input type="text" v-model.number="processing_fee" />
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
      </div>

      <div class="button-box">
        <input type="button" class="btn" :value="$t('cancal')" @click="backToList" />
        <input type="button" class="btn blue" :value="$t('done')" @click="done" />
      </div>
    </div>
  </div>
</template>

<script>
import zipcode from "@/assets/twZipCode.json";
import Swal from "sweetalert2";
import DatePick from "../components/DatePick.vue";
const { basicRequest } = require("@/apis/api.js");

export default {
  name: "addRecord",
  components: { DatePick },
  props: {},
  data() {
    return {
      title: "",
      gym_type: -1,
      store: "",
      monthly_rental: null,
      county: "",
      district: "",
      expiry_date: "",
      remark: "",
      features: [],
      processing_fee: 0,

      selection: {
        zipcode: zipcode,
        gym_types: [
          { val: 1, name: "健身工廠" },
          { val: 2, name: "全真會館" },
          { val: 3, name: "世界健身" },
          { val: 4, name: "成吉思汗" },
          { val: 5, name: "台北健身院" },
          { val: 999, name: "其他" }
        ],
        features: [
          { val: 1, caption: this.$t("features.saunaRoom") },
          { val: 2, caption: this.$t("features.swimPool") },
          { val: 3, caption: this.$t("features.fitnessClass") },
          { val: 4, caption: this.$t("features.freeParking") }
        ]
      }
    };
  },
  computed: {
    districts() {
      let ret = [];
      let selectedDistricts = this.selection.zipcode.filter(item => {
        return item.name === this.county;
      });

      if (selectedDistricts.length > 0) {
        ret = selectedDistricts[0].districts;
      }
      return ret;
    },
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
    productLife() {
      let ret = "";

      let now = new Date();
      let nowYYYY = now.getFullYear();
      let nowMM = now.getMonth() + 1;

      let expiryArr = this.expiry_date.split("-");
      expiryArr = expiryArr.map(function(item) {
        return Number(item);
      });
      let YYYY = expiryArr[0];
      let MM = expiryArr[1];
      if (YYYY === -1 || MM === -1) {
        ret = this.$t("disComputable");
      } else if (nowYYYY > YYYY) {
        ret = this.$t("expired");
      } else if (nowYYYY === YYYY && nowMM >= MM) {
        ret = this.$t("expired");
      } else {
        ret = this.$t("remain");
        let life = MM - nowMM < 0 ? 12 - nowMM + MM : MM - nowMM;
        life += this.$t("ge") + this.$t("month");
        if (YYYY > nowYYYY) {
          let gap = MM - nowMM < 0 ? -1 : 0;
          if (YYYY - nowYYYY + gap !== 0) {
            ret += YYYY - nowYYYY + gap + this.$t("year");
          }
        }
        ret += life;
      }

      return ret;
    },
    price() {
      let monthCount = 12; // TODO calc real months
      return this.monthly_rental * monthCount + this.processing_fee;
    }
  },
  mounted() {},
  methods: {
    backToList() {
      this.$router.push({ name: "Index" });
    },
    done() {
      let url = "/record/";
      let o = {
        monthly_rental: this.monthly_rental,
        title: this.title,
        processing_fee: this.processing_fee,
        store: this.store,
        county: this.county,
        district: this.district,
        remark: this.remark,
        inventory: 1, // Fix to 1
        expiry_date: this.expiry_date,
        gym_type: this.gym_type,
        features: this.features
      };
      basicRequest
        .post(url, o)
        .then(() => {
          Swal.fire(this.$t("done"), "", "success").then(() => {
            this.$router.push({ name: "Index" });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
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
