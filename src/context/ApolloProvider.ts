import { provideApolloClient } from '@vue/apollo-composable'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'

// HTTP connection to the API

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: 'https://countries.trevorblades.com' }),
  cache
})

provideApolloClient(apolloClient)

export { apolloClient }
