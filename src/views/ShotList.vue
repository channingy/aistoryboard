<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
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

const router = useRouter()

// 故事板设定弹窗
const showSettingsDialog = ref(false)
const storyboardSettings = ref({
  aspectRatio: '16:9', // 默认16:9横屏
  artStyle: 'sketch' // 默认草图风格
})

// 宽高比选项
const aspectRatioOptions = [
  { label: '16:9 (横屏)', value: '16:9' },
  { label: '1:1 (方形)', value: '1:1' },
  { label: '9:16 (竖屏)', value: '9:16' }
]

// 艺术风格选项
const artStyleOptions = [
  { label: '草图风格', value: 'sketch' },
  { label: '电影风格', value: 'cinematic' }
]

// 场景信息
const sceneInfo = ref({
  description: 'INT. 实验室 - 深夜',
  time: '23:30',
  weather: '晴朗',
  characters: ['张三', '李四']
})

// 分镜列表数据
const shotList = ref([
  {
    id: 1,
    content: '张三和李四在对话张三和李四在对话张三和李四在对话',
    framing: 'full',
    movement: 'fixed',
    angle: 'eye_level',
    tone: 'mid_key',
    contrast: 'plain',
    colorTemp: 'cool'
  }
])

// 编辑状态
const editingId = ref(null)

// 开始编辑
const startEdit = (id) => {
  editingId.value = id
}

// 保存编辑
const saveEdit = (id) => {
  editingId.value = null
  ElMessage.success('保存成功')
}

// 生成故事板
const generateStoryboard = () => {
  showSettingsDialog.value = true
}

// 确认生成
const confirmGenerate = () => {
  showSettingsDialog.value = false
  ElMessage.success('开始生成故事板...')
  // 跳转到故事板列表页面，传递设置参数
  router.push({
    path: '/storyboard-list',
    query: {
      aspectRatio: storyboardSettings.value.aspectRatio,
      artStyle: storyboardSettings.value.artStyle
    }
  })
}
</script>

