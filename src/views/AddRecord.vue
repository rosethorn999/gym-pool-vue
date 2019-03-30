<template>
  <div class="addRecord">
    <h2>Add</h2>
    <div class="container">
      <div class="form">
        <div>
          <input type="number" v-model.number="price" placeholder="Price">
        </div>
        <div class="control-container">
          <select v-model="gymType">
            <option :value="-1">Gym Name</option>
            <option v-for="item in gymTypes" :key="item.val" :value="item.val">{{item.name}}</option>
          </select>
        </div>
        <div>
          <input type="text" v-model="location" placeholder="Location">
        </div>
        <div>
          <input type="number" v-model="monthlyRental" placeholder="Monthly Rental">
        </div>
        <div>
          <textarea v-model="remark" placeholder="Remark"></textarea>
        </div>
        <div>
          <select class="expiryDate" v-model="expiryDate[0]">
            <option :value="-1">Expiry Year</option>
            <option v-for="item in selection.YYYY" :key="item" :value="item">{{item}}</option>
          </select>
          <select class="expiryDate" v-model="expiryDate[1]">
            <option :value="-1">Expiry Month</option>
            <option v-for="item in selection.MM" :key="item" :value="item">{{item}}</option>
          </select>
          <select class="expiryDate" v-model="expiryDate[2]">
            <option :value="-1">Expiry Day</option>
            <option v-for="item in selection.DD" :key="item" :value="item">{{item}}</option>
          </select>
          <!-- timePicker -->
          <div class="expiryDate">{{productLife}}</div>
        </div>
        <div>
          <label>Feature</label>
          <input type="checkbox" id="sauna">
          <label for="sauna">Sauna</label>
          <input type="checkbox" id="freeParking">
          <label for="freeParking">Free Parking Lot</label>
          <input type="checkbox" id="fitnessClass">
          <label for="fitnessClass">Free Fitness class</label>
        </div>
        <div>
          <input type="button" value="Confirm" @click="addNewRecord">
          <input type="button" value="Cancal" @click="backToList">
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

      gymTypes: [
        //todo 放到store
        { val: 0, name: "健身工廠" },
        { val: 1, name: "全真會館" },
        { val: 2, name: "世界健身" },
        { val: 3, name: "成吉思汗" },
        { val: 4, name: "台北健身院" },
        { val: 999, name: "其他" }
      ]
    };
  },
  computed: {
    selection() {
      let _DD = [];
      for (let i = 1; i < 31; i++) {
        _DD.push(i);
      }
      return {
        YYYY: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        MM: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        DD: _DD
      };
    },
    productLife() {
      let ret = "";

      let now = new Date();
      let nowYYYY = now.getFullYear();
      let nowMM = now.getMonth() + 1;

      let YYYY = this.expiryDate[0];
      let MM = this.expiryDate[1];
      if (YYYY === -1 || MM === -1) {
        ret = "calc error";
      } else {
        let live = (YYYY - nowYYYY) * 12 + (MM - nowMM);
        ret = live + " months left";
      }

      return ret;
    }
  },
  methods: {
    backToList() {
      this.$router.push({ name: "home" });
    },
    addNewRecord() {
      //todo 輸入檢查
      let that = this;
      let id = this._uuid();
      let _postDate = new Date().toString();
      let _expiryDate = this.expiryDate.toString("/");

      let pack = {
        id: id,
        gymType: this.gymType,
        monthlyRental: this.monthlyRental,
        expiryDate: _expiryDate,
        price: this.price,
        postDate: _postDate,
        _loc: this.location,
        remark: this.remark
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
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
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
textarea:focus,
input:focus {
  outline: none;
}
input[type="number"],
input[type="text"],
select,
textarea {
  border-radius: 2px;
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  width: 100%;
  height: 32px;
}
.form {
  padding: 16px;
  border-spacing: 0;
  margin: 0 auto;
  border-collapse: collapse;
  table-layout: fixed;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  & > div {
    padding: 12px 0 8px 0;
  }

  .expiryDate {
    width: 25%;
    display: inline-block;
  }
  div.expiryDate {
    text-align: right;
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
input[type="button"] {
  color: #fff;
  margin: 6px 8px;
  height: 36px;
  padding: 6px;
  font-size: 14px;
  background-color: #4caf50;
  border-radius: 2px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
</style>
