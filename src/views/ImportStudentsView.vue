<script setup>
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import apiClient from '@/services/api'

const route = useRoute()
const router = useRouter()
const sectionId = route.params.sectionId

const selectedFile = ref(null)
const isLoading = ref(false)
const errorMessage = ref(null)
const successMessage = ref(null)

function handleFileChange(event) {
  selectedFile.value = event.target.files[0]
  errorMessage.value = null
  successMessage.value = null
}

async function handleSubmit() {
  if (!selectedFile.value) {
    errorMessage.value = "Please select a file to upload."
    return
  }

  isLoading.value = true
  errorMessage.value = null
  successMessage.value = null

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  try {
    await apiClient.post(
      `/sections/${sectionId}/students/import`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    
    successMessage.value = "Students imported successfully! Redirecting to student list..."

    setTimeout(() => {
      router.push(`/manage/${sectionId}/students`)
    }, 2000)

  } catch (error) {
    console.error('Failed to import students:', error)
    errorMessage.value = "Failed to import file. Please check the file format and try again."
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="section">
    <div class="container">
      <div class="mb-4">
        <RouterLink :to="`/manage/${sectionId}`" class="button is-light">
          <span class="icon">
            <i class="fas fa-arrow-left"></i>
          </span>
          <span>Back to Dashboard</span>
        </RouterLink>
      </div>

      <h1 class="title">Import Students</h1>
      <p class="subtitle is-6">Upload a CSV file to add multiple students to Section {{ sectionId }}.</p>

      <div class="box">
        <form @submit.prevent="handleSubmit">
          <div class="field">
            <label class="label">CSV File</label>
            <div class="control">
              <div class="file has-name is-fullwidth">
                <label class="file-label">
                  <input class="file-input" type="file" @change="handleFileChange" accept=".csv" />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Choose a file…
                    </span>
                  </span>
                  <span class="file-name">
                    {{ selectedFile ? selectedFile.name : "No file selected" }}
                  </span>
                </label>
              </div>
            </div>
            <p class="help">Required headers: studentId, firstName, lastName, middleName, suffix</p>
          </div>

          <div v-if="errorMessage" class="notification is-danger is-light mt-4">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="notification is-success is-light mt-4">
            {{ successMessage }}
          </div>

          <div class="field is-grouped mt-5">
            <div class="control">
              <button 
                type="submit" 
                class="button is-link" 
                :class="{ 'is-loading': isLoading }"
                :disabled="isLoading"
              >
                <span class="icon">
                  <i class="fas fa-file-upload"></i>
                </span>
                <span>Upload and Import</span>
              </button>
            </div>
            <div class="control">
              <RouterLink :to="`/manage/${sectionId}`" class="button is-light">
                Cancel
              </RouterLink>
            </div>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<style scoped>
.box {
}
</style>