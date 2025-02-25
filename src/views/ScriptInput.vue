<script setup>
import { ref, computed } from 'vue'
import { Upload, Document } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const router = useRouter()

// 模式切换
const isFileMode = ref(false)
const scriptContent = ref('')
const isDragging = ref(false)
const isParsing = ref(false)

// 文件上传配置
const acceptTypes = [
  '.txt',    // 文本文件
  '.doc',    // Word 文档
  '.docx',   // Word 文档 (新格式)
  '.xls',    // Excel 文件
  '.xlsx',   // Excel 文件 (新格式)
  '.csv'     // CSV 文件
]
const maxFileSize = 10 * 1024 * 1024 // 10MB

// 文本输入配置
const maxLength = 1000
const textCount = computed(() => scriptContent.value.length)
const isOverLimit = computed(() => textCount.value > maxLength)

// 处理模式切换
function toggleMode() {
  isFileMode.value = !isFileMode.value
  if (isFileMode.value) {
    scriptContent.value = ''
  }
}

// 处理文件上传
function handleFileUpload(file) {
  if (!validateFileType(file)) {
    return false
  }
  if (file.size > maxFileSize) {
    ElMessage.error('文件大小不能超过10MB')
    return false
  }

  // 这里可以添加文件处理逻辑
  console.log('文件上传成功:', file.name)
  return true
}

// 验证文件类型
function validateFileType(file) {
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
  if (!acceptTypes.includes(ext)) {
    ElMessage.error(`不支持的文件格式，请上传以下格式文件：${acceptTypes.join('、')}`)
    return false
  }
  return true
}

// 处理解析
async function handleParse() {
  if (!scriptContent.value.trim()) {
    ElMessage.warning('请输入剧本内容')
    return
  }
  
  isParsing.value = true
  try {
    // 模拟解析过程
    await new Promise(resolve => setTimeout(resolve, 1500))
    ElMessage.success('解析完成')
    // 解析完成后跳转到项目设定页面
    router.push('/project-settings')
  } catch (error) {
    ElMessage.error('解析失败，请重试')
  } finally {
    isParsing.value = false
  }
}
</script>

<template>
  <!-- 全屏深色背景 -->
  <div class="fixed inset-0 bg-gray-900"></div>
  
  <!-- 页面内容 -->
  <div class="fixed inset-0 w-full h-full overflow-hidden"> 
    <!-- 头部导航 -->
    <AppHeader class="w-full" />

    <!-- 主内容区 -->
    <main class="flex-1 w-full flex justify-center items-start pt-2 pb-12">
      <!-- 白色内容容器 -->
      <div class="script-container bg-white rounded-2xl w-[800px] mx-4 h-[80vh] mt-2 mb-12">
        <!-- 切换按钮 -->
        <el-button 
          class="w-full h-12 text-base bg-blue-500 hover:bg-blue-600"
          type="primary"
          @click="toggleMode"
        >
          <el-icon class="mr-2"><Upload /></el-icon>
          {{ isFileMode ? '切换到文本输入' : '切换到文件上传' }}
        </el-button>

        <!-- 输入区域 -->
        <div class="input-area mt-6">
          <!-- 文本输入模式 -->
          <div v-show="!isFileMode">
            <el-input
              v-model="scriptContent"
              type="textarea"
              :maxlength="maxLength"
              :autosize="{ minRows: 16, maxRows: 20 }"
              placeholder="请输入剧本内容..."
              resize="none"
              class="script-textarea"
            />
            <div class="word-count">
              {{ textCount }}/{{ maxLength }}
            </div>
          </div>

          <!-- 文件上传模式 -->
          <el-upload
            v-show="isFileMode"
            class="upload-area"
            drag
            :accept="acceptTypes.join(',')"
            :before-upload="handleFileUpload"
            :auto-upload="false"
          >
            <el-icon class="text-6xl mb-4"><Document /></el-icon>
            <div class="upload-text">
              <p class="text-lg mb-2">拖拽文件到此处或点击上传</p>
              <p class="text-gray-400 text-sm">
                支持格式：TXT、Word、Excel、CSV
              </p>
            </div>
          </el-upload>
        </div>

        <!-- 创作按钮 -->
        <el-button 
          class="w-full h-12 text-base mt-2 bg-green-500 hover:bg-green-600"
          type="success"
          :loading="isParsing"
          :disabled="isOverLimit || (!isFileMode && !scriptContent.trim())"
          @click="handleParse"
        >
          {{ isParsing ? '创作中...' : '开始创作' }}
        </el-button>
      </div>
    </main>

    <!-- 底部 -->
    <AppFooter class="w-full" />
  </div>
</template>

<style scoped>
.script-container {
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.input-area {
  border: 1px dashed #dcdfe6;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  min-height: 400px;
  background: #ffffff;
}

.script-textarea :deep(.el-textarea__inner) {
  border: none;
  padding: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #2c3e50;
  background: transparent;
  font-family: system-ui, -apple-system, sans-serif;
}

.script-textarea :deep(.el-textarea__inner:focus) {
  box-shadow: none;
}

.word-count {
  position: absolute;
  right: 16px;
  bottom: 12px;
  font-size: 14px;
  color: #909399;
}

:deep(.el-button) {
  font-weight: 500;
  letter-spacing: 0.025em;
}

:deep(.el-button:not(:disabled):hover) {
  transform: translateY(-1px);
  transition: all 0.2s;
}

.upload-area {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

:deep(.el-upload-dragger) {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #dcdfe6;
  transition: all 0.3s;
}

:deep(.el-upload-dragger:hover) {
  border-color: var(--el-color-primary);
}
</style> 