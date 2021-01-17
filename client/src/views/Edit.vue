<template>
  <div>
      {{customer.name}}
    <form @submit.prevent="editCustomer">
        <label>Name</label>
      <input type="text" v-model="customer.name" />
      <label>Email</label>
      <input type="email" v-model="customer.email" />
      <label>Age</label>
      <input type="text" v-model="customer.age" />
      <input type="submit" value="Edit customer" />
    </form>
  </div>
</template>

<script>
import { ONE_CUSTOMER,EDIT_CUSTOMER } from "../graphgl";

export default {
  props: ["id"],
  data() {
    return {
      customer: {
          name:"",
          email:"",
          age:"",
      },
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
  methods: {
    editCustomer() {
        this.$apollo.mutate({
          mutation: EDIT_CUSTOMER,
          variables: {
              id:this.id,
            name: this.customer.name,
            age: parseInt(this.customer.age),
            email: this.customer.email,
          },
        })
        .then((res) => {
          console.log(res);
          this.$router.push("/")

        });
    },
  },
};
</script>

<style></style>
