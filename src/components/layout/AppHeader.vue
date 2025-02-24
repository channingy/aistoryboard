<script setup>
import { ref } from 'vue'
import { User } from '@element-plus/icons-vue'
import { logoUrl } from '@/assets/logo.js'

const currentLang = ref('中文')

const switchLang = () => {
  currentLang.value = currentLang.value === '中文' ? 'EN' : '中文'
}
</script>

<template>
  <header class="relative z-20 w-full">
    <div class="w-full px-6 py-4 flex items-center">
      <!-- Logo区域 - 靠左对齐 -->
      <div class="flex items-center cursor-pointer" @click="$router.push('/')">
        <!-- Logo -->
        <div class="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg">
          <img 
            :src="logoUrl" 
            alt="Logo" 
            class="w-6 h-6"
          >
        </div>
        <!-- 标题 -->
        <div class="ml-3">
          <h1 class="text-white text-lg font-medium">AI电影故事板</h1>
          <p class="text-gray-400 text-xs">AI Storyboard</p>
        </div>
      </div>

      <!-- 占位空间 -->
      <div class="flex-1"></div>

      <!-- 右侧操作区 -->
      <div class="flex items-center gap-4">
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

/* Logo背景渐变效果 */
.bg-gray-800 {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}
</style> 