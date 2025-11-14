import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ManageView from '../views/ManageView.vue'
import AboutView from '../views/AboutView.vue'
import SectionDashboard from '../views/SectionDashboard.vue'

import NewAssignmentView from '../views/NewAssignmentView.vue'
import ManageAssignmentsView from '../views/ManageAssignmentsView.vue'
import ManageStudentsView from '../views/ManageStudentsView.vue'
import ImportStudentsView from '../views/ImportStudentsView.vue'
import EditSectionView from '../views/EditSectionView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/manage',
      name: 'manage',
      component: ManageView,
      children: [
        {
          path: ':sectionId',
          name: 'section-dashboard',
          component: SectionDashboard
        },

        {
          path: ':sectionId/assignments/new',
          name: 'new-assignment',
          component: NewAssignmentView
        },
        {
          path: ':sectionId/assignments',
          name: 'manage-assignments',
          component: ManageAssignmentsView
        },
        {
          path: ':sectionId/students',
          name: 'manage-students',
          component: ManageStudentsView
        },
        {
          path: ':sectionId/students/import',
          name: 'import-students',
          component: ImportStudentsView
        },
        {
          path: ':sectionId/edit',
          name: 'edit-section',
          component: EditSectionView
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router