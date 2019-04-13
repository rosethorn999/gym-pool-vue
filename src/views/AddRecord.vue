<template>
  <div class="addRecord">
    <h2>Add</h2>
    <div class="container">
      <div class="form">
        {{$t('requiredPlaceNotice')}}
        <div>
          <input
            type="number"
            v-model.number="price"
            min="0"
            :placeholder="$t('price')+'*'"
            :class="{danger:formError.tfs.price}"
          >
        </div>
        <div class="control-container">
          <select v-model="gymType" :class="{danger:formError.tfs.gymType}">
            <option :value="-1">{{$t('gymType')}}*</option>
            <option
              v-for="item in selection.gymTypes"
              :key="item.val"
              :value="item.val"
            >{{item.name}}</option>
          </select>
        </div>
        <div>
          <input type="text" v-model="location" :placeholder="$t('location')">
        </div>
        <div>
          <input
            type="number"
            v-model.number="monthlyRental"
            min="0"
            :placeholder="$t('monthlyRental')+'*'"
            :class="{danger:formError.tfs.monthlyRental}"
          >
        </div>
        <div>
          <textarea v-model="remark" :placeholder="$t('remark')"></textarea>
        </div>
        <div>
          <select
            class="expiryDate"
            v-model="expiryDate[0]"
            :class="{danger:formError.tfs.expiryDate}"
          >
            <option :value="-1">{{$t('expiry')}}{{$t('year')}}*</option>
            <option v-for="item in selection.YYYY" :key="item" :value="item">{{item}}</option>
          </select>
          <select
            class="expiryDate"
            v-model="expiryDate[1]"
            :class="{danger:formError.tfs.expiryDate}"
          >
            <option :value="-1">{{$t('expiry')}}{{$t('month')}}*</option>
            <option v-for="item in selection.MM" :key="item" :value="item">{{item}}</option>
          </select>
          <select
            class="expiryDate"
            v-model="expiryDate[2]"
            :class="{danger:formError.tfs.expiryDate}"
          >
            <option :value="-1">{{$t('expiry')}}{{$t('day')}}*</option>
            <option v-for="item in selection.DD" :key="item" :value="item">{{item}}</option>
          </select>
          <div class="expiryDate">{{productLife}}</div>
        </div>
        <div>
          <label>{{$t('features.label')}}:&nbsp;</label>
          <template v-for="(f,index) in selection.features">
            <label :for="f.val" :key="index">
              <input type="checkbox" :id="f.val" :value="f.val" v-model="features">
              {{f.caption}}
            </label>
          </template>
        </div>
        <div>
          <label>{{$t('contact')}}:&nbsp;</label>
          <template v-for="c in selection.contactType">
            <span :key="c" v-if="c==='tel'">
              <img
                class="contact-img"
                src="../assets/iconfinder_phone_1807538.png"
                @click="editContact(c)"
              >
              {{contact.tel}}
            </span>
            <span :key="c" v-if="c==='mail'">
              <img
                class="contact-img"
                src="../assets/iconfinder_aiga_mail_inver_134147.png"
                @click="editContact(c)"
              >
              {{contact.mail}}
            </span>
            <span :key="c" v-if="c==='tg'">
              <img
                class="contact-img"
                src="../assets/iconfinder_telegram_386727.png"
                @click="editContact(c)"
              >
              {{contact.tg}}
            </span>
            <span :key="c" v-if="c==='line'">
              <img
                class="contact-img"
                src="../assets/iconfinder_line_1807543.png"
                @click="editContact(c)"
              >
              {{contact.line}}
            </span>
            <span :key="c" v-if="c==='fb'">
              <img
                class="contact-img"
                src="../assets/iconfinder_facebook_1807546.png"
                @click="editContact(c)"
              >
              {{contact.fb}}
            </span>
          </template>
        </div>
        <div>
          <p class="danger">{{formErrorMsg}}</p>
          <input type="button" :value="$t('cancal')" @click="backToList">
          <input type="button" :value="$t('send')" @click="addNewRecord" :disabled="formError.tf">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Asks from "@/components/Ask.vue";

