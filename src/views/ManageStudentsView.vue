<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import apiClient from '@/services/api'

const route = useRoute()
const sectionId = route.params.sectionId

const students = ref(null)
const isLoading = ref(true)
const errorMessage = ref(null)

onMounted(async () => {
  try {
    const response = await apiClient.get(`/sections/${sectionId}/students`)
    students.value = response.data
  } catch (error) {
    console.error('Failed to fetch students:', error)
    errorMessage.value = `Failed to load students for section ${sectionId}.`
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
          <span class="icon">
            <i class="fas fa-arrow-left"></i>
          </span>
          <span>Back to Dashboard</span>
        </RouterLink>
        
        <RouterLink :to="`/manage/${sectionId}/students/new`" class="button is-primary" style="background-color: #00BCD4;">
          <span class="icon">
            <i class="fas fa-plus"></i>
          </span>
          <span>Add Student</span>
        </RouterLink>
      </div>

      <h1 class="title">Manage Students</h1>
      <p class="subtitle is-6">Section ID: {{ sectionId }}</p>

      <div v-if="isLoading" class="notification is-light">
        Loading students...
      </div>

      <div v-if="errorMessage" class="notification is-danger">
        {{ errorMessage }}
      </div>

      <div v-if="!isLoading && students" class="table-container">
        <table class="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="students.length === 0">
              <td colspan="3" class="has-text-centered">No students found in this section.</td>
            </tr>
            <tr v-for="student in students" :key="student.studentId">
              <td>{{ student.studentId }}</td>
              <td>{{ student.lastName }}, {{ student.firstName }} {{ student.middleName }}</td>
              <td>
                <RouterLink :to="`/manage/${sectionId}/students/${student.studentId}/edit`" class="button is-small is-link">
                  <span class="icon">
                    <i class="fas fa-edit"></i>
                  </span>
                  <span>Edit</span>
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