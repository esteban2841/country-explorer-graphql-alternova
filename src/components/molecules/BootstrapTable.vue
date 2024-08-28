<template lang="">
  <section>
    <div class="loader-container w-100 h-50 d-flex justify-content-center align-items-center">
      <div v-if="loading" class="loader"></div>
    </div>
    <div class="table-container w-100" v-if="!loading">
      <table class="table w-100">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Name</th>
            <th scope="col">Code</th>
            <th scope="col">Capital</th>
            <th scope="col">Continent</th>
            <th scope="col">Currency</th>
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
            <td>{{ country.capital }}</td>
            <td>{{ country.continent.name }}</td>
            <td>{{ country.currency }}</td>
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

const props = defineProps({
  data: {
    type: Array<Country>,
    default: []
  },
  loading: {
    type: Boolean,
    default: true
  }
})
// console.log('TCL: props', props)
const store = useCountriesStore()
const countriesSelection = ref<Array<Country>>([...props.data])

store.$subscribe(
  (state, mutations) => {
    console.log('TCL: state', state, mutations)
    countriesSelection.value = mutations.countries
    // const {countries} = state
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
        console.log('TCL: handleRowCLick -> newVal', newVal)
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
