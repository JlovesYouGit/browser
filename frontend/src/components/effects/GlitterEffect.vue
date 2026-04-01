<template>
  <div class="glitter-effect">
    <div
      v-for="sparkle in sparkles"
      :key="sparkle.id"
      class="sparkle"
      :style="getSparkleStyle(sparkle)"
    >
      <svg
        :width="sparkle.size"
        :height="sparkle.size"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
          fill="white"
          opacity="0.8"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Sparkle {
  id: number
  x: number
  y: number
  duration: number
  delay: number
  size: number
}

const sparkles = ref<Sparkle[]>([])

onMounted(() => {
  const generatedSparkles: Sparkle[] = []
  for (let i = 0; i < 50; i++) {
    generatedSparkles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      size: Math.random() * 6 + 4,
    })
  }
  sparkles.value = generatedSparkles
})

const getSparkleStyle = (sparkle: Sparkle) => ({
  left: `${sparkle.x}%`,
  top: `${sparkle.y}%`,
  animationDuration: `${sparkle.duration}s`,
  animationDelay: `${sparkle.delay}s`,
  '--repeat-delay': `${Math.random() * 2 + 1}s`
})
</script>

<style lang="less" scoped>
.glitter-effect {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  
  .sparkle {
    position: absolute;
    animation: sparkle-animation infinite;
    animation-timing-function: ease-in-out;
    
    @keyframes sparkle-animation {
      0% {
        opacity: 0;
        transform: scale(0) rotate(0deg);
      }
      50% {
        opacity: 1;
        transform: scale(1) rotate(180deg);
      }
      100% {
        opacity: 0;
        transform: scale(0) rotate(360deg);
      }
    }
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .sparkle svg {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
}
</style>
