<script setup>
import { ref, watch } from 'vue'
import { Delete, Avatar } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { defaultAvatars, defaultAvatarId } from '@/assets/avatars'

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
  avatarId: props.modelValue.avatarId || defaultAvatarId
})

// 监听数据变化并触发更新
watch(characterData, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })

// 显示头像选择对话框
const showAvatarSelector = ref(false)

// 选择头像
const selectAvatar = (avatarId) => {
  characterData.value.avatarId = avatarId
  showAvatarSelector.value = false
}

// 获取当前头像SVG
const getCurrentAvatarSvg = () => {
  const avatar = defaultAvatars.find(a => a.id === characterData.value.avatarId)
  return avatar ? avatar.svg : defaultAvatars[0].svg
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
        <!-- 头像选择区域 -->
        <el-form-item class="mb-0">
          <div 
            class="avatar-container has-avatar"
            @click="showAvatarSelector = true"
          >
            <div class="avatar-image" v-html="getCurrentAvatarSvg()"></div>
            <div class="avatar-select-btn">
              <el-icon><Avatar /></el-icon>
            </div>
          </div>
          
          <!-- 头像选择对话框 -->
          <el-dialog
            v-model="showAvatarSelector"
            title="选择角色头像"
            width="360px"
            align-center
          >
            <div class="avatar-selector-grid">
              <div 
                v-for="avatar in defaultAvatars" 
                :key="avatar.id"
                class="avatar-option"
                :class="{ 'is-selected': characterData.avatarId === avatar.id }"
                @click="selectAvatar(avatar.id)"
              >
                <div class="avatar-option-image" v-html="avatar.svg"></div>
                <div class="avatar-option-name">{{ avatar.name }}</div>
              </div>
            </div>
          </el-dialog>
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
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.avatar-container:hover {
  border-color: var(--el-color-primary);
}

.avatar-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-select-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 2px 0;
  font-size: 12px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.avatar-container:hover .avatar-select-btn {
  opacity: 1;
}

.avatar-selector-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.avatar-option {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s;
}

.avatar-option:hover {
  border-color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
}

.avatar-option.is-selected {
  border-color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
}

.avatar-option-image {
  width: 80px;
  height: 80px;
  margin-bottom: 8px;
}

.avatar-option-name {
  font-size: 14px;
  color: #333;
  text-align: center;
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