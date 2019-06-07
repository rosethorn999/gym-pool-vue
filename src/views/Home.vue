<template>
  <div class="home">
    <input type="text" name="usrname">
    <!-- <img alt="Vue logo" src="../assets/stockvault-fitness-center106597.jpg"> -->
    <!-- <Asks/> -->
    <h2>{{$t('selling')}}</h2>
    <input type="button" @click="addRecord">
    <!-- :value="$t('addRecord')" -->
    <!-- <input type="button" :value="$t('filter')" @click="triggerFilterModal"> -->
    <!-- <input type="button" :value="$t('refresh')" @click="readRecord"> -->
    <div class="table-container">
      <table >
        <thead>
          <!-- todo filter -->
          <tr>
            <th @click="orderBy('postDate')">
              #
              <img
                v-show="isShowSortIcon('postDate','asc')"
                src="../assets/iconfinder_sort_incr_18917.png"
              >
              <img
                v-show="isShowSortIcon('postDate','desc')"
                src="../assets/iconfinder_sort_decrease_18916.png"
              >
            </th>
            <th @click="orderBy('gymType')">
              {{$t('gymType')}}
              <img
                v-show="isShowSortIcon('gymType','asc')"
                src="../assets/iconfinder_sort_incr_18917.png"
              >
              <img
                v-show="isShowSortIcon('gymType','desc')"
                src="../assets/iconfinder_sort_decrease_18916.png"
              >
            </th>
            <th @click="orderBy('expiryDate')">
              {{$t('productLife')}}
              <img
                v-show="isShowSortIcon('expiryDate','asc')"
                src="../assets/iconfinder_sort_incr_18917.png"
              >
              <img
                v-show="isShowSortIcon('expiryDate','desc')"
                src="../assets/iconfinder_sort_decrease_18916.png"
              >
            </th>
            <th @click="orderBy('price')">
              {{$t('price')}}
              <img
                v-show="isShowSortIcon('price','asc')"
                src="../assets/iconfinder_sort_incr_18917.png"
              >
              <img
                v-show="isShowSortIcon('price','desc')"
                src="../assets/iconfinder_sort_decrease_18916.png"
              >
            </th>
            <th>{{$t('price')}}/{{$t('month')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="asks===null">
            <td colspan="4">
              <img src="../assets/loading.gif">
            </td>
          </tr>
          <tr v-if="asks&&asks.length===0">
            <td colspan="5">{{$t('none')}}</td>
          </tr>
          <tr v-for="(item) in asks" :key="item.id" @click="checkout(item.id)">
              <td  colspan="5">
                  <table class="table-box">
                   <tr>
                              <td class="image-block" colspan="1">
                                              <div class="image-box">
                                                                <img src="../assets/world_gym__1448962972_16f5e373.jpg" alt>
                                                                              </div>
                                                                                          </td>
            <td colspan="5" class="image-Text">
              <div class="text-left">
                <h4>{{gymTypeCaption(item.gymType)}}</h4>
                <p>{{item.location}}</p>
                <p>{{item.remark}}</p>
              </div>
              <div class="text-center">
                <p>NT:{{item.price}}</p>
              </div>
              <div class="text-right">
                <p>轉讓費:300元</p>
                <p>{{getUnitPrice(item.expiryDate,item.price)}}</p>
                <h5>{{getProductLife(item.expiryDate)}}</h5>
              </div>
            </td>
            <!-- <td><div class="image-box">
              <img src="../assets/world_gym__1448962972_16f5e373.jpg" alt="">
              </div>
              </td>
            <td>{{gymTypeCaption(item.gymType)}}</td>
            <td>{{getProductLife(item.expiryDate)}}</td>
            <td>${{item.price}}</td>
            <td>{{getUnitPrice(item.expiryDate,item.price)}}</td>-->
                            </tr>
                             </table>
              </td>
            
            </tr>

        </tbody>
        <tfoot>
          <tr>
            <td colspan="5">
              <span>{{$t('pageNow')}} {{pagination.pageIndex+1}}</span>
              &nbsp;|&nbsp;
              <span @click="pageControl(-1)">{{$t('prevPage')}}</span>
              &nbsp;|&nbsp;
              <span @click="pageControl(1)">{{$t('nextPage')}}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="modal" v-show="isModalShow">
      <div class="modal-header"></div>
      <div class="modal-body"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Asks from "@/components/Ask.vue";
import * as firebase from "firebase/app";
import "firebase/firestore";

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
      pagination: { pageSize: 20, pageIndex: 0, noNext: false, lastData: {} },
      sorting: { name: "postDate", way: "asc" },
      gymTypes: [
        { val: 0, name: "健身工廠" },
        { val: 1, name: "全真會館" },
        { val: 2, name: "世界健身" },
        { val: 3, name: "成吉思汗" },
        { val: 4, name: "台北健身院" },
        { val: 999, name: "其他" }
      ],

      isModalShow: false
    };
  },
  methods: {
    pageControl(pager) {
      if (pager === -1 && this.pagination.pageIndex === 0) {
        console.log("page index is 0");
        return;
      } else if (pager === 1 && this.pagination.noNext) {
        console.log("no next page");
        return;
      }
      this.pagination.pageIndex += pager;
      let sortWay = this.sorting.way;
      let sortName = this.sorting.name;

      let startCursor = this.pagination.lastData[sortName];
      let endCursor = this.asks[0][sortName];
      let cursor = startCursor;
      console.log("sortName:" + sortName + ", sortWay:" + sortWay);
      console.log("startAt:" + startCursor);
      console.log("endAt:" + endCursor);

      if (pager < 0) {
        //PREV
        sortWay = sortWay === "desc" ? "asc" : "desc";
        cursor = endCursor;
      }
      this.db
        .collection("sell")
        .orderBy(sortName, sortWay)
        .startAt(cursor)
        .limit(this.pagination.pageSize + 1)
        .get()
        .then(querySnapshot => {
          this.asks = [];
          let size = querySnapshot.docs.length;
          this.pagination.noNext = this.pagination.pageSize >= size;
          console.log(this.pagination.pageSize, size);
          if (pager > 0) {
            //NEXT
            for (let i = 0; i < size; i++) {
              let d = querySnapshot.docs[i].data();
              if (i < this.pagination.pageSize) {
                this.asks.push(d);
              } else {
                this.pagination.lastData = d;
              }
            }
          } else {
            //PREV
            for (let i = size - 1; i >= 0; i--) {
              let d = querySnapshot.docs[i].data();
              if (i > 0) {
                this.asks.push(d);
              } else {
                this.pagination.lastData = d;
              }
            }
          }
        });
    },
    isShowSortIcon(name, way) {
      return this.sorting.name === name && this.sorting.way === way;
    },
    orderBy(sortName) {
      let sortingWay = this.sorting.way;
      let sortingName = this.sorting.name;
      let sortWay = "asc";
      this.pagination.pageIndex = 0;
      if (sortingName === sortName) {
        if (sortingWay === "desc") {
          sortName = "postDate";
          sortWay = "asc";
        } else {
          sortWay = "desc";
        }
      }
      this.sorting.way = sortWay;
      this.sorting.name = sortName;
      console.log("sortName:" + sortName + ", sortWay:" + sortWay);
      this.db
        .collection("sell")
        .orderBy(sortName, sortWay)
        .limit(this.pagination.pageSize + 1)
        .get()
        .then(querySnapshot => {
          this.asks = [];
          let size = querySnapshot.docs.length;
          this.pagination.noNext = this.pagination.pageSize >= size;
          for (let i = 0; i < size; i++) {
            let d = querySnapshot.docs[i].data();
            if (i < this.pagination.pageSize) {
              this.asks.push(d);
            } else {
              this.pagination.lastData = d;
            }
          }
        });
    },
    getProductLife(expiryDate) {
      let ret = "";

      let now = new Date();
      let nowYYYY = now.getFullYear();
      let nowMM = now.getMonth() + 1;

      if (expiryDate) {
        let expiryArr = expiryDate.split("/").map(function(item) {
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
      } else {
        ret = this.$t("disComputable");
      }

      return ret;
    },
    getUnitPrice(expiryDate, price) {
      let ret = "";
      if (expiryDate) {
        let now = new Date();
        let nowYYYY = now.getFullYear();
        let nowMM = now.getMonth() + 1;

        let expiryArr = expiryDate.split("/").map(function(item) {
          return Number(item);
        });
        let YYYY = expiryArr[0];
        let MM = expiryArr[1];
        let isExpired = nowYYYY > YYYY || (nowYYYY === YYYY && nowMM >= MM); //現在年>到期年 || 同一年且現在月>到期月
        if (isExpired) {
          ret = this.$t("expired");
        } else if (YYYY === -1 || MM === -1) {
          ret = this.$t("disComputable");
        } else {
          ret = "$" + Math.floor(price / ((YYYY - nowYYYY) * 12 + (MM - nowMM)));
        }
      }
      return ret;
    },
    addRecord() {
      this.$router.push({ name: "add" });
    },
    readRecord() {
      this.asks = [];

      let sortWay = this.sorting.way;
      let sortName = this.sorting.name;
      console.log("sortName:" + sortName + ", sortWay:" + sortWay);
      this.pagination.pageIndex = 0;
      this.db
        .collection("sell")
        .orderBy(sortName, sortWay)
        .limit(this.pagination.pageSize + 1)
        .get()
        .then(querySnapshot => {
          this.asks = [];
          let size = querySnapshot.docs.length;
          this.pagination.noNext = this.pagination.pageSize >= size;
          for (let i = 0; i < size; i++) {
            let d = querySnapshot.docs[i].data();
            if (i < this.pagination.pageSize) {
              this.asks.push(d);
            } else {
              this.pagination.lastData = d;
            }
          }
        });
    },
    checkout(id) {
      this.$router.push({ name: "contract", params: { contractId: id } });
    },
    triggerFilterModal() {
      this.isModalShow = !this.isModalShow;
    },
    gymTypeCaption(v) {
      let selected = this.gymTypes.filter(function(item) {
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
.home {
  input[type="text"] {
    margin: 20px;
    width: 30%;
    min-width: 250px;
    display: block;
  }
  h2 {
    display: block;
    text-align: start;
    margin: 10px 25px;
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
  .image-Text {
    width: 100%;
    vertical-align: top;

    .text-left {
      float: left;
      width: 30%;
      text-align: start;
      padding-left: 5%;

      h4 {
        font-weight: bold;
        margin-top: 15px;
        font-size: 18px;
      }
      p {
        margin: 10px 0 0;
        width: 95%;
        overflow: hidden;
        font-size: 14px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
  .text-center {
    width: 30%;
    float: left;
    margin-top: 15px;
    font-size: 1.4em;
    color: #1597fa;
    p {
      text-align: end;
    }
  }
  .text-right {
    width: 30%;
    float: left;
    margin-top: 15px;
    p {
      text-align: end;
      margin-bottom: 10px;
    }
    h5 {
      text-align: end;
      font-size: 1em;
    }
  }
}
.table-container {
  width: 100%;
  overflow: auto;
  padding-bottom: 50px;
  padding: 1%;
  // display: none;
  .table-box {
    margin-bottom: 30px;
    box-shadow: 0 0 5px 2px #cbcbcb;
  }
}
table {
  border-spacing: 0;
  margin: 0 auto;
  border-collapse: collapse;
  table-layout: fixed;
  thead {
    tr {
      height: 56px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      th {
        cursor: pointer;
        &:first-child {
          word-break: break-all;
        }
      }
    }
  }
  tbody {
    tr {
      height: 48px;
      // border-bottom: 1px solid rgba(0, 0, 0, 0.12);
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
        padding-right: 50%;
        span {
          cursor: pointer;
        }
      }
    }
  }
  //電腦版
  @include pc-width {
    width: 100%;
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
</style>
