<script setup>
import { ref } from 'vue'
import { User } from '@element-plus/icons-vue'
import { logoUrl } from '@/assets/logo.js'

const currentLang = ref('中文')
const showUserMenu = ref(false)

const switchLang = () => {
  currentLang.value = currentLang.value === '中文' ? 'EN' : '中文'
  // TODO: 实现语言切换逻辑
}
</script>

<template>
  <header class="relative z-20 w-full">
    <div class="w-full px-6 py-4 flex items-center justify-between">
      <!-- Logo区域 - 靠左 -->
      <div class="flex items-center">
        <img 
          :src="logoUrl" 
          alt="Logo" 
          class="w-12 h-12"
        >
        <div class="ml-3">
          <h1 class="text-white text-xl font-bold">AI电影故事板</h1>
          <p class="text-gray-400 text-sm hidden md:block">AI Storyboard</p>
        </div>
      </div>

      <!-- 右侧操作区 - 靠右 -->
      <div class="flex items-center gap-3">
        <el-button 
          class="!bg-transparent !border-0 !text-white hover:!text-gray-300" 
          @click="switchLang"
        >
          {{ currentLang }}
        </el-button>

        <el-button 
          class="!bg-transparent !border-0 !text-white hover:!text-gray-300"
        >
          <el-icon class="text-xl"><User /></el-icon>
        </el-button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.el-button {
  @apply transition-colors duration-300;
}
</style> 