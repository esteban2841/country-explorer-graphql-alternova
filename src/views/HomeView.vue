<script setup lang="ts">
import CountriesTable from '../components/molecules/CountriesTable.vue'
import { useCountriesStore } from '../store/index'
import { ref, onMounted } from 'vue'
import { type Country } from '@/types'

const { setAllCountries } = useCountriesStore()

onMounted(() => {
  setAllCountries()
})

const store = useCountriesStore()
const { routerNavigator } = useCountriesStore()

const countriesObserver = ref<Array<Country>>([])
const loaderObserver = ref<boolean>(true)

store.$subscribe(
  (state, mutations) => {
    countriesObserver.value = mutations.countries
    loaderObserver.value = mutations.loading
  },
  { detached: true }
)
</script>

<template>
  <KeepAlive>
    <main class="w-100 d-flex flex-column justify-content-center align-items-center">
      <h1>Countries list table</h1>
      <CountriesTable
        @redirect="(e) => routerNavigator(e, 'country')"
        :data="countriesObserver"
        :loading="loaderObserver"
      />
    </main>
  </KeepAlive>
</template>
