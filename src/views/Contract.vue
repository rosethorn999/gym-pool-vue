<template>
  <div class="contract">
    <h2>This is a contract page</h2>
    <div>
      <ul>
        <li>id: {{id}}</li>
        <li>dueDate: {{dueDate}}</li>
        <li>price: ${{price}}</li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  name: "contract",
  props: {},
  data() {
    return {
      dueDate: "2019/12/31",
      price: 35000
    };
  },
  computed: {
    id() {
      return this.$route.params.contractId;
    }
  },
  mounted() {}
};
</script>