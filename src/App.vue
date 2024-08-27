<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, watch } from 'vue'
import CustomInput from './components/atoms/CustomInput.vue'
import { useQuery } from '@vue/apollo-composable'
import { FILTER_COUNTRY_BY_CODE, FILTER_COUNTRY_BY_NAME } from './graphql/queries'

const search = ref('')
const variables = ref({})
const searchedCountry = ref({})

const handleSearchBarFilter = () => {
  const input = search.value.toLowerCase().trim()

  if (input == 2) {
    variables.value.code = input.toUpperCase()
    const { result, loading } = useQuery(FILTER_COUNTRY_BY_CODE, variables)

    watch(
      result,
      (newVal, oldVal) => {
        if (Object.keys(newVal).length > 0) {
          console.log("TCL: handleSearchBarFilter ->  { ...newVal['countries'][0] }", {
            ...newVal['countries'][0]
          })
          searchedCountry.value = { ...newVal['countries'][0] }
        }
      },
      { deep: true }
    )
  }

  if (input.length > 2) {
    const firstLetter = input.charAt(0)

    const firstLetterCap = firstLetter.toUpperCase()

    const remainingLetters = input.slice(1)

    const capitalizedWord = firstLetterCap + remainingLetters

    variables.value.name = capitalizedWord

    const { result, loading } = useQuery(FILTER_COUNTRY_BY_NAME, variables)

    watch(
      result,
      (newVal, oldVal) => {
        if (Object.keys(newVal).length > 0) {
          console.log("TCL: handleSearchBarFilter ->  { ...newVal['countries'][0] }", {
            ...newVal['countries'][0]
          })
          searchedCountry.value = { ...newVal['countries'][0] }
        }
      },
      { deep: true }
    )
  }
}
</script>

<template>
  <header class="w-100 d-flex flex-row justify-content-center align-items-center">
    <nav class="w-75 d-flex flex-row justify-content-between align-items-center">
      <div class="section-link-container">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>
      <div class="search-bar d-flex flex-row justify-content-center align-items-center w-50">
        <CustomInput
          v-model="search"
          :value="search"
          typeInput="text"
          placeholderInput="Search by country code or name"
          :requiredInput="false"
          class="rounded border-primary px-4 py-2 w-100"
        />
        <button @click="handleSearchBarFilter" class="btn btn-dark">Search</button>
      </div>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
@media (max-width: 768px) {
}
</style>
