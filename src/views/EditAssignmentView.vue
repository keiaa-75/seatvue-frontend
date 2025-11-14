<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import apiClient from '@/services/api'

const route = useRoute()
const router = useRouter()
const { sectionId, assignmentId } = route.params

const assignment = ref({
  id: null,
  studentId: null,
  layoutId: null,
  rowNumber: 1,
  columnNumber: 1
})

const students = ref([])
const layouts = ref([])
const isLoading = ref(true)
const isSaving = ref(false)
const isDeleting = ref(false)
const errorMessage = ref(null)

onMounted(async () => {
  try {
    const [assignmentResponse, studentsResponse, layoutsResponse] = await Promise.all([
      apiClient.get(`/sections/${sectionId}/assignments/${assignmentId}`),
      apiClient.get(`/sections/${sectionId}/students`),
      apiClient.get('/api/layouts')
    ])

    const fetchedAssignment = assignmentResponse.data
    assignment.value = {
      id: fetchedAssignment.id,
      studentId: fetchedAssignment.student.studentId,
      layoutId: fetchedAssignment.classroomLayout.id,
      rowNumber: fetchedAssignment.rowNumber,
      columnNumber: fetchedAssignment.columnNumber
    }

    students.value = studentsResponse.data
    layouts.value = layoutsResponse.data

  } catch (error) {
    console.error('Failed to fetch data:', error)
    errorMessage.value = "Failed to load assignment data. It may have been deleted."
  } finally {
    isLoading.value = false
  }
})

async function handleUpdate() {
  isSaving.value = true
  errorMessage.value = null

  const payload = {
    student: { studentId: assignment.value.studentId },
    classroomLayout: { id: assignment.value.layoutId },
    rowNumber: assignment.value.rowNumber,
    columnNumber: assignment.value.columnNumber
  }

  try {
    await apiClient.put(`/sections/${sectionId}/assignments/${assignmentId}`, payload)
    router.push(`/manage/${sectionId}/assignments`)
  } catch (error) {
    console.error('Failed to update assignment:', error)
    errorMessage.value = "Failed to update assignment. Please check the details."
  } finally {
    isSaving.value = false
  }
}

async function handleDelete() {
  if (!confirm("Are you sure you want to delete this assignment? This action cannot be undone.")) {
    return
  }

  isDeleting.value = true
  errorMessage.value = null
  try {
    await apiClient.delete(`/sections/${sectionId}/assignments/${assignmentId}`)
    router.push(`/manage/${sectionId}/assignments`)
  } catch (error) {
    console.error('Failed to delete assignment:', error)
    errorMessage.value = "Failed to delete assignment."
  } finally {
    isDeleting.value = false
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

      <h1 class="title">Edit Seat Assignment</h1>

      <div v-if="isLoading" class="notification is-light">
        Loading assignment data...
      </div>

      <form v-if="!isLoading && assignment.id" @submit.prevent="handleUpdate">
        <div class="box">
          <div class="field">
            <label class="label" for="student">Student</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select id="student" v-model="assignment.studentId" required>
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
                <select id="layout" v-model="assignment.layoutId" required>
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
              <input id="rowNumber" class="input" type="number" min="1" v-model.number="assignment.rowNumber" required />
            </div>
          </div>

          <div class="field">
            <label class="label" for="columnNumber">Column Number</label>
            <div class="control">
              <input id="columnNumber" class="input" type="number" min="1" v-model.number="assignment.columnNumber" required />
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
      </form>
      
      <div v-if="!isLoading && !assignment.id" class="notification is-warning">
        Could not load assignment data. It may no longer exist.
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
}
</style>
