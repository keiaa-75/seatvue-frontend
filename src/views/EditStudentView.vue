<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import apiClient from '@/services/api'

const route = useRoute()
const router = useRouter()
const { sectionId, studentId } = route.params

const student = ref({
  studentId: '',
  firstName: '',
  lastName: '',
  middleName: '',
  suffix: ''
})

const isLoading = ref(true)
const isSaving = ref(false)
const isDeleting = ref(false)
const errorMessage = ref(null)

onMounted(async () => {
  try {
    const response = await apiClient.get(`/sections/${sectionId}/students/${studentId}`)
    student.value = response.data
  } catch (error) {
    console.error('Failed to fetch student data:', error)
    errorMessage.value = "Failed to load student data. They may no longer exist."
  } finally {
    isLoading.value = false
  }
})

async function handleUpdate() {
  isSaving.value = true
  errorMessage.value = null
  try {
    await apiClient.put(`/sections/${sectionId}/students/${studentId}`, student.value)

    router.push(`/manage/${sectionId}/students`)
  } catch (error) {
    console.error('Failed to update student:', error)
    errorMessage.value = "Failed to update student. Please check the details."
  } finally {
    isSaving.value = false
  }
}

async function handleDelete() {
  if (!confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
    return
  }

  isDeleting.value = true
  errorMessage.value = null
  try {
    await apiClient.delete(`/sections/${sectionId}/students/${studentId}`)
    
    // On success, go back to the student list
    router.push(`/manage/${sectionId}/students`)
  } catch (error) {
    console.error('Failed to delete student:', error)
    errorMessage.value = "Failed to delete student."
  } finally {
    isDeleting.value = false
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

      <h1 class="title">Edit Student</h1>
      <p class="subtitle is-6">ID: {{ studentId }}</p>

      <div v-if="isLoading" class="notification is-light">
        Loading student data...
      </div>

      <form v-if="!isLoading" @submit.prevent="handleUpdate">
        <div class="box">
          <div class="field">
            <label class="label" for="studentId">Student ID</label>
            <div class="control">
              <input 
                id="studentId" 
                class="input" 
                type="text"
                v-model="student.studentId"
                required
                readonly
                disabled
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
                v-model="student.firstName"
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
                v-model="student.lastName"
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
                v-model="student.middleName"
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
                v-model="student.suffix"
              />
            </div>
          </div>
        </div>

        <div v-if="errorMessage" class="notification is-danger is-light">
          {{ errorMessage }}
        </div>

        <div class="field is-grouped is-justify-content-space-between">
          <div class="control">
            <button 
              type="submit" 
              class="button is-primary btn-primary flat-squared"
              :class="{ 'is-loading': isSaving }"
              :disabled="isSaving || isDeleting"
            >
              <span class="icon">
                <i class="fas fa-save"></i>
              </span>
              <span>Update Student</span>
            </button>
          </div>
          <div class="control">
            <button 
              type="button" 
              class="button is-danger"
              :class="{ 'is-loading': isDeleting }"
              :disabled="isSaving || isDeleting"
              @click="handleDelete"
            >
              <span class="icon">
                <i class="fas fa-trash"></i>
              </span>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </form>

    </div>
  </div>
</template>

<style scoped>
</style>