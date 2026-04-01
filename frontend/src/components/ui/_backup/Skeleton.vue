<template>
  <div
    data-slot="skeleton"
    :class="skeletonClasses"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SkeletonProps {
  class?: string
}

const props = defineProps<SkeletonProps>()

const skeletonClasses = computed(() =>
  cn(
    "bg-accent animate-pulse rounded-md",
    props.class
  )
)
</script>

<style lang="less" scoped>
.skeleton {
  background-color: var(--color-accent);
  border-radius: 0.375rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
  
  // Performance optimizations
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
