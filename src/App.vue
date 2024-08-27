<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, watch } from 'vue'
import CustomInput from './components/atoms/CustomInput.vue'
import { useCountriesStore } from './store'

const search = ref('')

const { filterByCountryCodeOrName } = useCountriesStore()

const handleSearchBarFilter = () => {
  const input = search.value.toLowerCase().trim()
  filterByCountryCodeOrName(input)
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
