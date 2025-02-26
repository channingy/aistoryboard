<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import {
  framingOptions,
  cameraMovementOptions,
  cameraAngleOptions,
  toneOptions,
  contrastOptions,
  colorTempOptions
} from '@/utils/shotTerms'

const route = useRoute()
const router = useRouter()

// 故事板数据
const storyboard = ref({
  id: null,
  shotNumber: 1,
  imageUrl: 'https://via.placeholder.com/800x600',
  description: '张三和李四在书房对话',
  prompt: '',
  isLoaded: false,
  params: {
    framing: 'medium',
    movement: 'fixed',
    angle: 'eye_level',
    tone: 'mid_key',
    contrast: 'plain',
    colorTemp: 'cool'
  }
})

// 场景信息
const sceneInfo = ref({
  description: '书房',
  time: '深夜',
  weather: '晴朗',
  characters: ['张三', '李四']
})

// 图片加载状态
const handleImageLoad = () => {
  storyboard.value.isLoaded = true
}

// 重绘故事板
const regenerateStoryboard = async () => {
  try {
    ElMessage.success('开始重新生成故事板...')
    // TODO: 调用API重新生成故事板
  } catch (error) {
    ElMessage.error('生成失败，请重试')
  }
}

// 保存修改
const saveChanges = () => {
  ElMessage.success('保存成功')
}

onMounted(() => {
  // TODO: 根据路由参数加载故事板数据
  const { id } = route.params
  console.log('加载故事板:', id)
})
</script>

<template>
  <div class="fixed inset-0 w-full h-full overflow-auto bg-gray-900">
    <!-- 头部导航 -->
    <AppHeader />

    <!-- 主内容区 -->
    <main class="container mx-auto px-4 py-2 mb-16">
      <div class="max-w-[1400px] mx-auto">
        <!-- 页面标题 -->
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-2xl font-bold text-white">故事板详情</h1>
          <el-button type="primary" @click="saveChanges">保存修改</el-button>
        </div>

        <!-- 主要内容区域 -->
        <div class="grid grid-cols-5 gap-6">
          <!-- 左侧：图片和描述 (3份宽度) -->
          <div class="col-span-3 space-y-4">
            <!-- 图片展示区 -->
            <div class="relative bg-gray-800 rounded-xl overflow-hidden h-[400px]">
              <img
                :src="storyboard.imageUrl"
                :alt="'故事板' + storyboard.shotNumber"
                @load="handleImageLoad"
                class="w-full h-full object-contain"
              >
              <!-- 加载状态 -->
              <div
                v-if="!storyboard.isLoaded"
                class="absolute inset-0 flex items-center justify-center bg-gray-800/80"
              >
                <el-icon class="animate-spin text-4xl text-white"><Loading /></el-icon>
              </div>
              <!-- 镜号 -->
              <div class="absolute top-4 left-4 px-3 py-1.5 bg-yellow-400 rounded-md font-medium">
                镜号{{ storyboard.shotNumber }}
              </div>
            </div>

            <!-- 描述和提示词 -->
            <div class="space-y-3">
              <!-- 画面描述 -->
              <div class="bg-gray-800 rounded-xl p-4">
                <div class="flex items-start gap-2">
                  <h3 class="text-white font-medium whitespace-nowrap flex items-center min-w-[90px]">
                    <span class="w-1 h-4 bg-yellow-400 rounded mr-2"></span>
                    画面内容
                  </h3>
                  <el-input
                    v-model="storyboard.description"
                    type="textarea"
                    :rows="2"
                    resize="none"
                    placeholder="请输入画面描述..."
                    class="flex-1"
                  />
                </div>
              </div>

              <!-- 提示词输入 -->
              <div class="bg-gray-800 rounded-xl p-4">
                <div class="flex items-start gap-2">
                  <h3 class="text-white font-medium whitespace-nowrap flex items-center min-w-[90px]">
                    <span class="w-1 h-4 bg-yellow-400 rounded mr-2"></span>
                    提示词
                  </h3>
                  <el-input
                    v-model="storyboard.prompt"
                    type="textarea"
                    :rows="2"
                    resize="none"
                    placeholder="输入提示词，用逗号分隔..."
                    class="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧：参数调整 (2份宽度) -->
          <div class="col-span-2 space-y-4">
            <!-- 场景信息 -->
            <div class="bg-gray-800 rounded-xl p-4">
              <h3 class="text-white font-medium mb-4 flex items-center">
                <span class="w-1 h-4 bg-yellow-400 rounded mr-2"></span>
                背景信息
              </h3>
              <div class="space-y-2 text-sm text-gray-300">
                <div class="grid grid-cols-[80px_1fr]">
                  <span class="whitespace-nowrap">场景描述：</span>
                  <span>{{ sceneInfo.description }}</span>
                </div>
                <div class="grid grid-cols-[80px_1fr]">
                  <span class="whitespace-nowrap">场景时间：</span>
                  <span>{{ sceneInfo.time }}</span>
                </div>
                <div class="grid grid-cols-[80px_1fr]">
                  <span class="whitespace-nowrap">场景天气：</span>
                  <span>{{ sceneInfo.weather }}</span>
                </div>
                <div class="grid grid-cols-[80px_1fr]">
                  <span class="whitespace-nowrap">主要角色：</span>
                  <span>{{ sceneInfo.characters.join('，') }}</span>
                </div>
              </div>
            </div>

            <!-- 拍摄参数 -->
            <div class="bg-gray-800 rounded-xl p-4">
              <h3 class="text-white font-medium mb-4 flex items-center">
                <span class="w-1 h-4 bg-yellow-400 rounded mr-2"></span>
                拍摄参数
              </h3>
              
              <div class="grid grid-cols-2 gap-4">
                <!-- 景别 -->
                <div class="param-item">
                  <span class="param-label">景别</span>
                  <el-select v-model="storyboard.params.framing" class="w-full">
                    <el-option
                      v-for="option in framingOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                </div>

                <!-- 镜头运动 -->
                <div class="param-item">
                  <span class="param-label">镜头运动</span>
                  <el-select v-model="storyboard.params.movement" class="w-full">
                    <el-option
                      v-for="option in cameraMovementOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                </div>

                <!-- 拍摄角度 -->
                <div class="param-item">
                  <span class="param-label">拍摄角度</span>
                  <el-select v-model="storyboard.params.angle" class="w-full">
                    <el-option
                      v-for="option in cameraAngleOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                </div>

                <!-- 影调 -->
                <div class="param-item">
                  <span class="param-label">影调</span>
                  <el-select v-model="storyboard.params.tone" class="w-full">
                    <el-option
                      v-for="option in toneOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                </div>

                <!-- 对比度 -->
                <div class="param-item">
                  <span class="param-label">对比度</span>
                  <el-select v-model="storyboard.params.contrast" class="w-full">
                    <el-option
                      v-for="option in contrastOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                </div>

                <!-- 色温 -->
                <div class="param-item">
                  <span class="param-label">色温</span>
                  <el-select v-model="storyboard.params.colorTemp" class="w-full">
                    <el-option
                      v-for="option in colorTempOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                </div>
              </div>
            </div>

            <!-- 重绘按钮 -->
            <el-button
              type="primary"
              size="large"
              class="w-full h-12 regenerate-btn"
              @click="regenerateStoryboard"
            >
              重绘插图
            </el-button>
          </div>
        </div>
      </div>
    </main>

    <!-- 底部 -->
    <AppFooter class="mt-4" />
  </div>
