<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <section class="hero is-primary is-medium" style="background-color: #00BCD4; border-radius: 0;">
      <div class="hero-body has-text-centered">
        <div class="container">
          <h1 class="title is-1" style="color: #ffffff;">SeatVue</h1>
          <p class="subtitle is-4" style="color: #ffffff;">Effortless classroom seat assignment management</p>
        </div>
      </div>
    </section>

    <div class="container p-4">
      
      <div class="notification is-info is-light" style="background-color: #00BCD4; color: #ffffff; border-radius: 0;">
        <p>This project is still under development. You can follow the progress on GitHub.</p>
      </div>

      <RouterLink to="/manage" class="button is-fullwidth is-large is-primary" style="background-color: #00BCD4; border-radius: 0;">
        <span style="color: #ffffff;">Start managing records</span>
        <span class="icon is-right">
          <i class="fas fa-arrow-right"></i>
        </span>
      </RouterLink>

    </div>
  </div>
</template>

<style scoped>
.button .icon.is-right {
  margin-left: auto;
}
.button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>