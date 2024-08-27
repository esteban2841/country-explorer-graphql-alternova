import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Country {
  name: string
  code: string
  capital: string
  continent: Continent
  currency: string
}

export interface Continent {
  name: string
  code: string
}

export const useCountriesStore = defineStore('countries', () => {
  const countries = ref<Array<Country>>([])

  const setAllCountries = (data: Array<Country>) => {
    console.log('TCL: setAllCountries -> data', data)
    countries.value = [...data]
  }

  return { countries, setAllCountries }
})
