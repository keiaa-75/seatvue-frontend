<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import apiClient from '@/services/api'

const route = useRoute()
const router = useRouter()
const { layoutId } = route.params

const layout = ref(null)
const isLoading = ref(true)
const isSaving = ref(false)
const isDeleting = ref(false)
const errorMessage = ref(null)

onMounted(async () => {
  try {
    const response = await apiClient.get(`/api/layouts/${layoutId}`)
    layout.value = response.data
  } catch (error) {
    console.error('Failed to fetch layout data:', error)
    errorMessage.value = "Failed to load layout data. It may no longer exist."
  } finally {
    isLoading.value = false
  }
})

async function handleUpdate() {
  isSaving.value = true
  errorMessage.value = null
  try {
    await apiClient.put(`/api/layouts/${layoutId}`, layout.value)
    router.push('/layouts')
  } catch (error) {
    console.error('Failed to update layout:', error)
    errorMessage.value = "Failed to update layout. Please check the details."
  } finally {
    isSaving.value = false
  }
}

async function handleDelete() {
  if (!confirm("Are you sure you want to delete this layout? This action cannot be undone.")) {
    return
  }

  isDeleting.value = true
  errorMessage.value = null
  try {
    await apiClient.delete(`/api/layouts/${layoutId}`)
    router.push('/layouts')
  } catch (error) {
    console.error('Failed to delete layout:', error)
    errorMessage.value = "Failed to delete layout."
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div class="section">
    <div class="container">
      <h1 class="title">Edit Layout</h1>

      <div v-if="isLoading" class="notification is-light">
        Loading layout data...
      </div>

      <form v-if="!isLoading && layout" @submit.prevent="handleUpdate">
        <div class="box">
          <div class="field">
            <label class="label" for="layoutName">Layout Name</label>
            <div class="control">
              <input id="layoutName" class="input" type="text" v-model="layout.name" required />
            </div>
          </div>

          <div class="field">
            <label class="label" for="rows">Rows</label>
            <div class="control">
              <input id="rows" class="input" type="number" min="1" v-model.number="layout.rows" required />
            </div>
          </div>

          <div class="field">
            <label class="label" for="columns">Columns</label>
            <div class="control">
              <input id="columns" class="input" type="number" min="1" v-model.number="layout.columns" required />
            </div>
          </div>
        </div>

        <div v-if="errorMessage" class="notification is-danger is-light">
          {{ errorMessage }}
        </div>

        <div class="field is-grouped is-justify-content-space-between">
          <div class="control">
            <button type="submit" class="button is-primary" :class="{ 'is-loading': isSaving }" :disabled="isSaving || isDeleting">
              Update
            </button>
          </div>
          <div class="control">
            <button type="button" class="button is-danger" :class="{ 'is-loading': isDeleting }" :disabled="isSaving || isDeleting" @click="handleDelete">
              Delete
            </button>
          </div>
        </div>
         <div class="field is-grouped mt-4">
           <div class="control">
              <RouterLink to="/layouts" class="button is-light">
                Back to Layouts
              </RouterLink>
            </div>
         </div>
      </form>
      
      <div v-if="!isLoading && !layout" class="notification is-warning">
        Could not load layout data. It may no longer exist.
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
}
</style>
