<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import apiClient from '@/services/api'

const layouts = ref([])
const isLoading = ref(true)
const errorMessage = ref(null)

onMounted(async () => {
  try {
    const response = await apiClient.get('/api/layouts')
    layouts.value = response.data
  } catch (error) {
    console.error('Failed to fetch layouts:', error)
    errorMessage.value = 'Failed to load layouts. Please try again later.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="section">
    <div class="container">
      <div class="buttons is-justify-content-space-between mb-4">
        <h1 class="title">Manage Layouts</h1>
        <RouterLink to="/layouts/new" class="button is-primary">
          <span class="icon"><i class="fas fa-plus"></i></span>
          <span>Add Layout</span>
        </RouterLink>
      </div>

      <div v-if="isLoading" class="notification is-light">
        Loading layouts...
      </div>

      <div v-if="errorMessage" class="notification is-danger">
        {{ errorMessage }}
      </div>

      <div v-if="!isLoading && layouts" class="table-container">
        <table class="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Rows</th>
              <th>Columns</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="layouts.length === 0">
              <td colspan="5" class="has-text-centered">No layouts found.</td>
            </tr>
            <tr v-for="layout in layouts" :key="layout.id">
              <td>{{ layout.id }}</td>
              <td>{{ layout.name }}</td>
              <td>{{ layout.rows }}</td>
              <td>{{ layout.columns }}</td>
              <td>
                <RouterLink :to="`/layouts/${layout.id}/edit`" class="button is-small is-link">
                  Edit
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    overflow: hidden;
}

.buttons.is-justify-content-space-between {
  padding: 0;
  align-items: center;
}
</style>
