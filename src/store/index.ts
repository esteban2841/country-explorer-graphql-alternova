import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
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
  const router = useRouter()
  const countries = ref<Array<Country>>([])

  const setAllCountries = (data: Array<Country>) => {
    console.log('TCL: setAllCountries -> data', data)
    countries.value = [...data]
  }

  const detailViewRedirect = (country: object) => {
    console.log('TCL: detailViewRedirect -> routeName', country)
    router.push({
      name: 'country', // Use the name of the route
      query: { ...country } // Pass the country code directly as a param
    })
  }

  return { countries, setAllCountries, detailViewRedirect }
})
