import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ManageView from '../views/ManageView.vue'
import AboutView from '../views/AboutView.vue'
import SectionDashboard from '../views/SectionDashboard.vue'

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