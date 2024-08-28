import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { FILTER_COUNTRY_BY_CODE, FILTER_COUNTRY_BY_NAME, LIST_COUNTRIES } from '../graphql/queries'
import { type Country } from '@/types'
import { useQuery } from '@vue/apollo-composable'
// import { inject } from 'vue'

export const useCountriesStore = defineStore('countries', () => {
  const router = useRouter()
  const countries = ref<Array<Country>>([])
  const filteredCountries = ref<Array<Country>>([])
  const country = ref<Country>({})
  const variables = ref<Country>({})
  const loading = ref<boolean>(true)

  const setAllCountries = () => {
    const { result, loading: isLoading } = useQuery(LIST_COUNTRIES)

    watch(result, (newVal) => {
      countries.value = [...newVal.countries]
      loading.value = isLoading.value
    })
  }

  const detailViewRedirect = (country: object) => {
    router.push({
      name: 'country', // Use the name of the route
      query: { country: encodeURI(JSON.stringify(country)) } // Pass the country code directly as a param
    })
  }

  const filterByCountryCodeOrName = (inputParam: string) => {
    if (inputParam.length == 2) {
      variables.value.code = inputParam.toUpperCase()
      const { result, loading } = useQuery(FILTER_COUNTRY_BY_CODE, variables)
      watch(
        result,
        (newVal: any) => {
          if (Object.keys(newVal).length > 0) {
            const filteredCountries = newVal.countries
            return (countries.value = [...filteredCountries])
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

      const { result, loading } = useQuery(FILTER_COUNTRY_BY_NAME, variables)

      watch(
        result,
        (newVal: any) => {
          if (Object.keys(newVal).length > 0) {
            const filteredCountries = newVal.countries
            return (countries.value = [...filteredCountries])
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
    setAllCountries,
    detailViewRedirect,
    filterByCountryCodeOrName
  }
})
