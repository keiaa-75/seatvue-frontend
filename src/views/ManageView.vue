<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const sectionId = route.params.sectionId
</script>

<template>
  <div>
    <h2 class="title is-4">Manage Section (ID: {{ sectionId }})</h2>
    <p class="subtitle is-6">What would you like to do?</p>

    <div class="columns is-multiline">

      <div class="column is-one-third">
        <div class="box has-text-centered">
          <span class="icon is-large has-text-success">
            <i class="fas fa-plus fa-2x"></i>
          </span>
          <h3 class="title is-5 mt-3">New Assignment</h3>
          <p class="mb-4">Create a new seat assignment for a student.</p>
          <RouterLink :to="`/manage/${sectionId}/assignments/new`" class="button is-success is-fullwidth">
            Create
          </RouterLink>
        </div>
      </div>
      
      <div class="column is-one-third">
        <div class="box has-text-centered">
          <span class="icon is-large has-text-info">
            <i class="fas fa-chair fa-2x"></i>
          </span>
          <h3 class="title is-5 mt-3">Manage Assignments</h3>
          <p class="mb-4">View, edit, or delete existing seat assignments.</p>
          <RouterLink :to="`/manage/${sectionId}/assignments`" class="button is-info is-fullwidth">
            Manage
          </RouterLink>
        </div>
      </div>

      <div class="column is-one-third">
        <div class="box has-text-centered">
          <span class="icon is-large has-text-primary">
            <i class="fas fa-users fa-2x"></i>
          </span>
          <h3 class="title is-5 mt-3">Manage Students</h3>
          <p class="mb-4">Add, edit, or delete students in this section.</p>
          <RouterLink :to="`/manage/${sectionId}/students`" class="button is-primary is-fullwidth">
            Manage
          </RouterLink>
        </div>
      </div>

      <div class="column is-one-third">
        <div class="box has-text-centered">
          <span class="icon is-large has-text-link">
            <i class="fas fa-file-upload fa-2x"></i>
          </span>
          <h3 class="title is-5 mt-3">Import Students</h3>
          <p class="mb-4">Upload a CSV file to add multiple students at once.</p>
          <RouterLink :to="`/manage/${sectionId}/students/import`" class="button is-link is-fullwidth">
            Import
          </RouterLink>
        </div>
      </div>

      <div class="column is-one-third">
        <div class="box has-text-centered">
          <span class="icon is-large has-text-warning">
            <i class="fas fa-edit fa-2x"></i>
          </span>
          <h3 class="title is-5 mt-3">Manage Section</h3>
          <p class="mb-4">Update the name, grade level, or strand.</p>
          <RouterLink :to="`/manage/${sectionId}/edit`" class="button is-warning is-fullwidth">
            Edit
          </RouterLink>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.icon i {
  font-size: 2.5rem;
}
.box {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.box .button {
  margin-top: auto;
}
</style>