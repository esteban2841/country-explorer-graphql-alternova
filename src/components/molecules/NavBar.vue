<template lang="html">
  <nav class="w-100 max-w-xl d-flex flex-column justify-content-between align-items-center">
    <div class="d-flex flex-row section-link-container gap-2">
      <RouterLink to="/" class="text-decoration-none dark">
        <h4>Country List</h4>
      </RouterLink>
      <RouterLink class="text-decoration-none dark" to="/country"
        ><h4>Country Detail</h4></RouterLink
      >
    </div>
    <div
      v-if="currentRoute.name == 'home'"
      class="search-bar d-flex flex-row gap-2 justify-content-center align-items-center w-50"
    >
      <CustomInput
        v-model="search"
        :value="search"
        typeInput="text"
        placeholderInput="Search by country code or name"
        :requiredInput="false"
        class="rounded border-primary px-4 py-2 w-100"
      />
      <button @click="handleSearchBarFilter" class="btn btn-dark w-25 px-4 py-2">Search</button>
      <button @click="clearFilters" class="btn btn-dark w-25 py-2">
        <img class="object-cover wider-image w-25" src="@/assets/reset.png" alt="clear" />
      </button>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import CustomInput from '@/components/atoms/CustomInput.vue'
import { useCountriesStore } from '@/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value)

const search = ref('')

const { filterByCountryCodeOrName } = useCountriesStore()

const handleSearchBarFilter = () => {
  const input = search.value.toLowerCase().trim()
  filterByCountryCodeOrName(input)
}
const clearFilters = () => {}
</script>
<style lang=""></style>
