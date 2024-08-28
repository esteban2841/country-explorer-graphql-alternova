<template>
  <div class="country-detail-container">
    <CountryDetailCard :country="country" />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const country = ref({ ...router.currentRoute.value.query })
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
