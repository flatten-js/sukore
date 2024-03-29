import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import VueApollo from 'vue-apollo'

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_GRAPHCMS_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.VUE_APP_GRAPHCMS_AUTH_TOKEN}`,
  }
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
