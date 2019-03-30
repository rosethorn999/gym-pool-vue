<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/stockvault-fitness-center106597.jpg"> -->
    <!-- <Asks/> -->
    <h2>Asks</h2>
    <input type="button" value="ADD" @click="addRecord">
    <input type="button" value="READ" @click="readRecord">
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>gymType</th>
            <th>expiryDate</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="asks===null">
            <td colspan="4">
              <img src="../assets/loading.gif">
            </td>
          </tr>
          <tr v-if="asks&&asks.length===0">
            <td colspan="4">None</td>
          </tr>
          <tr v-for="(item,ind) in asks" :key="item.id" @click="checkout(item.id)">
            <th>{{ind+1}}</th>
            <td>{{gymTypeCaption(item.gymType)}}</td>
            <td>{{item.expiryDate}}</td>
            <td>${{item.price}}</td>
            <!-- 平均每月售價 -->
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <!-- todo 翻頁 -->
            <!-- <td colspan="4">Prev&nbsp;|&nbsp;Next</td> -->
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Asks from "@/components/Ask.vue";

export default {
  name: "home",
  components: {
    // Asks
  },
  mounted: function() {
    this.db = firebase.firestore();
    this.readRecord();
  },
  data: function() {
    return {
      db: null,
      asks: null,
      gymTypes: [
        { val: 0, name: "健身工廠" },
        { val: 1, name: "全真會館" },
        { val: 2, name: "世界健身" },
        { val: 3, name: "成吉思汗" },
        { val: 4, name: "台北健身院" },
        { val: 999, name: "其他" }
      ]
    };
  },
  methods: {
    addRecord() {
      this.$router.push({ name: "add" });
    },
    readRecord() {
      this.asks = [];
      this.db
        .collection("sell")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.asks.push(doc.data());
          });
        });
    },
    checkout(id) {
      this.$router.push({ name: "contract", params: { contractId: id } });
    },
    gymTypeCaption: function(v) {
      let selected = this.gymTypes.filter(function(item) {
        return item.val === v;
      });
      if (selected.length > 0) {
        return selected[0].name;
      } else {
        return "error";
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

.table-container {
  width: 100%;
  overflow: auto;
  padding-bottom: 50px;
  // display: none;
}
table {
  border-spacing: 0;
  margin: 0 auto;
  border-collapse: collapse;
  table-layout: fixed;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  thead {
    tr {
      height: 56px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      th:first-child {
        width: 3em;
        word-break: break-all;
      }
    }
  }
  tbody {
    tr {
      height: 48px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      transition: background 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      &:hover {
        background: #eee;
      }
    }
  }
  tfoot {
    tr {
      height: 56px;
      text-align: right;
      td {
        padding-right: 2rem;
      }
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
