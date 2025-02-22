<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import PosterSwiper from '@/components/home/PosterSwiper.vue'
</script>

<template>
  <div class="fixed inset-0 w-full h-full overflow-hidden">
    <!-- 背景视频/图片容器 -->
    <PosterSwiper />
    
    <!-- 内容层 -->
    <div class="relative h-full w-full z-10 flex flex-col">
      <AppHeader class="bg-transparent" />
      
      <main class="flex-1 flex flex-col items-center justify-center px-4">
        <!-- 中心内容区域 -->
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white">
            你的专属AI电影故事板
          </h1>
          <p class="text-lg md:text-xl text-gray-300 mb-12">
            Your AI Storyboard Generator
          </p>
          <el-button 
            type="primary" 
            size="large"
            class="text-lg px-12 py-4 rounded-full hover:scale-105 transition-transform"
            @click="$router.push('/create')"
          >
            开始创作
          </el-button>
        </div>
      </main>

      <AppFooter class="bg-transparent border-t border-gray-800/30" />
    </div>
  </div>
</template>

<style scoped>
.el-button {
  background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
  border: none;
  font-weight: 600;
}

.el-button:hover {
  background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
}
</style> 