<template>
  <div class="fixed inset-0 w-full h-full overflow-auto bg-gray-900">
    <!-- 头部导航 -->
    <AppHeader />

    <!-- 主内容区 -->
    <main class="container mx-auto px-2 py-6">
      <div class="max-w-[1400px] mx-auto space-y-4">
        <!-- 页面标题 -->
        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-white">分镜列表</h1>
        </div>

        <!-- 容器1：信息区 -->
        <div class="bg-white rounded-xl p-4 shadow-lg">
          <div class="grid grid-cols-12 gap-4 items-start">
            <!-- 场景信息 -->
            <div class="col-span-7 space-y-2">
              <div class="text-sm text-gray-600 pl-1">场景：{{ sceneInfo.description }}</div>
              <div class="text-sm text-gray-600 pl-1">时间：{{ sceneInfo.time }}</div>
              <div class="text-sm text-gray-600 pl-1">天气：{{ sceneInfo.weather }}</div>
            </div>

            <!-- 主要角色 -->
            <div class="col-span-3">
              <div class="text-sm text-gray-600">
                主要角色：{{ sceneInfo.characters.join('，') }}
              </div>
            </div>

            <!-- 生成故事板按钮 -->
            <div class="col-span-2 text-right">
              <el-button
                type="primary"
                @click="generateStoryboard"
              >
                生成故事板
              </el-button>
            </div>
          </div>
        </div>

        <!-- 容器2：分镜列表 -->
        <div class="bg-white rounded-xl p-4 shadow-lg">
          <el-table :data="shotList" style="width: 100%">
            <el-table-column label="内容" min-width="300">
              <template #default="{ row }">
                <el-input
                  v-if="editingId === row.id"
                  v-model="row.content"
                  type="textarea"
                  :rows="2"
                />
                <span v-else>{{ row.content }}</span>
              </template>
            </el-table-column>

            <el-table-column label="景别" width="140">
              <template #default="{ row }">
                <el-select
                  v-if="editingId === row.id"
                  v-model="row.framing"
                >
                  <el-option
                    v-for="option in framingOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
                <span v-else>
                  {{ framingOptions.find(opt => opt.value === row.framing)?.label }}
                </span>
              </template>
            </el-table-column>

            <el-table-column label="镜头运动" width="140">
              <template #default="{ row }">
                <el-select
                  v-if="editingId === row.id"
                  v-model="row.movement"
                >
                  <el-option
                    v-for="option in cameraMovementOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
                <span v-else>
                  {{ cameraMovementOptions.find(opt => opt.value === row.movement)?.label }}
                </span>
              </template>
            </el-table-column>

            <el-table-column label="拍摄角度" width="140">
              <template #default="{ row }">
                <el-select
                  v-if="editingId === row.id"
                  v-model="row.angle"
                >
                  <el-option
                    v-for="option in cameraAngleOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
                <span v-else>
                  {{ cameraAngleOptions.find(opt => opt.value === row.angle)?.label }}
                </span>
              </template>
            </el-table-column>

            <el-table-column label="影调" width="120">
              <template #default="{ row }">
                <el-select
                  v-if="editingId === row.id"
                  v-model="row.tone"
                >
                  <el-option
                    v-for="option in toneOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
                <span v-else>
                  {{ toneOptions.find(opt => opt.value === row.tone)?.label }}
                </span>
              </template>
            </el-table-column>

            <el-table-column label="对比度" width="120">
              <template #default="{ row }">
                <el-select
                  v-if="editingId === row.id"
                  v-model="row.contrast"
                >
                  <el-option
                    v-for="option in contrastOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
                <span v-else>
                  {{ contrastOptions.find(opt => opt.value === row.contrast)?.label }}
                </span>
              </template>
            </el-table-column>

            <el-table-column label="色温" width="120">
              <template #default="{ row }">
                <el-select
                  v-if="editingId === row.id"
                  v-model="row.colorTemp"
                >
                  <el-option
                    v-for="option in colorTempOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
                <span v-else>
                  {{ colorTempOptions.find(opt => opt.value === row.colorTemp)?.label }}
                </span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="120" fixed="right">
              <template #default="{ row }">
                <el-button
                  v-if="editingId === row.id"
                  type="success"
                  size="small"
                  @click="saveEdit(row.id)"
                >
                  保存
                </el-button>
                <el-button
                  v-else
                  type="primary"
                  size="small"
                  @click="startEdit(row.id)"
                >
                  编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </main>

    <!-- 底部 -->
    <AppFooter class="mt-4" />

    <!-- 故事板设定弹窗 -->
    <el-dialog
      v-model="showSettingsDialog"
      title="故事板设定"
      width="500px"
      :close-on-click-modal="false"
      class="storyboard-settings-dialog"
    >
      <div class="space-y-6">
        <!-- 宽高比选项 -->
        <div class="space-y-2">
          <h3 class="text-base font-medium text-gray-700">宽高比</h3>
          <div class="grid grid-cols-3 gap-4">
            <div
              v-for="option in aspectRatioOptions"
              :key="option.value"
              class="aspect-ratio-option"
              :class="{ 'active': storyboardSettings.aspectRatio === option.value }"
              @click="storyboardSettings.aspectRatio = option.value"
            >
              {{ option.label }}
            </div>
          </div>
        </div>

        <!-- 艺术风格选项 -->
        <div class="space-y-2">
          <h3 class="text-base font-medium text-gray-700">艺术风格</h3>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="option in artStyleOptions"
              :key="option.value"
              class="art-style-option"
              :class="{ 'active': storyboardSettings.artStyle === option.value }"
              @click="storyboardSettings.artStyle = option.value"
            >
              {{ option.label }}
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <template #footer>
        <div class="flex justify-end">
          <el-button
            type="primary"
            size="large"
            class="w-32 generate-btn"
            @click="confirmGenerate"
          >
            生成
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.container {
  min-height: calc(100vh - 64px - 48px);
}

:deep(.el-table) {
  --el-table-border-color: #e5e7eb;
  --el-table-header-bg-color: #f3f4f6;
  --el-table-row-hover-bg-color: #f9fafb;
}

:deep(.el-table__header) {
  font-weight: 600;
  color: #374151;
}

:deep(.el-button--primary) {
  background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
  border: none;
  font-weight: 500;
}

:deep(.el-button--primary:hover) {
  background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
  transform: translateY(-1px);
}

:deep(.el-select) {
  width: 100%;
}

:deep(.el-input__wrapper),
:deep(.el-textarea__inner) {
  box-shadow: none !important;
  border: 1px solid #e5e7eb;
}

:deep(.el-input__wrapper:hover),
:deep(.el-textarea__inner:hover) {
  border-color: #d1d5db;
}

/* 故事板设定弹窗样式 */
:deep(.storyboard-settings-dialog) {
  border-radius: 12px;
}

:deep(.storyboard-settings-dialog .el-dialog__header) {
  padding: 20px 24px;
  margin: 0;
  border-bottom: 1px solid #e5e7eb;
}

:deep(.storyboard-settings-dialog .el-dialog__title) {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

:deep(.storyboard-settings-dialog .el-dialog__body) {
  padding: 24px;
}

:deep(.storyboard-settings-dialog .el-dialog__footer) {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
}

.aspect-ratio-option,
.art-style-option {
  @apply flex items-center justify-center px-4 py-3 rounded-lg border-2 border-gray-200 
         text-gray-600 cursor-pointer transition-all duration-200 hover:border-blue-500 hover:text-blue-600;
}

.aspect-ratio-option.active,
.art-style-option.active {
  @apply border-blue-500 bg-blue-50 text-blue-600;
}

.generate-btn {
  @apply bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
         text-white font-medium rounded-lg transition-all duration-200
         hover:shadow-md hover:-translate-y-0.5;
}
</style> 