<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <RouterView />
  </main>

  <nav class="bottom-nav" role="navigation" aria-label="bottom navigation">
    <RouterLink class="bottom-nav-item" to="/">
      <i class="fas fa-home bottom-nav-icon"></i>
      <span class="bottom-nav-text">Home</span>
    </RouterLink>
    
    <RouterLink class="bottom-nav-item" to="/manage">
      <i class="fas fa-tasks bottom-nav-icon"></i>
      <span class="bottom-nav-text">Manage</span>
    </RouterLink>
    
    <RouterLink class="bottom-nav-item" to="/about">
      <i class="fas fa-info-circle bottom-nav-icon"></i>
      <span class="bottom-nav-text">About</span>
    </RouterLink>
  </nav>
</template>