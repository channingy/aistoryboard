<script setup>
import { ref, computed } from 'vue'
import { Upload, Edit } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'

// 文本输入相关
const scriptText = ref('')
const maxLength = 5000

const textCount = computed(() => scriptText.value.length)
const isOverLimit = computed(() => textCount.value > maxLength)

// 文件上传相关
const parsing = ref(false)
const parseProgress = ref(0)
const fileList = ref([])

// 处理超出文件数限制
function handleExceed() {
  ElNotification({
    title: '上传失败',
    message: '只能上传一个文件',
    type: 'warning'
  })
}

// 处理文件上传
function handleUpload(file) {
  parsing.value = true
  parseProgress.value = 0
  
  // 模拟解析进度
  const timer = setInterval(() => {
    parseProgress.value += 10
    if (parseProgress.value >= 100) {
      clearInterval(timer)
      parsing.value = false
    }
  }, 300)
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 flex flex-col">
    <!-- 顶部提示区 -->
    <div class="w-full bg-gray-800/50 py-3 px-6 flex justify-between items-center">
      <span class="text-gray-300">Get started by uploading a script or generating one with AI</span>
      <div class="flex items-center gap-3">
        <span class="text-gray-300">Start from scratch</span>
        <el-button class="!bg-gray-800 !text-white border border-gray-700">
          BLANK PROJECT
        </el-button>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="flex-1 p-6 flex justify-center">
      <div class="w-[80%] flex gap-6">
        <!-- 左侧文本输入区 -->
        <div class="flex-1 bg-gray-800/50 rounded-lg p-6">
          <div class="flex items-center gap-2 mb-6">
            <el-icon class="text-xl text-gray-300"><Upload /></el-icon>
            <h2 class="text-xl text-white">Upload your script</h2>
          </div>
          <p class="text-gray-400 mb-6">
            Turn your Final Draft, Word, CSV, PDF or TXT file into a storyboard or video.
          </p>
          <div class="space-y-4">
            <el-button 
              type="primary" 
              class="w-full !bg-white !text-gray-900 hover:!bg-gray-100"
            >
              UPLOAD SCRIPT
            </el-button>
            <div class="relative">
              <el-input
                v-model="scriptText"
                type="textarea"
                :maxlength="maxLength"
                :autosize="{ minRows: 12, maxRows: 20 }"
                placeholder="Paste your script here..."
                resize="none"
                class="script-textarea"
              />
              <div 
                class="word-count absolute right-3 bottom-2"
                :class="{ 'text-red-500': isOverLimit }"
              >
                {{ isOverLimit ? `-${textCount - maxLength}` : `${textCount}/${maxLength}` }}
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧 AI 助手区 -->
        <div class="flex-1 bg-gray-800/50 rounded-lg p-6">
          <div class="flex items-center gap-2 mb-6">
            <el-icon class="text-xl text-gray-300"><Edit /></el-icon>
            <h2 class="text-xl text-white">AI Script Assistant</h2>
          </div>
          <p class="text-gray-400 mb-6">
            Provide an idea, and our AI Script Assistant will generate a full script for you, bringing your concepts to life.
          </p>
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            placeholder="A medieval knight fights a Dracorax to save his village from ruin"
            class="ai-prompt-input mb-4"
          />
          <el-button 
            type="primary"
            class="w-full !bg-white !text-gray-900 hover:!bg-gray-100"
          >
            GENERATE SCRIPT
          </el-button>
          <p class="text-gray-500 text-sm mt-2">
            Instantly develop your storyline into a script for storyboard and video generation.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.script-textarea :deep(.el-textarea__inner) {
  background: #1a1a1a;
  border-color: #4a4a4a;
  color: #fff;
  transition: border-color 0.3s;
  font-family: monospace;
}

.script-textarea :deep(.el-textarea__inner:focus),
.ai-prompt-input :deep(.el-textarea__inner:focus) {
  border-color: #409EFF;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.ai-prompt-input :deep(.el-textarea__inner) {
  background: #1a1a1a;
  border-color: #4a4a4a;
  color: #fff;
  transition: all 0.3s;
}

.word-count {
  font-size: 12px;
  color: #909399;
}

:deep(.el-button) {
  font-weight: 600;
  height: 42px;
}
</style> 