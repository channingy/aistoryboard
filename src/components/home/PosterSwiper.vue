<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

const posters = [
  { 
    id: 1, 
    url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80'
  },
  { 
    id: 2, 
    url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=2840&q=80'
  },
  { 
    id: 3, 
    url: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-1.2.1&auto=format&fit=crop&w=2831&q=80'
  }
]

const swiperOptions = {
  modules: [Autoplay, EffectFade],
  autoplay: { 
    delay: 5000,
    disableOnInteraction: false
  },
  loop: true,
  effect: 'fade',
  speed: 1500,
  allowTouchMove: false
}
</script>

<template>
  <div class="fixed inset-0 w-full h-full">
    <Swiper v-bind="swiperOptions" class="!fixed inset-0 w-full h-full">
      <SwiperSlide v-for="poster in posters" :key="poster.id" class="!w-full !h-full">
        <div class="absolute inset-0">
          <img 
            :src="poster.url" 
            :alt="`Background ${poster.id}`"
            class="w-full h-full object-cover"
            loading="lazy"
          >
          <!-- 渐变遮罩 -->
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-gray-900/50"></div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
:deep(.swiper) {
  width: 100vw;
  height: 100vh;
}

:deep(.swiper-slide) {
  opacity: 0 !important;
  transition: opacity 1.5s ease;
  width: 100vw !important;
  height: 100vh !important;
}

:deep(.swiper-slide-active) {
  opacity: 1 !important;
}

:deep(.swiper-wrapper) {
  width: 100%;
  height: 100%;
}
</style> 