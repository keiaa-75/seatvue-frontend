<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <RouterView />
  </main>

  <nav class="bottom-nav" role="navigation" aria-label="bottom navigation">
    <RouterLink class="bottom-nav-item" to="/">
      <span class="bottom-nav-text">Home</span>
    </RouterLink>
    
    <RouterLink class="bottom-nav-item" to="/manage">
      <span class="bottom-nav-text">Manage</span>
    </RouterLink>
    
    <RouterLink class="bottom-nav-item" to="/about">
      <span class="bottom-nav-text">About</span>
    </RouterLink>
  </nav>
</template>