<template>
  <div class="about">
    <h1>{{ customer.name }}</h1>
    <p>{{ customer.email }}</p>
    <small>{{ customer.age }}</small>
  </div>
</template>
<script>
import { ONE_CUSTOMER } from "../graphgl";
export default {
  props: ["id"],
  data() {
    return {
      customer:""
    };
  },
  apollo: {
    customer: {
      query: ONE_CUSTOMER,
      variables() {
        return { id: this.id };
      },
    },
  },
};
</script>
