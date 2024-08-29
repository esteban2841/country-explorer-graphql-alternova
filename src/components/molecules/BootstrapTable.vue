<template lang="">
  <section
    class="position-relative w-100 h-100 d-flex flex-column justify-content-center align-items-center"
  >
    <div
      v-if="loadingState"
      class="loader-containe position-relative margin-top-50 w-100 d-flex justify-content-center align-items-center"
    >
      <div class="loader"></div>
    </div>
    <div class="table-container w-100 p-4" v-if="!loadingState">
      <table class="table table-dark table-responsive rounded w-100">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Name</th>
            <th scope="col">Code</th>
            <th scope="col">Flag</th>
            <th scope="col">Capital</th>
            <th scope="col">Currency</th>
            <th scope="col">Continent</th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="handleRowCLick(country.code)"
            v-for="(country, index) in countriesSelection"
            :key="index"
            :id="country.code"
            class="cursor-pointer"
          >
            <th scope="row">{{ index }}</th>
            <td>{{ country.name }}</td>
            <td>{{ country.code }}</td>
            <td>
              <img
                :alt="`${country.name} flag`"
                :src="`https://flagcdn.com/28x21/${country.code.toLowerCase()}.png`"
              />
            </td>
            <td>{{ country.capital }}</td>
            <td>{{ country.currency }}</td>
            <td>{{ country.continent.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { FILTER_COUNTRY_BY_CODE } from '../../graphql/queries'
import { useCountriesStore } from '../../store/index'
import { ref, watch } from 'vue'
import { type Country } from '@/types'

const store = useCountriesStore()
const countriesSelection = ref<Array<Country>>([])
const loadingState = ref<boolean>()

store.$subscribe(
  (state, mutations) => {
    console.log('TCL: mutations', mutations)
    loadingState.value = mutations.loading
    countriesSelection.value =
      mutations.filteredCountries.length > 0 ? mutations.filteredCountries : mutations.countries
  },
  { detached: true }
)

const emit = defineEmits(['redirect'])

const handleRowCLick = (countryCode: string) => {
  const variables = ref({
    code: countryCode
  })
  const { result, loading, error } = useQuery(FILTER_COUNTRY_BY_CODE, variables)

  watch(
    result,
    (newVal) => {
      if (Object.keys(newVal).length > 0) {
        emit('redirect', { ...newVal['countries'][0] })
      }
    },
    { deep: true }
  )
}
</script>
<style scoped>
.loader {
  width: 44.8px;
  height: 44.8px;
  position: relative;
  transform: rotate(45deg);
}

.loader:before,
.loader:after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50% 50% 0 50%;
  background: #0000;
  background-image: radial-gradient(circle 11.2px at 50% 50%, #0000 94%, #ff4747);
}

.loader:after {
  animation: pulse-ytk0dhmd 1s infinite;
  transform: perspective(336px) translateZ(0px);
}

@keyframes pulse-ytk0dhmd {
  to {
    transform: perspective(336px) translateZ(168px);
    opacity: 0;
  }
}
</style>
