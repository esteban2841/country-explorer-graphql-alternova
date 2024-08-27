<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const country = ref({ ...router.currentRoute.value.query })
console.log('TCL: country', country)
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