</template>

<style scoped>
.container {
  min-height: calc(100vh - 64px - 64px);
}

/* 参数项样式 */
.param-item {
  @apply mb-0;
}

.param-label {
  @apply block text-sm text-gray-400 mb-1;
}

/* 下拉选项样式 */
:deep(.el-select-dropdown__item) {
  @apply py-2;
}

/* 输入框样式 */
:deep(.el-textarea__inner) {
  @apply bg-gray-700 border-gray-600 text-white overflow-y-auto;
  box-shadow: none !important;
}

:deep(.el-textarea__inner::-webkit-scrollbar) {
  @apply w-1;
}

:deep(.el-textarea__inner::-webkit-scrollbar-track) {
  @apply bg-gray-600 rounded-full;
}

:deep(.el-textarea__inner::-webkit-scrollbar-thumb) {
  @apply bg-gray-400 rounded-full hover:bg-gray-300;
}

/* 下拉框样式 */
:deep(.el-input__wrapper) {
  @apply bg-gray-700 border-gray-600 text-white;
  box-shadow: none !important;
}

:deep(.el-input__wrapper:hover) {
  @apply border-yellow-400;
}

/* 重绘按钮样式 */
.regenerate-btn {
  @apply bg-gradient-to-r from-yellow-400 to-yellow-500 border-0 text-gray-900 font-medium
         hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300
         hover:shadow-lg hover:-translate-y-0.5;
}

/* 主按钮样式 */
:deep(.el-button--primary) {
  background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
  border: none;
  font-weight: 500;
}

:deep(.el-button--primary:hover) {
  background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
  transform: translateY(-1px);
}
</style> 