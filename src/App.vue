<script setup>
// 移除 HelloWorld 导入
</script>

<template>
  <router-view class="min-h-screen w-full overflow-hidden" />
</template>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  @apply bg-gray-900;
}
</style>
