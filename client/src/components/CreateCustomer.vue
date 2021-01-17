<template>
  <div>
    <form @submit.prevent="addCustomer">
      <label>Name</label>
      <input type="text" v-model="name" />
      <label>Email</label>

      <input type="email" v-model="email" />
      <label>Age</label>

      <input type="text" v-model="age" />
      <input type="submit" value="Create customer" />
    </form>
  </div>
</template>

<script>
import { ADD_CUSTOMER } from "../graphgl";

export default {
  name: "singlecustomer",
  data() {
    return { name: "", email: "", age:""};
  },

  methods: {
    addCustomer() {
      this.$apollo
        .mutate({
          mutation: ADD_CUSTOMER,
          variables: {
            name: this.name,
            age: parseInt(this.age),
            email: this.email,
          },
        })
        .then((res) => {
          console.log(res);
          window.location.reload();

        });
    },
  },
};
</script>

<style></style>
