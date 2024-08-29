<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/molecules/NavBar.vue'
</script>

<template>
  <header class="w-100 d-flex flex-row justify-content-center align-items-center">
    <NavBar />
  </header>
  <router-view />
</template>

<style scoped>
@media (max-width: 768px) {
}
</style>