export default {
  name: "addRecord",
  components: {
    // Asks
  },
  mounted: function() {
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
  },
  data: function() {
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
          //todo 放到store
          { val: 0, name: "健身工廠" },
          { val: 1, name: "全真會館" },
          { val: 2, name: "世界健身" },
          { val: 3, name: "成吉思汗" },
          { val: 4, name: "台北健身院" },
          { val: 999, name: "其他" }
        ],
        YYYY: ["2019", "2020", "'2021'", "2022", "2023", "2024", "2025"],
        MM: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
        contactType: ["tel", "mail", "tg", "line", "fb"]
      }
    };
  },
  computed: {
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
        ret = this.$t("expiredDayMustBigger30days");
      } else if (nowYYYY === YYYY && nowMM >= MM) {
        ret = this.$t("expiredDayMustBigger30days");
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
    formErrorMsg() {
      let ret = "";
      let temp = [];
      let list = this.formError.tfs;
      Object.keys(list).map((objectKey, index) => {
        if (list[objectKey] === true) {
          let caption = this.$t(objectKey);
          temp.push(caption);
        }
      });
      if (temp.length > 0) {
        ret = this.$t("error") + ": " + temp.join(", ");
      }
      return ret;
    },
    formError() {
      let ret = false;

      // 有錯是true
      let now = new Date();
      let thrityDay = 1000 * 60 * 60 * 24 * 30;
      let _expiryDate =
        this.expiryDate.some(item => {
          return item === -1;
        }) ||
        new Date(this.expiryDate[0], Number(this.expiryDate[1]) - 1, this.expiryDate[2]).getTime() - thrityDay <=
          now.getTime(); //any column lost || dueDate<30Days
      let _contact = Object.keys(this.contact_tidied).length === 0; //dont have any contact method
      let tfs = {
        gymType: this.gymType === -1,
        monthlyRental: typeof this.monthlyRental !== "number" || this.monthlyRental < 0,
        expiryDate: _expiryDate,
        price: typeof this.price !== "number" || this.price < 0,
        contact: _contact
      };

      ret = ret || tfs.gymType || tfs.monthlyRental || tfs.expiryDate || tfs.price || tfs.contact;

      return { tf: ret, tfs: tfs };
    },
    contact_tidied() {
      let ret = {};
      const keys = Object.keys(this.contact);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const v = this.contact[k].trim();
        if (v !== "") {
          ret[k] = v;
        }
      }
      return ret;
    }
  },
  methods: {
    editContact(type) {
      let msg = "";
      switch (type) {
        case "tel":
          msg = this.$t("keyingPhoneNumber");
          break;
        case "mail":
          msg = this.$t("keyingMailAddr");
          break;
        case "tg":
          msg = this.$t("keyingTGID");
          break;
        case "line":
          msg = this.$t("keyingLineID");
          break;
        case "fb":
          msg = this.$t("keyingFBProfileUrl");
          break;
        default:
          console.error("something wrong!");
          break;
      }

      let value = prompt(msg, this.contact[type]);
      this.$set(this.contact, type, value);
    },
    backToList() {
      this.$router.push({ name: "home" });
    },
    addNewRecord() {
      //todo 後端輸入檢查
      let that = this;
      let id = this._uuid();
      let _postDate = new Date().toISOString();
      let _expiryDate = this.expiryDate.join("/");

      let pack = {
        id: id,
        gymType: this.gymType,
        monthlyRental: this.monthlyRental,
        expiryDate: _expiryDate,
        price: this.price,
        postDate: _postDate,
        location: this.location,
        remark: this.remark,
        features: this.features,
        contact: this.contact_tidied
      };
      this.db
        .collection("sell")
        .add(pack)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          that.backToList();
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
          //todo 錯誤描述
        });
    },
    _uuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
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
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 3px 0px rgba(0, 0, 0, 0.12);
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
