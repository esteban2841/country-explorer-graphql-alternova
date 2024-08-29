import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { FILTER_COUNTRY_BY_CODE, FILTER_COUNTRY_BY_NAME, LIST_COUNTRIES } from '../graphql/queries'
import { type Country } from '@/types'
import { useQuery } from '@vue/apollo-composable'
import Swal from 'sweetalert2'
import { conditionFilterAscDes } from '@/helpers'

export const useCountriesStore = defineStore('countries', () => {
  const storedCountries = localStorage.getItem('countries')
  const router = useRouter()
  const filteredCountries = ref<Array<Country>>([])
  const countries = ref<Array<Country>>([])
  const country = ref<Country>({})
  const variables = ref<Country>({})
  const loading = ref<boolean>(true)

  const setAllCountries = () => {
    if (storedCountries) {
      countries.value = JSON.parse(storedCountries)
      loading.value = false
      return
    }
    const { result, loading: isLoading } = useQuery(LIST_COUNTRIES)

    watch(result, (newVal) => {
      if (newVal.countries) {
        countries.value = [...newVal.countries]
        loading.value = isLoading.value
        countries.value.length && localStorage.setItem('countries', JSON.stringify(countries.value))
      }
    })
  }

  const resetAllFilters = () => {
    filteredCountries.value = []
  }

  const routerNavigator = (country?: object, routeName?: string) => {
    if (!Object.keys(country!).length) {
      router.push({
        name: routeName // Use the name of the route
      })
      return
    }
    router.push({
      name: routeName, // Use the name of the route
      query: { country: encodeURI(JSON.stringify(country)) } // Pass the country code directly as a param
    })
  }

  const filterSelect = (type: string) => {
    if (type == 'asc') {
      const sorted = conditionFilterAscDes({ type, data: [...countries.value], property: 'name' })
      countries.value = sorted
    }
    if (type == 'des') {
      const sorted = conditionFilterAscDes({ type, data: [...countries.value], property: 'name' })
      countries.value = sorted
    }
  }

  const filterByCountryCodeOrName = (inputParam: string) => {
    if (inputParam.length == 2) {
      variables.value.code = inputParam.toUpperCase()
      const { result } = useQuery(FILTER_COUNTRY_BY_CODE, variables)
      watch(
        result,
        (newVal: any) => {
          if (newVal.countries.length) {
            filteredCountries.value = [...newVal.countries]
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Country code does not exist, try with another code',
              timer: 3000
            })
          }
        },
        { deep: true }
      )
    }

    if (inputParam.length > 2) {
      const firstLetter = inputParam.charAt(0)

      const firstLetterCap = firstLetter.toUpperCase()

      const remainingLetters = inputParam.slice(1)

      const capitalizedWord = firstLetterCap + remainingLetters

      variables.value.name = capitalizedWord

      const { result } = useQuery(FILTER_COUNTRY_BY_NAME, variables)

      watch(
        result,
        (newVal: any) => {
          if (newVal.countries.length) {
            filteredCountries.value = [...newVal.countries]
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Country name does not exist, try with another name',
              timer: 3000
            })
          }
        },
        { deep: true }
      )
    }
  }

  return {
    country,
    countries,
    loading,
    filteredCountries,
    filterSelect,
    resetAllFilters,
    setAllCountries,
    routerNavigator,
    filterByCountryCodeOrName
  }
})
