<template lang="html">
  <nav class="w-100 d-flex flex-column gap-2 justify-content-between align-items-center">
    <div
      class="d-flex flex-row section-link-container gap-2 bg-slogan w-100 justify-content-center align-items-center p-2"
    >
      <div
        v-if="currentRoute.name == 'home'"
        class="max-w-xl d-flex flex-row section-link-container gap-2 bg-slogan w-100 justify-content-between align-items-center p-2"
      >
        <h1>Where in the world</h1>
        <div class="earth-icon-container">
          <img class="object-cover wider-image w-25" src="@/assets/earth.png" alt="clear" />
        </div>
      </div>
    </div>
    <div
      v-if="currentRoute.name == 'home'"
      class="search-bar d-flex flex-row gap-2 justify-content-center align-items-center p-4 w-50"
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
        <img
          class="reset-icon object-cover wider-image w-25"
          src="@/assets/reset.png"
          alt="clear"
        />
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

const { filterByCountryCodeOrName, resetAllFilters } = useCountriesStore()

const handleSearchBarFilter = () => {
  const input = search.value.toLowerCase().trim()
  filterByCountryCodeOrName(input)
}
const clearFilters = () => {
  resetAllFilters()
}
</script>
<style lang="css" scoped>
.earth-icon-container {
  width: 120px;
}
.earth-icon-container:hover {
  transform: scale(1.2);
}
@media (max-width: 768px) {
  .search-bar {
    display: flex;
    flex-direction: column !important;
    width: 100% !important;
    gap: 10px !important;
  }
  .btn {
    width: 100% !important;
  }
  .reset-icon {
    width: 30px !important;
  }
}
</style>
