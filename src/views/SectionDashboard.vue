<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const sectionId = route.params.sectionId
</script>

<template>
  <div class="section">
    <h1 class="title is-4">What to do?</h1>
    <p class="subtitle is-6">Section ID: {{ sectionId }}</p>

    <div class="buttons is-vcentered is-fullwidth">
      <RouterLink :to="`/manage/${sectionId}/assignments/new`" class="button is-fullwidth is-medium mb-3" style="background-color: #00BCD4; color: white; border-radius: 0;">
        <span class="icon is-left">
          <i class="fas fa-plus"></i>
        </span>
        <span>New Assignment</span>
      </RouterLink>

      <RouterLink :to="`/manage/${sectionId}/assignments`" class="button is-fullwidth is-medium mb-3" style="background-color: #00BCD4; color: white; border-radius: 0;">
        <span class="icon is-left">
          <i class="fas fa-chair"></i>
        </span>
        <span>Manage Assignments</span>
      </RouterLink>

      <RouterLink :to="`/manage/${sectionId}/students`" class="button is-fullwidth is-medium mb-3" style="background-color: #00BCD4; color: white; border-radius: 0;">
        <span class="icon is-left">
          <i class="fas fa-users"></i>
        </span>
        <span>Manage Students</span>
      </RouterLink>

      <RouterLink :to="`/manage/${sectionId}/students/import`" class="button is-fullwidth is-medium mb-3" style="background-color: #00BCD4; color: white; border-radius: 0;">
        <span class="icon is-left">
          <i class="fas fa-file-upload"></i>
        </span>
        <span>Import Students</span>
      </RouterLink>

      <RouterLink :to="`/manage/${sectionId}/edit`" class="button is-fullwidth is-medium mb-3" style="background-color: #00BCD4; color: white; border-radius: 0;">
        <span class="icon is-left">
          <i class="fas fa-edit"></i>
        </span>
        <span>Manage Section</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.buttons.is-vcentered {
  flex-direction: column;
}
</style>