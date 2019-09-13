<template>
  <div class="row">
    <div>
      <select class="yyyy" v-model="yyyy">
        <option :value="-999" disabled>{{ $t('yyyy') }}</option>
        <option v-for="yyyy in selection.yyyy" :key="yyyy" :value="yyyy">{{ yyyy }}</option>
      </select>
    </div>
    <div>
      <select class="mm" v-model="mm">
        <option :value="-999" disabled>{{ $t('mm') }}</option>
        <option v-for="mm in selection.mm" :key="mm" :value="mm">{{ mm }}</option>
      </select>
    </div>
    <div>
      <select class="dd" v-model="dd">
        <option :value="-999" disabled>{{ $t('dd') }}</option>
        <option v-for="dd in selection.dd" :key="dd" :value="dd">{{ dd }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatePick",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    isFullYYYY: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      yyyy: -999,
      mm: -999,
      dd: -999,

      selection: {
        yyyy: [],
        mm: [],
        dd: []
      }
    };
  },
  computed: {
    isValid() {
      return this.yyyy !== -999 && this.mm !== -999 && this.dd !== -999;
    }
  },
  watch: {
    value(v) {
      let arr = v.split("-");
      this.yyyy = arr[0];
      this.mm = arr[1];
      this.dd = arr[2];
    },
    yyyy() {
      if (this.isValid) {
        this.$emit("change", this.yyyy + "-" + this.mm + "-" + this.dd);
      }
    },
    mm() {
      if (this.isValid) {
        this.$emit("change", this.yyyy + "-" + this.mm + "-" + this.dd);
      }
    },
    dd() {
      if (this.isValid) {
        this.$emit("change", this.yyyy + "-" + this.mm + "-" + this.dd);
      }
    }
  },
  mounted: function() {
    let today = new Date();
    let yyyy = today.getFullYear();

    if (this.isFullYYYY) {
      for (let i = 0; i < 70; i++) {
        let v = (yyyy - i).toString();
        this.selection.yyyy.push(v);
      }
    } else {
      for (let i = 0; i < 10; i++) {
        let v = (yyyy + i).toString();
        this.selection.yyyy.push(v);
      }
    }
    for (let i = 1; i <= 12; i++) {
      let v = this.paddingLeft(i.toString(), 2);
      this.selection.mm.push(v);
    }
    for (let i = 1; i <= 31; i++) {
      let v = this.paddingLeft(i.toString(), 2);
      this.selection.dd.push(v);
    }
  },
  methods: {
    paddingLeft(str, lenght) {
      if (str.length >= lenght) return str;
      else return this.paddingLeft("0" + str, lenght);
    }
  }
};
</script>

<style scoped lang="scss">
.row {
  display: flex;
  > div {
    flex: 1;
    > select {
      width: 100%;
    }
  }
}
</style>
