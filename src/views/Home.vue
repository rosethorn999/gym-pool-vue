<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/stockvault-fitness-center106597.jpg"> -->
    <!-- <Asks/> -->
    <h2>Asks</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>gymType</th>
            <th>dueDate</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,ind) in asks" :key="item.id" @click="checkout(item.id)">
            <th>{{ind+1}}</th>
            <td>{{item.gymType}}</td>
            <td>{{item.dueDate}}</td>
            <td>${{item.price}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4">Prev&nbsp;|&nbsp;Next</td>
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
    this.genRandomList();
  },
  data: function() {
    return {
      asks: []
    };
  },
  methods: {
    genRandomList() {
      let id = this._uuid();
      for (let i = 0; i < 20; i++) {
        this.asks.push({
          id: id,
          gymType: "健身工廠",
          dueDate: "2019/12/31",
          price: 31990,
          postDate: "2019/03/23"
        });
      }
    },
    _uuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    checkout(id) {
      this.$router.push({ name: "contract", params: { contractId: id } });
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
      text-align: right;
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
