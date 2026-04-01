import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Agents from '@/views/Agents.vue'
import Reports from '@/views/Reports.vue'
import Settings from '@/views/Settings.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/agents',
      name: 'Agents',
      component: Agents
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
})

export default router
