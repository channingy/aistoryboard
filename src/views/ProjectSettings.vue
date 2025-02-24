<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import SceneSettings from '@/components/project/SceneSettings.vue'
import CharacterCard from '@/components/project/CharacterCard.vue'

// 场景设定数据
const sceneSettings = ref({
  description: '',
  time: '',
  weather: ''
})

// 角色列表数据
const characters = ref([
  {
    id: 1,
    name: '',
    description: '',
    avatar: ''
  }
])

// 用于生成新角色ID
let nextCharacterId = 2

// 添加新角色
const addCharacter = () => {
  characters.value.push({
    id: nextCharacterId++,
    name: '',
    description: '',
    avatar: ''
  })
}

// 删除角色
const deleteCharacter = (id) => {
  const index = characters.value.findIndex(char => char.id === id)
  if (index !== -1) {
    characters.value.splice(index, 1)
    ElMessage.success('角色已删除')
  }
}

// 更新角色信息
const updateCharacter = (index, newValue) => {
  characters.value[index] = { ...newValue }
}

// 保存所有设定
const saveSettings = () => {
  // TODO: 实现保存逻辑
  console.log('保存设定：', {
    scene: sceneSettings.value,
    characters: characters.value
  })
  ElMessage.success('设定已保存')
}
</script>

<template>
    <div class="fixed inset-0 w-full h-full overflow-hidden"> 
    <!-- 头部导航 -->
    <AppHeader />

    <!-- 主内容区 -->
    <main class="container mx-auto px-2 pt-2 pb-8">
      <div class="max-w-5xl mx-auto">
        <!-- 页面标题 -->
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-bold text-white">项目设定</h1>
          <el-button
            type="primary"
            @click="saveSettings"
          >
            保存设定
          </el-button>
        </div>

        <!-- 场景设定 -->
        <SceneSettings
          v-model="sceneSettings"
          class="mb-8"
        />

        <!-- 角色设定 -->
        <div class="bg-white rounded-xl p-6 shadow-lg">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold">角色设定</h2>
            <el-button
              type="primary"
              :icon="Plus"
              @click="addCharacter"
            >
              新增角色
            </el-button>
          </div>

          <!-- 角色卡片网格 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CharacterCard
              v-for="(character, index) in characters"
              :key="character.id"
              :model-value="character"
              @update:model-value="updateCharacter(index, $event)"
              @delete="deleteCharacter"
            />
          </div>
        </div>
      </div>
    </main>

    <!-- 底部 -->
    <AppFooter />
  </div>
</template>

<style scoped>
.container {
  min-height: calc(100vh - 64px - 80px); /* 减去header和footer的高度 */
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
</style> 