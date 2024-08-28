<template lang="">
  <section
    class="text-white position-relative w-100 h-100 d-flex flex-column justify-content-center align-items-center"
  >
    <div class="table-container w-100 p-4">
      <table class="table table-dark table-responsive rounded w-100">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Name</th>
            <th scope="col">Code</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(state, index) in props.data" :key="index" :id="state.code">
            <th scope="row">{{ index }}</th>
            <td>{{ state.name }}</td>
            <td>{{ state.code }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script setup lang="ts">
import { type State } from '@/types'

const props = defineProps({
  data: {
    type: Array<State>,
    default: []
  }
})

const states = props.data.map((state, index) => {
  console.log('TCL: state', state[index])
})
</script>
<style scoped></style>
