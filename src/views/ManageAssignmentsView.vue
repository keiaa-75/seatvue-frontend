<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import apiClient from '@/services/api'

const route = useRoute()
const sectionId = route.params.sectionId

const assignments = ref([])
const isLoading = ref(true)
const errorMessage = ref(null)

onMounted(async () => {
  try {
    const response = await apiClient.get(`/api/sections/${sectionId}/assignments`)
    assignments.value = response.data
  } catch (error) {
    console.error('Failed to fetch assignments:', error)
    errorMessage.value = 'Failed to load assignments. Please try again later.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="section">
    <div class="container">
      <div class="buttons is-justify-content-space-between mb-4">
        <RouterLink :to="`/manage/${sectionId}`" class="button is-light">
          Back
        </RouterLink>
        <RouterLink :to="`/manage/${sectionId}/assignments/new`" class="button is-primary">
          Add Assignment
        </RouterLink>
      </div>

      <h1 class="title">Manage Assignments</h1>

      <div v-if="isLoading" class="notification is-light">
        Loading assignments...
      </div>

      <div v-if="errorMessage" class="notification is-danger">
        {{ errorMessage }}
      </div>

      <div v-if="!isLoading && assignments" class="table-container">
        <table class="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th>Student</th>
              <th>Layout</th>
              <th>Seat (Row, Col)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="assignments.length === 0">
              <td colspan="4" class="has-text-centered">No assignments found in this section.</td>
            </tr>
            <tr v-for="assignment in assignments" :key="assignment.id">
              <td>{{ assignment.student.lastName }}, {{ assignment.student.firstName }}</td>
              <td>{{ assignment.classroomLayout.name }}</td>
              <td>R{{ assignment.rowNumber }}, C{{ assignment.columnNumber }}</td>
              <td>
                <RouterLink :to="`/manage/${sectionId}/assignments/${assignment.id}/edit`" class="button is-small is-link">
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
    overflow: hidden;
}

.buttons.is-justify-content-space-between {
  padding: 0;
}
</style>
