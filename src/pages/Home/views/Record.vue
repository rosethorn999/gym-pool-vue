<template>
  <div class="records">
    <div class="area-switcher">
      <ul>
        <li class="active">北區</li>
        <li>中區</li>
        <li>南區</li>
        <li>東區</li>
      </ul>
    </div>
    <div class="container">
      <div class="you-should-know">
        <h1>健身會籍轉讓需知</h1>
        <p>需要注意的事情</p>
      </div>
      <div class="list-header">
        <div>
          <h2 id="recordCount">{{$t('area-north')}} {{$t('selling')}} {{recordCount}}</h2>
        </div>
        <div>
          <select class="filter" v-model="filter.gym_type">
            <option :value="null">{{$t('gym_type')}}</option>
            <option
              v-for="item in selection.gym_types"
              :key="item.val"
              :value="item.val"
            >{{item.name}}</option>
          </select>
          <select class="filter" v-model="filter.county">
            <option :value="null">{{$t('county')}}</option>
            <option
              v-for="county in selection.zipcode"
              :key="county.name"
              :value="county.name"
            >{{county.name}}</option>
          </select>
          <select class="filter" v-model="filter.district">
            <option :value="null">{{$t('district')}}</option>
            <option
              v-for="district in districts"
              :key="district.name"
              :value="district.name"
            >{{district.name}}</option>
          </select>
          <select class="sorter" v-model="sorting.create_time">
            <option :value="null">發佈時間</option>
            <option>新到舊</option>
            <option>舊到新</option>
          </select>
          <select class="sorter" v-model="sorting.price">
            <option :value="null">價格</option>
            <option>高到低</option>
            <option>低到高</option>
          </select>
        </div>
      </div>
      <div class="record-container">
        <ul>
          <li class="list-tiem" v-for="(r,i) in records" :key="r.id" @click="checkout(i)">
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
              <p class="blue">NT{{ getPrice(r) }}</p>
            </div>
            <div>
              <p>{{$t("processing_fee")}}: {{r.processing_fee}}</p>
              <p>{{$t("monthly_rental")}}: {{r.monthly_rental}} / {{$t("month")}}</p>
              <p>{{$t("expiry_date")}}: {{r.expiry_date}}</p>
            </div>
          </li>
          <li v-if="records===null">
            <img src="../assets/loading.gif" />
          </li>
          <li v-if="records&&records.length===0">{{$t('none')}}</li>
        </ul>
        <div class="pagination-block">
          <a class="pagination-btn" href="#" @click.prevent="readRecord(-1)">{{$t("prevPage")}}</a>
          <a class="pagination-btn" href="#" @click.prevent="readRecord(1)">{{$t("nextPage")}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import zipcode from "@/assets/twZipCode.json";

export default {
  name: "records",
  components: {},
  mounted: function() {
    this.readRecord();
  },
  data: function() {
    return {
      recordCount: 0,
      records: null,

      pagination: { pageSize: 20, pageIndex: 0, nextUrl: null, previousUrl: null },
      filter: { gym_type: null, county: null, district: null },
      sorting: { create_time: null, price: null },

      selection: {
        zipcode: zipcode,
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
    districts() {
      let ret = [];
      let selectedDistricts = this.selection.zipcode.filter(item => {
        return item.name === this.filter.county;
      });

      if (selectedDistricts.length > 0) {
        ret = selectedDistricts[0].districts;
      }
      return ret;
    }
  },
  watch: {
    "filter.county"() {
      this.filter.district = null;
    }
  },
  methods: {
    readRecord(pager) {
      if (pager === -1 && this.pagination.pageIndex === 0) {
        console.log("page index is 0");
        return;
      } else if (pager === 1 && this.pagination.nextUrl === null) {
        console.log("no next page");
        return;
      }

      let sortWay = this.sorting.way;
      let sortName = this.sorting.name;

      console.log("sortName:" + sortName + ", sortWay:" + sortWay);

      // .orderBy(sortName, sortWay)
      // TODO this.pagination.pageSize
      let url = "http://127.0.0.1:8000/api/record/";
      this.records = [];
      switch (pager) {
        case -1:
          url = this.pagination.previousUrl;
          this.pagination.pageIndex += pager;
          break;
        case 1:
          url = this.pagination.nextUrl;
          this.pagination.pageIndex += pager;
          break;
      }

      this.axios.get(url).then(response => {
        this.recordCount = response.data.count;
        this.records = response.data.results;
        this.pagination.nextUrl = response.data.next;
        this.pagination.previousUrl = response.data.previous;
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
    checkout(index) {
      let record = this.records[index];
      localStorage.setItem("record", JSON.stringify(record));
      let id = record.id;
      this.$router.push({ name: "RecordDetail", params: { recordId: id } });
    },
    getPrice(r) {
      let month = 12; //TODO calc month
      return month * r.monthly_rental + r.processing_fee;
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
* {
  padding: 0;
  margin: 0;
}
.blue {
  color: $blue;
}
.records {
  background: #f5f7f8;
}
.container {
  padding: 0px 234px;
}
.area-switcher {
  text-align: center;
  color: #fff;
  background: #434343;
  height: 51px;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      display: inline-block;
      height: 51px;
      line-height: 51px;
      width: 194px;
      cursor: pointer;
      &:hover,
      &.active {
        background: #555555;
      }
    }
  }
}

.you-should-know {
  box-sizing: border-box;
  height: 244px;
  background-image: url("../assets/bg.png");
  color: #fff;
  padding: 52px 20%;
  width: 100%;
}
.list-header {
  display: flex;
  margin: 10px 0px;

  div {
    flex: 1;
    &:last-child {
      flex: 2;
      text-align: right;
    }
  }
  .filter,
  .sorter {
    width: 145px;
    margin-left: 10px;
  }
}

.record-container {
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
