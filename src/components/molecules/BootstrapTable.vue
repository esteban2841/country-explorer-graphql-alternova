<template lang="">
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
        <tr v-for="(country, index) in props.data" :key="index" :id="country.code">
          <th scope="row">{{ index }}</th>
          <td>{{ country.name }}</td>
          <td>{{ country.code }}</td>
          <td>{{ country.capital }}</td>
          <td>{{ country.continent.name }}</td>
          <td>{{ country.currency }}</td>
        </tr>
      </tbody>
    </table>
</template>
<script setup lang="ts">
    const props = defineProps({
        data: {
            type: Array,
            default: ()=>[]
        }
    });
</script>
<style lang="">
    
</style>