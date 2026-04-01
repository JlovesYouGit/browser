<template>
  <HoverCardRoot data-slot="hover-card" v-bind="$attrs">
    <slot />
  </HoverCardRoot>
</template>

<script setup lang="ts">
import { HoverCardRoot } from 'reka-ui'

interface HoverCardProps {
  class?: string
  open?: boolean
  defaultOpen?: boolean
  openDelay?: number
  closeDelay?: number
}

defineProps<HoverCardProps>()
</script>

<style lang="less" scoped>
.hover-card {
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
  
  // Performance optimizations
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
