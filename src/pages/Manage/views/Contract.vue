<template>
  <div class="contract">
    <h2>{{$t('checkoutRecordPageDescription')}}</h2>
    <div class="container">
      <div class="form">
        <div>
          <input type="number" v-model.number="price" :placeholder="$t('price')" disabled />
        </div>
        <div class="control-container">
          <select v-model="gymType" disabled>
            <option :value="-1">{{$t('gymType')}}</option>
            <option
              v-for="item in selection.gymTypes"
              :key="item.val"
              :value="item.val"
            >{{item.name}}</option>
          </select>
        </div>
        <div>
          <input type="text" v-model="location" :placeholder="$t('location')" disabled />
        </div>
        <div>
          <input type="number" v-model="monthlyRental" :placeholder="$t('monthlyRental')" disabled />
        </div>
        <div>
          <textarea v-model="remark" :placeholder="$t('remark')" disabled></textarea>
        </div>
        <div>
          <select class="expiryDate" v-model="expiryDate[0]" disabled>
            <option :value="-1">{{$t('expiry')}}{{$t('year')}}</option>
            <option v-for="item in selection.YYYY" :key="item" :value="item">{{item}}</option>
          </select>
          <select class="expiryDate" v-model="expiryDate[1]" disabled>
            <option :value="-1">{{$t('expiry')}}{{$t('month')}}</option>
            <option v-for="item in selection.MM" :key="item" :value="item">{{item}}</option>
          </select>
          <select class="expiryDate" v-model="expiryDate[2]" disabled>
            <option :value="-1">{{$t('expiry')}}{{$t('day')}}</option>
            <option v-for="item in selection.DD" :key="item" :value="item">{{item}}</option>
          </select>
          <div class="expiryDate">{{productLife}}</div>
        </div>
        <div>
          <label>{{$t('features.label')}}:&nbsp;</label>
          <template v-for="(f,index) in selection.features">
            <label :for="f.val" :key="index">
              <input type="checkbox" :id="f.val" :value="f.val" v-model="features" disabled />
              {{f.caption}}
            </label>
          </template>
        </div>
        <div>
          <label>{{$t('contact')}}:&nbsp;</label>
          <template v-for="(value, key) in contact">
            <img
              class="contact-img"
              v-if="key==='tel'"
              src="../assets/iconfinder_phone_1807538.png"
              :key="key"
              @click="openContact(key,value)"
            />
            <img
              class="contact-img"
              v-if="key==='mail'"
              src="../assets/iconfinder_aiga_mail_inver_134147.png"
              :key="key"
              @click="openContact(key,value)"
            />
            <img
              class="contact-img"
              v-if="key==='tg'"
              src="../assets/iconfinder_telegram_386727.png"
              :key="key"
              @click="openContact(key,value)"
            />
            <img
              class="contact-img"
              v-if="key==='line'"
              src="../assets/iconfinder_line_1807543.png"
              :key="key"
              @click="openContact(key,value)"
            />
            <img
              class="contact-img"
              v-if="key==='fb'"
              src="../assets/iconfinder_facebook_1807546.png"
              :key="key"
              @click="openContact(key,value)"
            />
          </template>
          <span v-if="Object.keys(contact).length===0">{{$t('none')}}</span>
        </div>
        <div>
          <input type="button" :value="$t('back')" @click="backToList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "contract",
  props: {},
  data() {
    return {
      db: null,

      price: null,
      gymType: -1,
      monthlyRental: null,
      location: "",
      expiryDate: [-1, -1, -1],
      remark: "",
      features: [],
      contact: {},

      selection: {
        gymTypes: [
          { val: 0, name: "健身工廠" },
          { val: 1, name: "全真會館" },
          { val: 2, name: "世界健身" },
          { val: 3, name: "成吉思汗" },
          { val: 4, name: "台北健身院" },
          { val: 999, name: "其他" }
        ],
        YYYY: ["2019", "2020", "'2021'", "2022", "2023", "2024", "2025"],
        MM: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
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
      let ret = "";

      let now = new Date();
      let nowYYYY = now.getFullYear();
      let nowMM = now.getMonth() + 1;

      let expiryArr = this.expiryDate.map(function(item) {
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
        let life = MM - nowMM < 0 ? 12 - nowMM + MM + this.$t("month") : MM - nowMM + this.$t("month");
        if (YYYY > nowYYYY) {
          let gap = MM - nowMM < 0 ? -1 : 0;
          if (YYYY - nowYYYY + gap !== 0) {
            ret = YYYY - nowYYYY + gap + this.$t("year");
          }
        }
        ret += life;
      }
      return ret;
    },
    id() {
      return this.$route.params.contractId;
    }
  },
  mounted() {
    this.db = firebase.firestore();

    let _DD = [];
    for (let i = 1; i <= 31; i++) {
      if (i < 10) {
        _DD.push("0" + i);
      } else {
        _DD.push(i.toString());
      }
    }
    this.selection.DD = _DD;
    this.selection.features = [
      { val: "saunaRoom", caption: this.$t("features.saunaRoom") },
      { val: "swimPool", caption: this.$t("features.swimPool") },
      { val: "fitnessClass", caption: this.$t("features.fitnessClass") },
      { val: "freeParking", caption: this.$t("features.freeParking") }
    ];
    this.getContractInfo();
  },
  methods: {
    openContact(type, value) {
      switch (type) {
        case "tel":
          window.open("tel:" + value);
          break;
        case "mail":
          window.open("mailto:" + value);
          break;
        case "tg":
          window.open("https://t.me/" + value);
          break;
        case "line":
          window.open("line://ti/p/" + value);
          break;
        case "fb":
          window.open(value);
          break;
        default:
          console.error("something wrong!");
          break;
      }
    },
    backToList() {
      this.$router.push({ name: "index" });
    },
    getContractInfo() {
      let that = this;
      let id = this.id;
      this.db
        .collection("sell")
        .where("id", "==", id)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            let d = doc.data();

            that.price = d.price;
            that.gymType = d.gymType;
            that.monthlyRental = d.monthlyRental;
            that.location = d.location;
            that.expiryDate = d.expiryDate.split("/");
            that.remark = d.remark;
            that.features = d.features;
            that.postDate = d.postDate;
            that.contact = d.contact;
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
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
  overflow: auto;
  padding-bottom: 50px;
  // display: none;
}
.description {
  text-align: left;
}
.form {
  padding: 16px;
  border-spacing: 0;
  margin: 0 auto;
  border-collapse: collapse;
  table-layout: fixed;

  & > div {
    padding: 12px 0 8px 0;
  }

  .expiryDate {
    width: 25%;
    display: inline-block;
  }
  div.expiryDate {
    text-align: right;
    line-height: 32px;
    @include phone-width {
      font-size: 0.6em;
    }
  }
  //電腦版
  @include pc-width {
    width: 80vw;
    max-width: 100vw;
  }
  //平板
  @include pad-width {
    width: 95vw;
    max-width: 100vw;
  }
  //小平板
  @include small-pad-width {
    width: 100%;
  }
  //手機
  @include phone-width {
    width: 100%;
  }
}
.contact-img {
  cursor: pointer;
  border-radius: 5px;
  margin-left: 3px;
  height: 2rem;
}
</style>
