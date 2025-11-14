<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import apiClient from '@/services/api'

const route = useRoute()
const router = useRouter()
const sectionId = route.params.sectionId

const section = ref({
  id: sectionId,
  sectionName: '',
  gradeLevel: 'ELEVEN',
  strand: 'STEM'
})

const gradeLevels = ['ELEVEN', 'TWELVE']
const strands = ['STEM', 'HUMSS', 'ABM', 'TVL']

const isLoading = ref(true)
const isSaving = ref(false)
const isDeleting = ref(false)
const errorMessage = ref(null)

onMounted(async () => {
  try {
    const response = await apiClient.get(`/sections/${sectionId}`)
    section.value = response.data
  } catch (error) {
    console.error('Failed to fetch section data:', error)
    errorMessage.value = "Failed to load section data."
  } finally {
    isLoading.value = false
  }
})

async function handleUpdate() {
  isSaving.value = true
  errorMessage.value = null
  try {
    await apiClient.put(`/sections/${sectionId}`, section.value)
    
    router.push(`/manage/${sectionId}`)
  } catch (error) {
    console.error('Failed to update section:', error)
    errorMessage.value = "Failed to update section. Please check the details."
  } finally {
    isSaving.value = false
  }
}

async function handleDelete() {
  if (!confirm("Are you sure you want to delete this section? This will also delete all associated students and seat assignments. This action cannot be undone.")) {
    return
  }

  isDeleting.value = true
  errorMessage.value = null
  try {
    await apiClient.delete(`/sections/${sectionId}`)

    router.push(`/manage`)
  } catch (error) {
    console.error('Failed to delete section:', error)
    errorMessage.value = "Failed to delete section. Make sure all related items (like assignments) are removed first."
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

      <h1 class="title">Manage Section</h1>
      <p class="subtitle is-6">ID: {{ sectionId }}</p>

      <div v-if="isLoading" class="notification is-light">
        Loading section data...
      </div>

      <form v-if="!isLoading" @submit.prevent="handleUpdate">
        <div class="box">
          <div class="field">
            <label class="label" for="sectionName">Section Name</label>
            <div class="control">
              <input 
                id="sectionName"
                class="input" 
                type="text" 
                v-model="section.sectionName"
                required 
              />
            </div>
          </div>

          <div class="field">
            <label class="label" for="gradeLevel">Grade Level</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select id="gradeLevel" v-model="section.gradeLevel" required>
                  <option v-for="level in gradeLevels" :key="level" :value="level">
                    {{ level }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label" for="strand">Strand</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select id="strand" v-model="section.strand" required>
                  <option v-for="s in strands" :key="s" :value="s">
                    {{ s }}
                  </option>
                </select>
              </div>
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
              class="button is-primary" 
              style="background-color: #00BCD4;"
              :class="{ 'is-loading': isSaving }"
              :disabled="isSaving || isDeleting"
            >
              <span class="icon">
                <i class="fas fa-save"></i>
              </span>
              <span>Update Section</span>
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
              <span>Delete Section</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.box {
}
</style>