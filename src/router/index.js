import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScriptInput from '../views/ScriptInput.vue'
import ProjectSettings from '../views/ProjectSettings.vue'
import ShotList from '../views/ShotList.vue'
import StoryboardList from '../views/StoryboardList.vue'
import StoryboardDetail from '../views/StoryboardDetail.vue'

// ... 其他导入

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/script-input',
      name: 'scriptInput',
      component: ScriptInput
    },
    {
      path: '/project-settings',
      name: 'projectSettings',
      component: ProjectSettings
    },
    {
      path: '/shot-list',
      name: 'shotList',
      component: ShotList
    },
    {
      path: '/storyboard-list',
      name: 'storyboardList',
      component: StoryboardList
    },
    {
      path: '/storyboard/:id',
      name: 'storyboardDetail',
      component: StoryboardDetail
    },
    // 将所有未匹配的路由重定向到首页
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router 