<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/molecules/NavBar.vue'
import { useCountriesStore } from './store/index'
import { onMounted } from 'vue'
const { setAllCountries } = useCountriesStore()

onMounted(() => {
  setAllCountries()
})
</script>

<template>
  <header class="w-100 d-flex flex-row justify-content-center align-items-center">
    <NavBar />
  </header>
  <RouterView />
</template>

<style scoped>
@media (max-width: 768px) {
}
</style>
