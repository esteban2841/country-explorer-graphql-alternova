<template lang="html">
  <div class="">
    <div
      class="country-detail-container p-4 w-100 h-100 d-flex flex-row justify-content-between align-items-center"
    >
      <div class="w-50 h-100 d-flex flex-row justify-content-between align-items-center">
        <img class="w-100 object-contain" :src="countryFlag" alt="" />
      </div>
      <div class="w-50 h-100 p-4">
        <h1 class="card-title">{{ props.country.name }}</h1>
        <div class="card-body">
          <p class="card-text">Native name {{ props.country.native }}</p>
          <p class="card-text">Code {{ props.country.code }}</p>
          <p class="card-text">Capital {{ props.country.capital }}</p>
          <p class="card-text">Currency {{ props.country.currency }}</p>
          <p class="card-text">Continent {{ props.country.continent?.name }}</p>
        </div>
      </div>
    </div>
    <div>
      <StatesTable :data="states" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Country } from '../../types'
import { computed } from 'vue'
import StatesTable from '@/components/molecules/StatesTable.vue'
interface Props {
  country: Country
}

const props = defineProps<Props>()
const states = computed(() => [...props.country.states])
const countryFlag = `https://flagcdn.com/w2560/${props.country.code.toLowerCase()}.png`
</script>
<style lang="css"></style>
