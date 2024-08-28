<template>
  <div class="country-detail-container">
    <CountryDetailCard :country="country" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const queryCountryParse = JSON.parse(router.currentRoute.value.query.country)
const country = ref(queryCountryParse)
import CountryDetailCard from '@/components/atoms/CountryDetailCard.vue'
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
