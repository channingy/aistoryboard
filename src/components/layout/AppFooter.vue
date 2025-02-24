<script setup>
import { logoUrl } from '@/assets/logo.js'
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="w-full py-4 border-t border-gray-800/30 mb-4">
    <div class="w-full px-6 flex flex-col md:flex-row items-center md:items-start md:justify-between">
      <!-- 左侧区域 - 与header对齐 -->
      <div class="flex items-center mb-4 md:mb-0">
        <img :src="logoUrl" alt="Logo" class="w-8 h-8">
        <span class="ml-3 text-gray-400 text-sm">
          © {{ currentYear }} AI Storyboard. All rights reserved.
        </span>
      </div>

      <!-- 右侧链接 -->
      <div class="flex items-center gap-6">
        <el-link 
          type="info" 
          class="!text-gray-400 hover:!text-gray-300 text-sm"
        >
          用户协议
        </el-link>
        <el-link 
          type="info" 
          class="!text-gray-400 hover:!text-gray-300 text-sm"
        >
          隐私政策
        </el-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.el-link {
  @apply relative overflow-hidden;
}

.el-link::after {
  content: '';
  @apply absolute inset-0 bg-current opacity-20 transform scale-x-0 origin-center transition-transform;
}

.el-link:active::after {
  @apply scale-x-100;
}
</style> 