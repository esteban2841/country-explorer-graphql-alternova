<script setup lang="ts">
import BootstrapTable from '../components/molecules/BootstrapTable.vue'
import { useCountriesStore } from '../store/index'
import { useQuery } from '@vue/apollo-composable'
import { computed, watch } from 'vue'
import { LIST_COUNTRIES } from '../graphql/queries'

const { setAllCountries, detailViewRedirect } = useCountriesStore()
const { result, loading } = useQuery(LIST_COUNTRIES)
console.log('TCL: result HOME LIST COUNTRIES', result)
const countries = computed(() => result.value?.countries ?? [])
const isLoading = computed(() => loading.value ?? true)

watch(countries, (newVal, oldVal) => {
  setAllCountries(newVal || oldVal)
})
</script>

<template>
  <main class="w-100 d-flex flex-column justify-content-center align-items-center">
    <h1>Countries list table</h1>
    <BootstrapTable @redirect="detailViewRedirect" :data="countries" :loading="isLoading" />
  </main>
</template>
