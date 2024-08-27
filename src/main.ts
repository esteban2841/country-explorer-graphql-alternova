import './assets/main.css'

import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import router from './router'
import { apolloClient } from './context/ApolloProvider'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

const pinia = createPinia()

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App)
})
  .use(router)
  .use(pinia)
  .use(bootstrap)

app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')
