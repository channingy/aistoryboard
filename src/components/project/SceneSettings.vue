<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      description: '',
      time: '',
      weather: ''
    })
  }
})

const emit = defineEmits(['update:modelValue'])

// 场景设定数据
const sceneData = ref({
  description: props.modelValue.description,
  time: props.modelValue.time,
  weather: props.modelValue.weather
})

// 时间选项
const timeOptions = [
  { label: '清晨', value: '清晨' },
  { label: '早晨', value: '早晨' },
  { label: '上午', value: '上午' },
  { label: '中午', value: '中午' },
  { label: '下午', value: '下午' },
  { label: '傍晚', value: '傍晚' },
  { label: '晚上', value: '晚上' },
  { label: '深夜', value: '深夜' }
]

// 天气选项
const weatherOptions = [
  { label: '晴', value: 'sunny' },
  { label: '阴', value: 'cloudy' },
  { label: '雨', value: 'rainy' },
  { label: '雪', value: 'snowy' },
  { label: '雾', value: 'foggy' }
]

// 监听数据变化并触发更新
watch(sceneData, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })

// 字数限制
const maxDescLength = 200
</script>

<template>
  <el-form :model="sceneData" label-position="top" class="scene-form">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <!-- 场景描述 -->
      <div class="col-span-1 md:col-span-2">
        <el-form-item label="场景描述" class="mb-2">
          <el-input
            v-model="sceneData.description"
            type="textarea"
            :maxlength="maxDescLength"
            :rows="2"
            placeholder="请输入场景描述，例如：INT. 实验室 - 深夜"
            show-word-limit
            resize="none"
          />
        </el-form-item>
      </div>

      <!-- 时间和天气设定 -->
      <div class="col-span-1 space-y-2">
        <el-form-item label="时间" class="mb-2">
          <el-select
            v-model="sceneData.time"
            placeholder="选择时间"
            class="w-full"
          >
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="天气" class="mb-0">
          <el-select
            v-model="sceneData.weather"
            placeholder="选择天气"
            class="w-full"
          >
            <el-option
              v-for="item in weatherOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<style scoped>
.scene-form {
  padding: 0.5rem 0;
}

:deep(.el-form-item__label) {
  padding: 0 0 4px 0;
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.2;
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

:deep(.el-textarea__inner) {
  resize: none;
  min-height: 60px !important;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

:deep(.el-form--label-top) {
  padding-top: 0;
}
</style> 