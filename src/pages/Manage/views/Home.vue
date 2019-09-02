<template>
  <div class="home">
    <input type="button" class="add-record" @click="addRecord" />

    <input type="text" id="filterBar" />
    <!-- TODO filter -->
    <div class="list-header">
      <div>
        <h2 id="recordCount">{{$t('selling')}} {{recordCount}}</h2>
      </div>
      <div>
        <select class="sorter">
          <option>時間</option>
          <option>新到舊</option>
          <option>舊到新</option>
        </select>
        <select class="sorter">
          <option>價格</option>
          <option>高到低</option>
          <option>低到高</option>
        </select>
      </div>
    </div>

    <ul>
      <li class="list-tiem" v-for="(r,index) in records" :key="r.id">
        <div class="image-block">
          <div class="image-box">
            <img src="../assets/world_gym__1448962972_16f5e373.jpg" alt="pic" />
          </div>
        </div>
        <div>
          <p>{{r.title}}</p>
          <p>{{gym_typeCaption(r.gym_type)}} {{r.store}}</p>
          <p>{{r.remark}}</p>
        </div>
        <div>
          <p class="blue">NT{{r.monthly_rental}}</p>
        </div>
        <div>
          <p>{{$t("processing_fee")}}: {{r.processing_fee}}</p>
          <p>{{$t("monthlyRental")}}: {{r.monthly_rental}} / {{$t("month")}}</p>
          <p>{{$t("expiryDate")}}: {{r.expiry_date}}</p>
        </div>
        <div>
          <img
            class="more"
            src="../assets/iconfinder_ic_more_vert_48px_352549.png"
            @click="triggerMenu($event,index)"
          />
          <div class="dropdown-menu" :ref="'dropdown-menu'+index">
            <!-- TODO triangle-->
            <a class="dropdown-item">{{ $t("remove") }}</a>
            <!-- TODO  implement-->
            <a class="dropdown-item" @click="checkout(index)">{{ $t("update") }}</a>
          </div>
        </div>
      </li>
      <li v-if="records===null">
        <img src="../assets/loading.gif" />
      </li>
      <li v-if="records&&records.length===0">{{$t('none')}}</li>
    </ul>
    <div class="pagination">
      <span>{{$t('pageNow')}} {{pagination.pageIndex+1}}</span>
      &nbsp;|&nbsp;
      <span @click="pageControl(-1)">{{$t('prevPage')}}</span>
      &nbsp;|&nbsp;
      <span @click="pageControl(1)">{{$t('nextPage')}}</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  components: {},
  mounted: function() {
    this.readRecord();

    this.$el.addEventListener("click", this.closeAllDropDownMenu);
  },
  data: function() {
    return {
      records: null,
      pagination: { pageSize: 20, pageIndex: 0, noNext: false, lastData: {} },
      sorting: { name: "postDate", way: "asc" },
      gym_types: [
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

      console.log("sortName:" + sortName + ", sortWay:" + sortWay);

      // .orderBy(sortName, sortWay)
      // this.pagination.pageSize
      this.records = [];

      let url = "http://127.0.0.1:8000/api/record/";
      this.axios.get(url).then(response => {
        this.records = response.data.results;
      });
    },
    isShowSortIcon(name, way) {
      return this.sorting.name === name && this.sorting.way === way;
    },
    orderBy(sortName) {
      // TODO implement
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

      let url = "http://127.0.0.1:8000/api/record/";
      this.axios.get(url).then(response => {
        this.records = response.data.results;
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
    getUnitPrice(expiryDate, monthly_rental) {
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
          ret = "$" + Math.floor(monthly_rental / ((YYYY - nowYYYY) * 12 + (MM - nowMM)));
        }
      }
      return ret;
    },
    addRecord() {
      this.$router.push({ name: "add" });
    },
    readRecord() {
      this.records = [];

      let sortWay = this.sorting.way;
      let sortName = this.sorting.name;
      console.log("sortName:" + sortName + ", sortWay:" + sortWay);
      this.pagination.pageIndex = 0;

      // TODO sorting
      // TODO pagination
      // TODO query by it owns
      let url = "http://127.0.0.1:8000/api/record/";
      this.axios.get(url).then(response => {
        this.records = response.data.results;
      });
    },
    triggerMenu(e, index) {
      e.stopPropagation();

      let targetElemName = "dropdown-menu" + index;
      let isTargetShowNow = this.$refs[targetElemName][0].classList.contains("show");

      this.closeAllDropDownMenu();

      if (!isTargetShowNow) {
        this.$refs[targetElemName][0].classList.add("show");
      }
    },
    checkout(index) {
      let record = this.records[index];
      localStorage.setItem("record", JSON.stringify(record));
      let id = record.id;
      this.$router.push({ name: "contract", params: { contractId: id } });
    },
    gym_typeCaption(v) {
      let selected = this.gym_types.filter(function(item) {
        return item.val === v;
      });
      if (selected.length > 0) {
        return selected[0].name;
      } else {
        return this.$t("disComputable");
      }
    },
    closeAllDropDownMenu: function() {
      let elems = document.querySelectorAll(".dropdown-menu");
      elems.forEach(function(item) {
        item.classList.remove("show");
      });
    }
  },
  computed: {
    recordCount() {
      return this.records && Array.isArray(this.records) ? this.records.length : 0;
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
  padding: 28px 56px;
}
#filterBar {
  margin-bottom: 40px;
  width: 30%;
  min-width: 250px;
  display: block;
}
.list-header {
  display: flex;
  margin-bottom: 5px;

  #recordCount {
    margin-bottom: 5px;
  }
  div {
    flex: 1;
    &:last-child {
      text-align: right;
    }
  }
  .sorter {
    width: 145px;
    margin-left: 10px;
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

.more {
  height: 1.5rem;
  cursor: pointer;
}
.dropdown-menu {
  display: none;
  position: absolute;
  z-index: 1000;
  min-width: 7rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  transform: translate3d(-6rem, 0px, 0px);

  a {
    text-decoration: none;
  }

  &.show {
    display: block;
  }
}
.dropdown-item {
  cursor: pointer;
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  clear: both;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  &:hover {
    background-color: #f8f9fa;
  }
}

.pagination {
  margin-top: 80px;
  cursor: pointer;
}
.blue {
  color: #1597fa;
}
</style>
