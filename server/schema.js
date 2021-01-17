const axios = require('axios');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

// //customers
// const customers = [
//   { id: "1", name: "Baraka", email: "Baraka@gmail.com", age: 25 },
//   { id: "3", name: "shogoka", email: "shogoka@gmail.com", age: 50 },
//   { id: "2", name: "janet", email: "janet@gmail.com", age: 25 },
//   { id: "4", name: "hybrid", email: "hybrid@gmail.com", age: 30 },
//   { id: "5", name: "john", email: "john@gmail.com", age: 18 },
//   { id: "6", name: "alice", email: "alice@gmail.com", age: 21 },
//   { id: "7", name: "jamo", email: "jamo@gmail.com", age: 22 },
// ];

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/customers/' + args.id)
          .then(res => res.data);

      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/customers')
          .then(res => res.data);
      }
    }
  }
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return axios.post('http://localhost:3000/customers', {
          name: args.name,
          email: args.email,
          age: args.age
        })
          .then(res => res.data);
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return axios.delete('http://localhost:3000/customers/' + args.id)
          .then(res => res.data);
      }
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return axios.patch('http://localhost:3000/customers/' + args.id, args)
          .then(res => res.data);
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});