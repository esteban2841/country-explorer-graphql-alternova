import './assets/main.css'

import { createApp, provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import router from './router'
import { apolloClient } from './context/ApolloProvider'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

const pinia = createPinia()

const app = createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .provide('apollo', apolloClient)
  .use(router)
  .use(bootstrap)
  .use(pinia)

app.mount('#app')
