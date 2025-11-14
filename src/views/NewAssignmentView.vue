<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import apiClient from '@/services/api'

const route = useRoute()
const router = useRouter()
const sectionId = route.params.sectionId

const newAssignment = ref({
  studentId: null,
  layoutId: null,
  rowNumber: 1,
  columnNumber: 1
})

const students = ref([])
const layouts = ref([])
const isLoading = ref(true)
const errorMessage = ref(null)

onMounted(async () => {
  errorMessage.value = null
  try {
    const [studentsResponse, layoutsResponse] = await Promise.all([
      apiClient.get(`/sections/${sectionId}/students`),
      apiClient.get('/api/layouts')
    ])
    students.value = studentsResponse.data
    layouts.value = layoutsResponse.data
  } catch (error) {
    console.error('Failed to fetch initial data:', error)
    errorMessage.value = 'Failed to load data for creating an assignment. Please go back and try again.'
  } finally {
    isLoading.value = false
  }
})

async function handleSubmit() {
  isLoading.value = true
  errorMessage.value = null

  if (!newAssignment.value.studentId || !newAssignment.value.layoutId) {
    errorMessage.value = 'Please select both a student and a layout.'
    isLoading.value = false
    return
  }

  const payload = {
    student: { studentId: newAssignment.value.studentId },
    classroomLayout: { id: newAssignment.value.layoutId },
    rowNumber: newAssignment.value.rowNumber,
    columnNumber: newAssignment.value.columnNumber
  }

  try {
    await apiClient.post(`/sections/${sectionId}/assignments`, payload)
    router.push(`/manage/${sectionId}/assignments`)
  } catch (error) {
    console.error('Failed to create assignment:', error)
    if (error.response && error.response.data) {
      errorMessage.value = `Failed to create assignment: ${error.response.data.message || 'Please check the details.'}`
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
        <RouterLink :to="`/manage/${sectionId}/assignments`" class="button is-light">
          <span>Back to Assignments</span>
        </RouterLink>
      </div>

      <h1 class="title">New Seat Assignment</h1>

      <div v-if="isLoading && !students.length" class="notification is-light">
        Loading form data...
      </div>

      <div v-if="errorMessage && !students.length" class="notification is-danger">
        {{ errorMessage }}
      </div>

      <form v-if="!isLoading || students.length" @submit.prevent="handleSubmit">
        <div class="box">
          <div class="field">
            <label class="label" for="student">Student</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select id="student" v-model="newAssignment.studentId" required>
                  <option :value="null" disabled>-- Select a Student --</option>
                  <option v-for="student in students" :key="student.studentId" :value="student.studentId">
                    {{ student.lastName }}, {{ student.firstName }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label" for="layout">Layout</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select id="layout" v-model="newAssignment.layoutId" required>
                  <option :value="null" disabled>-- Select a Layout --</option>
                  <option v-for="layout in layouts" :key="layout.id" :value="layout.id">
                    {{ layout.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label" for="rowNumber">Row Number</label>
            <div class="control">
              <input id="rowNumber" class="input" type="number" min="1" v-model.number="newAssignment.rowNumber" required />
            </div>
          </div>

          <div class="field">
            <label class="label" for="columnNumber">Column Number</label>
            <div class="control">
              <input id="columnNumber" class="input" type="number" min="1" v-model.number="newAssignment.columnNumber" required />
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
            <RouterLink :to="`/manage/${sectionId}/assignments`" class="button is-light">
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
}
</style>
