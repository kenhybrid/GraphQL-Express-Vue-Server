<template>
  <div class="hello">
    <h1>graphQL</h1>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else-if="$apollo.error">there is an error...</div>
    <div v-else>
      <div v-for="customer in customers" :key="customer.id" :customer="customer">
        <p>{{ customer.name }} --{{ customer.email }}--{{ customer.age }}</p>
        <button @click="go(customer.id)">visit</button>
        <button @click="edit(customer.id)">Edit</button>

        <button @click="deleteCustomer(customer.id)">Delete</button>
      </div>
    </div>
    <div>
      <customer />
    </div>
  </div>
</template>

<script>
import customer from "./CreateCustomer";
import { All_CUSTOMERS, DELETE_CUSTOMER } from "../graphgl";
export default {
  name: "HelloWorld",
  components: {
    customer,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      customers: [],
    };
  },
  apollo: {
    customers: {
      query: All_CUSTOMERS,
    },
  },
  methods: {
    deleteCustomer(id) {
      console.log(id);
      this.$apollo
        .mutate({
          mutation: DELETE_CUSTOMER,
          variables: {
            id: id,
          },
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        });
    },
    go(id){
      this.$router.push("/about/"+id)
    },edit(id){
      this.$router.push("/edit/"+id)

    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
