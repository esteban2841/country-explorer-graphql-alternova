<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import BootstrapTable from '../components/molecules/BootstrapTable.vue'

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      capital
      currency
      continent {
        code
        name
      }
    }
  }
`
const { result } = useQuery(LIST_COUNTRIES)
const countries = computed(() => result.value?.countries ?? [])
</script>

<template>
  <main class="w-100 d-flex flex-column justify-content-center align-items-center">
    <h1>Countries list table</h1>
    <BootstrapTable :data="countries" />
  </main>
</template>
