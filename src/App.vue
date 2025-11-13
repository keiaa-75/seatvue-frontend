<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <RouterLink class="navbar-item is-size-4 has-text-weight-bold" to="/">
          SeatVue
        </RouterLink>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <RouterLink class="navbar-item" to="/">Home</RouterLink>
          <RouterLink class="navbar-item" to="/manage">Manage</RouterLink>
          <RouterLink class="navbar-item" to="/about">About</RouterLink>
        </div>
      </div>
    </div>
  </nav>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
/* Add a class to make active links bold */
.router-link-active {
  font-weight: bold;
}
</style>