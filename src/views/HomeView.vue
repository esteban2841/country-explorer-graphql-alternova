<script setup lang="ts">
import BootstrapTable from '../components/molecules/BootstrapTable.vue'
import { useCountriesStore } from '../store/index'
import { ref } from 'vue'
import { type Country } from '@/types'

const store = useCountriesStore()
const { detailViewRedirect } = useCountriesStore()

const countriesObserver = ref<Array<Country>>([])
const loaderObserver = ref<boolean>(true)

store.$subscribe(
  (state, mutations) => {
    console.log('TCL: mutations', mutations)
    countriesObserver.value = mutations.countries
    loaderObserver.value = mutations.loading
  },
  { detached: true }
)
</script>

<template>
  <main class="w-100 d-flex flex-column justify-content-center align-items-center">
    <h1>Countries list table</h1>
    <BootstrapTable
      @redirect="detailViewRedirect"
      :data="countriesObserver"
      :loading="loaderObserver"
    />
  </main>
</template>
