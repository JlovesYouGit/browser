<template>
  <motion.div
    class="fixed inset-0 flex items-center justify-center z-30"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :exit="{ opacity: 0 }"
    :transition="{ duration: 0.5 }"
  >
    <motion.div
      class="relative px-12 py-8 rounded-2xl"
      :style="glassStyle"
      :initial="{ scale: 0, rotate: -10 }"
      :animate="{
        scale: [0, 1.2, 1],
        rotate: [10, -5, 0],
      }"
      :exit="{
        scale: 0,
        opacity: 0,
        y: -50
      }"
      :transition="{
        duration: 0.8,
        exit: { duration: 0.5 }
      }"
    >
      <motion.div
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 0.5 }"
        class="text-center flex flex-col items-center"
      >
        <!-- Spinning star loader -->
        <motion.div
          :animate="{ rotate: -360 }"
          :transition="{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 0L13.09 7.91L20 9L13.09 10.09L12 18L10.91 10.09L4 9L10.91 7.91L12 0Z"
              fill="white"
              opacity="0.9"
              transform="translate(0, 3)"
            />
            <path
              d="M12 3L12.7 8.3L18 9L12.7 9.7L12 15L11.3 9.7L6 9L11.3 8.3L12 3Z"
              fill="rgba(255, 255, 255, 0.5)"
              transform="translate(0, 3)"
            />
          </svg>
        </motion.div>
        
        <motion.p
          class="text-white/60 text-sm mt-6"
          :animate="{ opacity: [0.5, 1, 0.5] }"
          :transition="{ duration: 2, repeat: Infinity }"
        >
          Loading...
        </motion.p>
      </motion.div>
    </motion.div>
  </motion.div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { motion } from '@vueuse/motion'

// Component props interface
interface BrowserInfoPopupProps {
  onComplete: () => void
}

// Define props with TypeScript support
const props = defineProps<BrowserInfoPopupProps>()

// Component emits
const emit = defineEmits<{
  complete: []
}>()

// Glass morphism style
const glassStyle = computed(() => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
}))

// Timer for auto-completion
let timer: ReturnType<typeof setTimeout> | null = null

// Lifecycle management
onMounted(() => {
  // Auto complete after animation
  timer = setTimeout(() => {
    props.onComplete()
    emit('complete')
  }, 3500)
})

onUnmounted(() => {
  // Cleanup timer
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
})

// Expose methods to parent components
defineExpose({
  complete: () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    props.onComplete()
    emit('complete')
  },
  reset: () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      props.onComplete()
      emit('complete')
    }, 3500)
  }
})
</script>

<style lang="less" scoped>
.browser-info-popup {
  // Component container
}

.motion-container {
  // Full screen overlay
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
}

.glass-popup {
  // Glass morphism effect
  position: relative;
  padding: 2rem 3rem;
  border-radius: 1rem;
  
  // Enhanced backdrop filter for better glass effect
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  // Border and shadow
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  
  // Background with transparency
  background: rgba(255, 255, 255, 0.05);
}

.content-container {
  // Content layout
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.star-loader {
  // Star animation container
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    // SVG styling
    width: 80px;
    height: 80px;
    
    // Ensure crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

.loading-text {
  // Loading text styling
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  margin-top: 1.5rem;
  
  // Smooth text rendering
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// Animation performance optimizations
.glass-popup {
  // Hardware acceleration for smooth animations
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  
  // Optimize for animations
  will-change: transform, opacity, filter;
}

.star-loader {
  // Optimize star rotation
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: transform;
}

.loading-text {
  // Optimize text pulsing
  will-change: opacity;
}

// High DPI display optimization
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .glass-popup {
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
  }
  
  .star-loader svg {
    // Crisp SVG rendering on retina displays
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  .motion-container,
  .glass-popup,
  .star-loader,
  .loading-text {
    animation: none !important;
    transition: none !important;
  }
  
  .star-loader {
    // Static star for reduced motion
    transform: none !important;
  }
  
  .loading-text {
    // Static text for reduced motion
    opacity: 1 !important;
  }
}

// Dark mode support (if needed)
@media (prefers-color-scheme: dark) {
  .glass-popup {
    // Already optimized for dark mode
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .loading-text {
    color: rgba(255, 255, 255, 0.6);
  }
}

// Focus management for accessibility
.motion-container:focus-within {
  outline: 2px solid rgba(255, 255, 255, 0.3);
  outline-offset: 2px;
}

// Print styles
@media print {
  .motion-container {
    display: none;
  }
}

// Mobile optimizations
@media (max-width: 768px) {
  .glass-popup {
    padding: 1.5rem 2rem;
    margin: 1rem;
    max-width: calc(100vw - 2rem);
  }
  
  .star-loader svg {
    width: 60px;
    height: 60px;
  }
  
  .loading-text {
    font-size: 0.75rem;
  }
}

// Small mobile optimizations
@media (max-width: 480px) {
  .glass-popup {
    padding: 1rem 1.5rem;
  }
  
  .star-loader svg {
    width: 48px;
    height: 48px;
  }
  
  .loading-text {
    font-size: 0.7rem;
    margin-top: 1rem;
  }
}

// Performance monitoring
.glass-popup {
  // Debug class for performance monitoring
  &.debug-performance {
    border: 2px solid red;
    background: rgba(255, 0, 0, 0.1);
  }
}

// Animation states for debugging
.glass-popup {
  &.animation-paused {
    animation-play-state: paused !important;
  }
  
  &.animation-debug {
    animation-timing-function: steps(10) !important;
  }
}

// Accessibility enhancements
.star-loader {
  // Screen reader support
  &::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  // Focus indicator for keyboard navigation
  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }
}

.loading-text {
  // Screen reader announcement
  &::before {
    content: 'Loading application';
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}

// Error states
.glass-popup {
  &.error-state {
    border-color: rgba(239, 68, 68, 0.5);
    background: rgba(239, 68, 68, 0.1);
  }
  
  &.error-state .loading-text {
    color: rgba(239, 68, 68, 0.8);
  }
}

// Success states
.glass-popup {
  &.success-state {
    border-color: rgba(34, 197, 94, 0.5);
    background: rgba(34, 197, 94, 0.1);
  }
  
  &.success-state .loading-text {
    color: rgba(34, 197, 94, 0.8);
  }
}
</style>
