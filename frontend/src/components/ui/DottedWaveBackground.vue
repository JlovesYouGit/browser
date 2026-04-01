<template>
  <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Define dot pattern with varying sizes for depth -->
      <pattern id="dotPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="15" cy="15" r="1.5" fill="#2a2a2a" opacity="0.6" />
      </pattern>
    </defs>

    <!-- Multiple wave layers with dots - creating retro cube/isometric depth effect -->
    <g>
      <!-- Back layer - smallest, lightest -->
      <g class="animate-wave-slow">
        <g v-for="(wave, index) in backWaves" :key="`back-${index}`">
          <circle
            v-for="dot in wave.dots"
            :key="dot.id"
            :cx="dot.x"
            :cy="dot.y"
            r="1.2"
            fill="#242424"
            :opacity="dot.opacity"
          />
        </g>
      </g>

      <!-- Middle layer - medium size, medium brightness -->
      <g class="animate-wave-medium">
        <g v-for="(wave, index) in middleWaves" :key="`mid-${index}`">
          <circle
            v-for="dot in wave.dots"
            :key="dot.id"
            :cx="dot.x"
            :cy="dot.y"
            r="1.8"
            fill="#2d2d2d"
            :opacity="dot.opacity"
          />
        </g>
      </g>

      <!-- Front layer - largest, brightest -->
      <g class="animate-wave-fast">
        <g v-for="(wave, index) in frontWaves" :key="`front-${index}`">
          <circle
            v-for="dot in wave.dots"
            :key="dot.id"
            :cx="dot.x"
            :cy="dot.y"
            r="2.2"
            fill="#383838"
            :opacity="dot.opacity"
          />
        </g>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Wave configuration
interface Dot {
  id: number
  x: number
  y: number
  opacity: number
}

interface Wave {
  dots: Dot[]
}

// Animation state
const animationFrame = ref(0)
const animationId = ref<number | null>(null)

// Generate wave dots with animation
const generateWaveDots = (
  waveCount: number,
  startY: number,
  amplitude: number,
  frequency: number,
  dotCount: number,
  baseOpacity: number,
  phaseOffset: number
): Wave[] => {
  const waves: Wave[] = []
  
  for (let i = 0; i < waveCount; i++) {
    const dots: Dot[] = []
    const y = startY + i * 80
    const phase = i * phaseOffset
    const currentAmplitude = amplitude + i * 15
    
    for (let j = 0; j < dotCount; j++) {
      const x = j * 30
      const yOffset = Math.sin(x * frequency + phase + animationFrame.value * 0.01) * currentAmplitude
      const dotY = y + yOffset
      
      dots.push({
        id: j,
        x,
        y: dotY,
        opacity: baseOpacity - (i * 0.05)
      })
    }
    
    waves.push({ dots })
  }
  
  return waves
}

// Computed wave layers
const backWaves = computed(() => 
  generateWaveDots(8, 100, 60, 0.008, 50, 0.3, 0.3)
)

const middleWaves = computed(() => 
  generateWaveDots(7, 120, 70, 0.007, 50, 0.5, 0.4)
)

const frontWaves = computed(() => 
  generateWaveDots(6, 150, 80, 0.006, 50, 0.7, 0.5)
)

// Animation loop
const animate = () => {
  animationFrame.value += 1
  animationId.value = requestAnimationFrame(animate)
}

// Lifecycle hooks
onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})
</script>

<style lang="less" scoped>
// Animation keyframes
@keyframes wave-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes wave-medium {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes wave-fast {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

// Animation classes
.animate-wave-slow {
  animation: wave-slow 8s ease-in-out infinite;
}

.animate-wave-medium {
  animation: wave-medium 6s ease-in-out infinite;
}

.animate-wave-fast {
  animation: wave-fast 4s ease-in-out infinite;
}

// SVG container styling
svg {
  display: block;
  width: 100%;
  height: 100%;
  
  // Ensure smooth animations
  circle {
    transition: opacity 0.3s ease;
  }
}

// Performance optimizations
@media (prefers-reduced-motion: reduce) {
  .animate-wave-slow,
  .animate-wave-medium,
  .animate-wave-fast {
    animation: none;
  }
}

// High DPI display optimization
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  circle {
    shape-rendering: crispEdges;
  }
}
</style>
