import { createRouter, createWebHashHistory } from 'vue-router'
import Homepage from '../components/Homepage.vue'

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: Homepage
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
