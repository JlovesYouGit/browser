<template>
  <DrawerRoot data-slot="drawer" v-bind="$attrs">
    <slot />
  </DrawerRoot>
</template>

<script setup lang="ts">
import { DrawerRoot } from 'vaul'

interface DrawerProps {
  class?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  direction?: 'top' | 'bottom' | 'left' | 'right'
  modal?: boolean
  shouldScaleBackground?: boolean
  snapPoints?: (number | string)[]
  activeSnapPoint?: number | string
  setActiveSnapPoint?: (snapPoint: number | string | undefined) => void
}

defineProps<DrawerProps>()
</script>

<style lang="less" scoped>
.drawer {
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
