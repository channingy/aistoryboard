import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// ... 其他导入

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // 将所有未匹配的路由重定向到首页
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router 