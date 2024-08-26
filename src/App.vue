<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="w-100">
    <nav class="w-100 d-flex flex-row">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
@media (max-width: 768px) {
}
</style>
