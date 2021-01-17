import Vue from "vue";
import App from "./App.vue";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import router from './router'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:4000/graphql",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
Vue.config.productionTip = false;
Vue.use(VueApollo);

new Vue({
  render: (h) => h(App),
  router,
  apolloProvider
}).$mount("#app");
