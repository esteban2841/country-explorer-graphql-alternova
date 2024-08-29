<template lang="html">
  <div class="">
    <div class="p-4 navigator-container">
      <button @click="routerNavigator({}, 'home')" class="btn btn-dark w-100 t-0 py-2">Back</button>
    </div>
    <div
      class="country-detail-container position-relative p-4 w-100 h-100 d-flex flex-row justify-content-between align-items-center"
    >
      <div
        class="flag-container w-50 h-100 d-flex flex-row md justify-content-between align-items-center"
      >
        <img class="w-100 object-contain" :src="countryFlag" alt="" />
      </div>
      <div class="detail-text-container w-50 h-100 p-4">
        <h1 class="text-center p-4">{{ props.country.name }}</h1>
        <div class="card-body gap d-flex flex-column justify-content-between align-items-center">
          <div class="d-flex flex-row justify-content-between country-prop align-items-center w-50">
            <h5 class="">Native name:</h5>
            <p>{{ props.country.native }}</p>
          </div>
          <div
            class="d-flex flex-row justify-content-between country-prop text-center align-items-center w-50"
          >
            <h5 class="">Code:</h5>
            <p>{{ props.country.code }}</p>
          </div>
          <div
            class="d-flex flex-row justify-content-between country-prop text-center align-items-center w-50"
          >
            <h5 class="">Capital:</h5>
            <p>{{ props.country.capital }}</p>
          </div>
          <div
            class="d-flex flex-row justify-content-between country-prop text-center align-items-center w-50"
          >
            <h5 class="">Currency:</h5>
            <p>{{ props.country.currency }}</p>
          </div>
          <div
            class="d-flex flex-row justify-content-between country-prop text-center align-items-center w-50"
          >
            <h5 class="">Continent:</h5>
            <p>{{ props.country.continent?.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <StatesTable :data="states" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Country } from '@/types'
import { computed } from 'vue'
import StatesTable from '@/components/molecules/StatesTable.vue'
import { useCountriesStore } from '@/store/index'

interface Props {
  country: Country
}

const { routerNavigator } = useCountriesStore()
const props = defineProps<Props>()
const states = computed(() => [...props.country.states])
const countryFlag = `https://flagcdn.com/w2560/${props.country.code.toLowerCase()}.png`
</script>
<style lang="css" scoped>
.navigator-container {
  width: 200px;
}
.country-prop p {
  margin: 0px !important;
}
@media (max-width: 768px) {
  .country-detail-container {
    flex-direction: column !important;
  }
  .flag-container {
    width: 100% !important;
  }
  .detail-text-container {
    width: 100% !important;
  }
  .country-prop {
    width: 100% !important;
  }
}
</style>
