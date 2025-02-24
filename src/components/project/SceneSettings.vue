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
  <div class="scene-settings bg-white rounded-xl p-6 shadow-lg">
    <h2 class="text-xl font-semibold mb-6">场景设定</h2>
    
    <el-form :model="sceneData" label-position="top">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- 场景描述 -->
        <div class="col-span-1 md:col-span-2">
          <el-form-item label="场景描述">
            <el-input
              v-model="sceneData.description"
              type="textarea"
              :maxlength="maxDescLength"
              :rows="3"
              placeholder="请输入场景描述，例如：INT. 实验室 - 深夜"
              show-word-limit
            />
          </el-form-item>
        </div>

        <!-- 时间和天气设定 -->
        <div class="col-span-1">
          <el-form-item label="时间">
            <el-time-picker
              v-model="sceneData.time"
              format="HH:mm"
              placeholder="选择时间"
              class="w-full"
            />
          </el-form-item>

          <el-form-item label="天气" class="mt-4">
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
  </div>
</template>

<style scoped>
.scene-settings {
  transition: all 0.3s ease;
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

:deep(.el-form-item__label) {
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 0.5rem;
}

:deep(.el-form--label-top .el-form-item__label) {
  padding: 0;
}
</style> 