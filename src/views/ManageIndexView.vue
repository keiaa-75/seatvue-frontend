<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/services/api' 

const sections = ref(null) 
const selectedSectionId = ref(null) 
const isLoading = ref(true)
const errorMessage = ref(null)

const router = useRouter() 

onMounted(async () => {
  try {
    const response = await apiClient.get('/sections') 
    sections.value = response.data
  } catch (error) {
    console.error('Failed to fetch sections:', error)
    errorMessage.value = 'Failed to load sections. Please try again later.'
  } finally {
    isLoading.value = false
  }
})

function handleSectionChange() {
  if (selectedSectionId.value) {
    router.push(`/manage/${selectedSectionId.value}`) 
  }
}
</script>

<template>
  <div class="container p-4">
    <section class="section">
      <h1 class="title">Manage Sections</h1>
      <p class="subtitle">Select a section to begin managing students and assignments.</p>

      <div v-if="isLoading" class="notification is-light">
        Loading sections...
      </div>

      <div v-if="errorMessage" class="notification is-danger">
        {{ errorMessage }}
      </div>

      <div v-if="!isLoading && sections" class="field">
        <label class="label" for="section-select">Select a Section</label>
        <div class="control">
          <div class="select is-fullwidth is-large">
            <select id="section-select" v-model="selectedSectionId" @change="handleSectionChange">
              <option :value="null" disabled>-- Please choose a section --</option>
              <option v-for="section in sections" :key="section.id" :value="section.id">
                {{ section.sectionName }} ({{ section.gradeLevel }} - {{ section.strand }})
              </option>
            </select>
          </div>
        </div>
      </div>
      
      </section>
  </div>
</template>

<style scoped>
.select.is-large {
  font-size: 1.25rem;
}
</style>