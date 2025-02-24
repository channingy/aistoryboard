<script setup>
import { ref, watch } from 'vue'
import { Delete, Upload } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'delete'])

// 角色数据
const characterData = ref({
  id: props.modelValue.id,
  name: props.modelValue.name || '',
  description: props.modelValue.description || '',
  avatar: props.modelValue.avatar || ''
})

// 监听数据变化并触发更新
watch(characterData, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })

// 处理头像上传
const handleAvatarUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('只能上传图片文件！')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB！')
    return false
  }

  // 创建本地预览URL
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = (e) => {
    characterData.value.avatar = e.target.result
  }

  return false // 阻止自动上传
}

// 删除角色
const handleDelete = () => {
  emit('delete', characterData.value.id)
}
</script>

<template>
  <div class="character-card bg-white rounded-xl p-6 shadow-lg relative">
    <!-- 删除按钮 -->
    <el-button
      class="delete-btn"
      type="danger"
      :icon="Delete"
      circle
      @click="handleDelete"
    />

    <el-form :model="characterData" label-position="top">
      <div class="flex flex-col md:flex-row gap-6">
        <!-- 头像上传区域 -->
        <el-form-item class="mb-0">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :before-upload="handleAvatarUpload"
          >
            <div
              class="avatar-container"
              :class="{ 'has-avatar': characterData.avatar }"
            >
              <img
                v-if="characterData.avatar"
                :src="characterData.avatar"
                class="avatar-image"
                alt="角色头像"
              >
              <el-icon v-else class="avatar-icon"><Upload /></el-icon>
              <div v-if="!characterData.avatar" class="avatar-text">
                点击上传头像
              </div>
            </div>
          </el-upload>
        </el-form-item>

        <!-- 角色信息 -->
        <div class="flex-1">
          <el-form-item label="角色姓名" class="mb-4">
            <el-input
              v-model="characterData.name"
              placeholder="请输入角色姓名"
            />
          </el-form-item>
          
          <el-form-item label="特征描述" class="mb-0">
            <el-input
              v-model="characterData.description"
              type="textarea"
              :rows="3"
              placeholder="请输入角色特征描述"
            />
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.character-card {
  transition: all 0.3s ease;
}

.character-card:hover {
  transform: translateY(-2px);
}

.delete-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.character-card:hover .delete-btn {
  opacity: 1;
}

.avatar-container {
  width: 80px;
  height: 80px;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.avatar-container:hover {
  border-color: var(--el-color-primary);
}

.avatar-container.has-avatar {
  border-style: solid;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.avatar-icon {
  font-size: 24px;
  color: #9ca3af;
  margin-bottom: 4px;
}

.avatar-text {
  font-size: 12px;
  color: #9ca3af;
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

:deep(.el-form-item) {
  margin-bottom: 0;
}
</style> 