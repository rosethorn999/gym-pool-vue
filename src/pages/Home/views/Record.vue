<template>
  <div class="records">
    <div class="you-should-know">
      <p>{{ $t("transferMustKnow") }}</p>
      <p>
        <router-link to="/notice">{{ $t("somethingToNotice") }}</router-link>
      </p>
    </div>
    <div class="container">
      <div class="list-header">
        <div class="query-counter">
          <span id="record-count">{{$t('selling')}} {{recordCount}}</span>
        </div>
        <div class="query-fun">
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
          <select class="sorter" v-model="ordering.create_time">
            <option :value="null" selected>{{ $t("create_time") }}</option>
            <option :value="null">{{ $t("newToOld") }}</option>
            <option value>{{ $t("oldToNew") }}</option>
          </select>
          <select class="sorter" v-model="ordering.monthly_rental">
            <option :value="null" selected>{{ $t("monthly_rental") }}</option>
            <!-- TODO price(server side calculated) not monthly_rental -->
            <option value="-">{{ $t("highToLow") }}</option>
            <option value>{{ $t("lowToHigh") }}</option>
          </select>
        </div>
      </div>
      <div class="record-container">
        <RecordBox v-for="(r,i) in records" :key="r.id" :r="r" @click.native="checkout(i)" />
        <div v-if="records===null">
          <img src="../assets/loading.gif" />
        </div>
        <div v-if="records&&records.length===0">{{$t('none')}}</div>
        <div class="pagination-block">
          <a class="pagination-btn" href="#" @click.prevent="readRecord(-1)">{{$t("prevPage")}}</a>
          <a class="pagination-btn" href="#" @click.prevent="readRecord(1)">{{$t("nextPage")}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import selections from "@/assets/selections.json";
import zipcode from "@/assets/twZipCode.json";
import RecordBox from "../components/RecordBox.vue";
const { basicRequest } = require("@/apis/api.js");

export default {
  name: "records",
  components: { RecordBox },
  mounted: function() {
    this.$nextTick(() => {
      this.readRecord();
    });
  },
  data: function() {
    return {
      recordCount: 0,
      records: null,

      pagination: { pageIndex: 1, nextUrl: null, previousUrl: null },
      filter: { gym_type: null, county: null, district: null },
      ordering: { create_time: null, monthly_rental: null },
      // TODO expiry_date is a key feature, should be set as order

      selection: {
        zipcode: zipcode,
        gym_types: selections[0].list
      }
    };
  },
  computed: {
    search() {
      return this.$route.query.search;
    },
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
    },
    search() {
      this.readRecord();
    },
    "ordering.create_time"() {
      this.readRecord();
    },
    "ordering.monthly_rental"() {
      this.readRecord();
    }
  },
  methods: {
    readRecord(pager) {
      if (pager === -1 && this.pagination.pageIndex === 1) {
        console.log("page index is 1");
        return;
      } else if (pager === 1 && this.pagination.nextUrl === null) {
        console.log("no next page");
        return;
      }

      this.records = [];

      let url = this.getRecordUrl(pager);
      console.log(url);

      basicRequest.get(url).then(response => {
        this.recordCount = response.data.count;
        this.records = response.data.results;
        this.pagination.nextUrl = response.data.next;
        this.pagination.previousUrl = response.data.previous;
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
    },
    getRecordUrl(pager) {
      let url = "/record/";

      // filter
      let urlSearch = new URLSearchParams();
      // pagination
      if (typeof pager === "number") {
        this.pagination.pageIndex += pager;
        if (this.pagination.pageIndex !== 0) {
          urlSearch.set("page", this.pagination.pageIndex);
        }
      }

      // search
      if (this.search) {
        urlSearch.set("search", this.search);
      }

      // ordering
      let ordering = [];
      let orderingCreate_time = this.ordering.create_time;
      if (orderingCreate_time !== null) {
        ordering.push(orderingCreate_time + "create_time");
      }
      let orderingMonthly_rental = this.ordering.monthly_rental;
      if (orderingMonthly_rental !== null) {
        ordering.push(orderingMonthly_rental + "monthly_rental");
      }
      if (ordering.length > 0) {
        urlSearch.set("ordering", ordering);
      }

      let querys = urlSearch.toString();
      if (querys) {
        url += "?" + querys;
      }

      return url;
    },
    checkout(index) {
      let record = this.records[index];
      localStorage.setItem("record", JSON.stringify(record));
      let id = record.id;
      this.$router.push({ name: "RecordDetail", params: { recordId: id } });
    },
    getPrice(r) {
      let d = new Date(r.expiry_date).getTime();
      let now = new Date().getTime();

      const monthCount = Math.round((d - now) / 1000 / 60 / 60 / 24 / 30);
      return r.monthly_rental * monthCount + r.processing_fee;
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
.records {
  background: #f5f7f8;
  width: 100%;
}
.container {
  padding: $phone-padding;
  @include pc-width {
    padding: 0px $pc-padding;
  }
}
.you-should-know {
  box-sizing: border-box;
  height: 307px;
  background-image: url("../assets/bg.png");
  color: #fff;
  padding: 60px $phone-padding 150px;
  width: 100%;
  @include pc-width {
    padding: 52px $pc-padding;
  }
  p {
    font-size: 30px;
    @include pc-width {
      font-size: 40px;
    }
    a:link,
    a:visited {
      color: #dee2e6;
    }
    a:hover {
      color: #fff;
    }
    &:last-child {
      font-size: $pc-font-size;
    }
  }
}
.list-header {
  margin: 10px 0px;
  @include pc-width {
    display: flex;
  }
  div {
    width: 100%;
    line-height: 50px;
    vertical-align: middle;
    display: inline-block;
  }
  .query-counter {
    font-size: 24px;
    @include pc-width {
      flex: 1;
    }
  }
  .query-fun {
    text-align: right;
    overflow: auto;
    white-space: nowrap;
    @include pc-width {
      flex: 2;
    }
  }
  .filter,
  .sorter {
    width: 145px;
    margin-left: 10px;
  }
}

.record-container {
  .pagination-block {
    height: 100px;
    margin-top: 50px;
    text-align: center;
    .pagination-btn {
      margin: 0px 10px;
      padding: 10px 25px;
      border: 1px solid #707070;
      color: #0058e5;
      @include pc-width {
        margin: 0px 50px;
      }
    }
  }
}
</style>
