<script setup>
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import apiClient from '@/services/api'

const route = useRoute()
const router = useRouter()
const sectionId = route.params.sectionId

const newStudent = ref({
  studentId: '',
  firstName: '',
  lastName: '',
  middleName: '',
  suffix: ''
})

const isLoading = ref(false)
const errorMessage = ref(null)

async function handleSubmit() {
  isLoading.value = true
  errorMessage.value = null

  try {
    await apiClient.post(`/sections/${sectionId}/students`, newStudent.value)
    
    // On success, go back to the student list
    router.push(`/manage/${sectionId}/students`)

  } catch (error) {
    console.error('Failed to create student:', error)
    if (error.response && error.response.data) {
        errorMessage.value = `Failed to create student: ${error.response.data.message || 'Please check the details.'}`
    } else {
        errorMessage.value = 'An unexpected error occurred.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="section">
    <div class="container">
      <div class="mb-4">
        <RouterLink :to="`/manage/${sectionId}/students`" class="button is-light">
          <span class="icon">
            <i class="fas fa-arrow-left"></i>
          </span>
          <span>Back to Student List</span>
        </RouterLink>
      </div>

      <h1 class="title">Add New Student</h1>
      <p class="subtitle is-6">Section ID: {{ sectionId }}</p>

      <form @submit.prevent="handleSubmit">
        <div class="box">
          <div class="field">
            <label class="label" for="studentId">Student ID</label>
            <div class="control">
              <input 
                id="studentId" 
                class="input" 
                type="text" 
                placeholder="e.g., 12345678"
                v-model="newStudent.studentId"
                required 
              />
            </div>
          </div>

          <div class="field">
            <label class="label" for="firstName">First Name</label>
            <div class="control">
              <input 
                id="firstName"
                class="input" 
                type="text" 
                placeholder="e.g., Juan"
                v-model="newStudent.firstName"
                required 
              />
            </div>
          </div>

          <div class="field">
            <label class="label" for="lastName">Last Name</label>
            <div class="control">
              <input 
                id="lastName"
                class="input" 
                type="text" 
                placeholder="e.g., Dela Cruz"
                v-model="newStudent.lastName"
                required 
              />
            </div>
          </div>

          <div class="field">
            <label class="label" for="middleName">Middle Name (Optional)</label>
            <div class="control">
              <input 
                id="middleName"
                class="input" 
                type="text"
                v-model="newStudent.middleName"
              />
            </div>
          </div>

          <div class="field">
            <label class="label" for="suffix">Suffix (Optional)</label>
            <div class="control">
              <input 
                id="suffix"
                class="input" 
                type="text" 
                placeholder="e.g., Jr."
                v-model="newStudent.suffix"
              />
            </div>
          </div>
        </div>

        <div v-if="errorMessage" class="notification is-danger is-light">
          {{ errorMessage }}
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button 
              type="submit" 
              class="button is-primary" 
              style="background-color: #00BCD4;"
              :class="{ 'is-loading': isLoading }"
              :disabled="isLoading"
            >
              <span class="icon">
                <i class="fas fa-save"></i>
              </span>
              <span>Save Student</span>
            </button>
          </div>
          <div class="control">
            <RouterLink :to="`/manage/${sectionId}/students`" class="button is-light">
              Cancel
            </RouterLink>
          </div>
        </div>
      </form>

    </div>
  </div>
</template>

<style scoped>
.box {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>