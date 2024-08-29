import './assets/main.css'

import { createApp } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import router from './router'
import { apolloClient } from './context/ApolloProvider'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const pinia = createPinia()

const app = createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .provide('apollo', apolloClient)
  .use(router)
  .use(VueSweetalert2)
  .use(bootstrap)
  .use(pinia)

app.mount('#app')
