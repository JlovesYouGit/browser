<template>
  <div class="star-background">
    <div
      v-for="star in stars"
      :key="star.id"
      class="star"
      :style="getStarStyle(star)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Star {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

const stars = ref<Star[]>([])

onMounted(() => {
  const generatedStars: Star[] = []
  for (let i = 0; i < 150; i++) {
    generatedStars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    })
  }
  stars.value = generatedStars
})

const getStarStyle = (star: Star) => ({
  left: `${star.x}%`,
  top: `${star.y}%`,
  width: `${star.size}px`,
  height: `${star.size}px`,
  animationDuration: `${star.duration}s`,
  animationDelay: `${star.delay}s`,
})
</script>

<style lang="less" scoped>
.star-background {
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: linear-gradient(to bottom, rgb(24 24 27), rgb(39 39 42), rgb(24 24 27));
  z-index: 0;
  
  .star {
    position: absolute;
    border-radius: 9999px;
    background-color: white;
    animation: twinkle infinite ease-in-out;
    
    @keyframes twinkle {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      25% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(0.8);
      }
      75% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(0);
      }
    }
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .star {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    .star {
      animation: none;
      opacity: 0.5;
    }
  }
}
</style>
