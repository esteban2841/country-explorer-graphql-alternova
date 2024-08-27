import { provide, inject } from 'vue'

export const MyPlugin = (application) => {
    install(application){
      provide('apolloContext', apolloClient)
    }
}
  