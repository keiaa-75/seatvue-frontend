<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import apiClient from '@/services/api'

const router = useRouter()

const newLayout = ref({
  name: '',
  rows: 10,
  columns: 10
})

const isLoading = ref(false)
const errorMessage = ref(null)

async function handleSubmit() {
  isLoading.value = true
  errorMessage.value = null

  try {
    await apiClient.post('/api/layouts', newLayout.value)
    router.push('/layouts')
  } catch (error) {
    console.error('Failed to create layout:', error)
    errorMessage.value = 'Failed to create layout. Please check the details.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="section">
    <div class="container">
      <h1 class="title">Add New Layout</h1>

      <form @submit.prevent="handleSubmit">
        <div class="box">
          <div class="field">
            <label class="label" for="layoutName">Layout Name</label>
            <div class="control">
              <input id="layoutName" class="input" type="text" v-model="newLayout.name" required />
            </div>
          </div>

          <div class="field">
            <label class="label" for="rows">Rows</label>
            <div class="control">
              <input id="rows" class="input" type="number" min="1" v-model.number="newLayout.rows" required />
            </div>
          </div>

          <div class="field">
            <label class="label" for="columns">Columns</label>
            <div class="control">
              <input id="columns" class="input" type="number" min="1" v-model.number="newLayout.columns" required />
            </div>
          </div>
        </div>

        <div v-if="errorMessage" class="notification is-danger is-light">
          {{ errorMessage }}
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button type="submit" class="button is-primary" :class="{ 'is-loading': isLoading }" :disabled="isLoading">
              Save
            </button>
          </div>
          <div class="control">
            <RouterLink to="/layouts" class="button is-light">
              Cancel
            </RouterLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>
