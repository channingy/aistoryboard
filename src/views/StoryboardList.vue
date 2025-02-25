<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const route = useRoute()

// 获取路由参数
const aspectRatio = computed(() => route.query.aspectRatio || '16:9')
const artStyle = computed(() => route.query.artStyle || 'sketch')

// 计算宽高比样式
const aspectRatioStyle = computed(() => {
  switch (aspectRatio.value) {
    case '16:9':
      return { paddingBottom: '56.25%' } // 16:9 = 9/16 = 0.5625
    case '1:1':
      return { paddingBottom: '100%' } // 1:1 = 1/1 = 1
    case '9:16':
      return { paddingBottom: '177.78%' } // 9:16 = 16/9 = 1.7778
    default:
      return { paddingBottom: '56.25%' }
  }
})

// 故事板列表数据
const storyboards = ref([
  {
    id: 1,
    shotNumber: 1,
    imageUrl: 'https://via.placeholder.com/400x300',
    description: '张三和李四在对话张三和李四在对话张三和李四在对话张三和李四在对话张三和李四在对话张三和李四在对话',
    isLoaded: false
  },
  {
    id: 2,
    shotNumber: 2,
    imageUrl: 'https://via.placeholder.com/400x300',
    description: '张三和李四在对话',
    isLoaded: false
  },
  {
    id: 3,
    shotNumber: 3,
    imageUrl: 'https://via.placeholder.com/400x300',
    description: '张三和李四在对话',
    isLoaded: false
  },
  {
    id: 4,
    shotNumber: 4,
    imageUrl: 'https://via.placeholder.com/400x300',
    description: '张三和李四在对话',
    isLoaded: false
  },
  {
    id: 5,
    shotNumber: 5,
    imageUrl: 'https://via.placeholder.com/400x300',
    description: '张三和李四在对话',
    isLoaded: false
  },
  {
    id: 6,
    shotNumber: 6,
    imageUrl: 'https://via.placeholder.com/400x300',
    description: '张三和李四在对话',
    isLoaded: false
  },
  {
    id: 7,
    shotNumber: 7,
    imageUrl: 'https://via.placeholder.com/400x300',
    description: '张三和李四在对话',
    isLoaded: false
  },
  {
    id: 8,
    shotNumber: 8,
    imageUrl: 'https://via.placeholder.com/400x300',
    description: '张三和李四在对话',
    isLoaded: false
  }
])

// 图片懒加载处理
const handleImageLoad = (id) => {
  const storyboard = storyboards.value.find(s => s.id === id)
  if (storyboard) {
    storyboard.isLoaded = true
  }
}

// 编辑故事板
const editStoryboard = (id) => {
  // TODO: 跳转到故事板编辑页面
  console.log('编辑故事板:', id)
}
</script>

<template>
  <div class="fixed inset-0 w-full h-full overflow-auto bg-gray-900">
    <!-- 头部导航 -->
    <AppHeader />

    <!-- 主内容区 -->
    <main class="container mx-auto px-2 py-4">
      <div class="max-w-[1400px] mx-auto space-y-4">
        <!-- 页面标题 -->
        <div class="flex items-center mb-4">
          <h1 class="text-2xl font-bold text-white">故事板</h1>
        </div>

        <!-- 故事板列表 -->
        <div class="storyboard-container">
          <div
            v-for="storyboard in storyboards"
            :key="storyboard.id"
            class="storyboard-card group"
          >
            <!-- 镜号 -->
            <div class="story-number">镜号{{ storyboard.shotNumber }}</div>

            <!-- 图片区域 -->
            <div class="image-wrapper" :style="aspectRatioStyle">
              <div class="image-container">
                <img
                  :src="storyboard.imageUrl"
                  :alt="'故事板' + storyboard.shotNumber"
                  @load="handleImageLoad(storyboard.id)"
                  class="w-full h-full object-cover"
                  loading="lazy"
                >
                <!-- 加载状态 -->
                <div
                  v-if="!storyboard.isLoaded"
                  class="loading-overlay"
                >
                  <el-icon class="animate-spin text-2xl"><Loading /></el-icon>
                </div>
              </div>
            </div>

            <!-- 描述文字 -->
            <div class="description">
              {{ storyboard.description }}
            </div>

            <!-- 编辑按钮 -->
            <button
              class="edit-button"
              @click="editStoryboard(storyboard.id)"
            >
              编辑
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- 底部 -->
    <AppFooter class="mt-2" />
  </div>
</template>

<style scoped>
.container {
  min-height: calc(100vh - 64px - 48px);
  padding-bottom: 0;
}

/* 故事板列表样式 */
.storyboard-container {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto;
  max-height: calc(100vh - 160px);
  padding-bottom: 1rem;
}

.storyboard-card {
  @apply bg-white rounded-xl overflow-hidden shadow-lg relative;
}

.image-wrapper {
  @apply relative w-full;
  /* 宽高比通过 aspectRatioStyle 动态设置 */
}

.image-container {
  @apply absolute inset-0;
}

.story-number {
  @apply absolute top-2 left-2 z-10 px-2 py-1 bg-yellow-400 rounded text-sm font-medium;
}

.loading-overlay {
  @apply absolute inset-0 flex items-center justify-center bg-gray-100/80;
}

.description {
  @apply absolute bottom-0 left-0 right-0 p-2 bg-white/90 text-sm text-gray-700 
         border-t border-gray-100;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 48px; /* 确保有足够空间显示两行文字 */
  transition: all 0.3s ease;
}

.storyboard-card:hover .description {
  @apply bg-white;
  -webkit-line-clamp: unset;
  max-height: 200px; /* 设置最大高度，避免内容过长 */
  overflow-y: auto;
  z-index: 20; /* 确保显示在其他元素之上 */
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* 描述文字滚动条样式 */
.description::-webkit-scrollbar {
  @apply w-1;
}

.description::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.description::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
}

.description::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}

.edit-button {
  @apply absolute top-2 right-2 z-10 px-3 py-1 bg-blue-500 text-white text-sm rounded-md
         opacity-0 transition-opacity duration-200 hover:bg-blue-600;
}

.storyboard-card:hover .edit-button {
  @apply opacity-100;
}

/* 滚动条样式 */
.storyboard-container::-webkit-scrollbar {
  @apply w-2;
}

.storyboard-container::-webkit-scrollbar-track {
  @apply bg-gray-200 rounded-full;
}

.storyboard-container::-webkit-scrollbar-thumb {
  @apply bg-gray-400 rounded-full hover:bg-gray-500;
}
</style> 