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

// 开始解析
const startParsing = () => {
  ElMessage.success('开始解析...')
  // TODO: 实现解析逻辑
}
</script>

<template>
  <div class="fixed inset-0 w-full h-full overflow-auto bg-gray-900"> 
    <!-- 头部导航 -->
    <AppHeader />

    <!-- 主内容区 -->
    <main class="container mx-auto px-2">
      <div class="max-w-5xl mx-auto space-y-2">
        <!-- 页面标题 -->
        <div class="flex justify-between items-center py-1">
          <h1 class="text-xl font-bold text-white">项目设定</h1>
          <el-button
            type="primary"
            @click="saveSettings"
          >
            保存设定
          </el-button>
        </div>

        <!-- 场景设定 -->
        <div class="bg-white rounded-xl p-3 shadow-lg">
          <h2 class="text-lg font-semibold mb-2">场景设定</h2>
          <SceneSettings
            v-model="sceneSettings"
          />
        </div>

        <!-- 角色设定 -->
        <div class="character-container bg-white rounded-xl p-3 shadow-lg">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg font-semibold">角色设定</h2>
            <el-button
              type="primary"
              :icon="Plus"
              @click="addCharacter"
            >
              新增角色
            </el-button>
          </div>

          <!-- 角色卡片网格容器 -->
          <div class="characters-container">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
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

        <!-- 开始解析按钮 -->
        <div class="flex justify-center py-2">
          <el-button
            type="success"
            class="start-parsing-btn"
            size="large"
            @click="startParsing"
          >
            开始解析
          </el-button>
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
}

/* 角色卡片容器样式 */
.characters-container {
  height: calc(320px - 40px);
  overflow-y: auto;
  padding-right: 4px;
}

/* 自定义滚动条样式 */
.characters-container::-webkit-scrollbar {
  width: 4px;
}

.characters-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.characters-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

.characters-container::-webkit-scrollbar-thumb:hover {
  background: #666;
}

/* 按钮样式 */
:deep(.el-button--primary) {
  background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
  border: none;
  font-weight: 500;
}

:deep(.el-button--primary:hover) {
  background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
  transform: translateY(-1px);
}

.start-parsing-btn {
  width: 90%;
  max-width: 400px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.025em;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  border: none;
  transition: all 0.3s ease;
}

.start-parsing-btn:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

/* 调整角色卡片的内边距 */
:deep(.character-card) {
  padding: 12px;
}
</style> 