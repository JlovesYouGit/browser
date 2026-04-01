<template>
  <DialogRoot data-slot="sheet" v-bind="$attrs">
    <slot />
  </DialogRoot>
</template>

<script setup lang="ts">
import { DialogRoot } from 'reka-ui'

interface SheetProps {
  class?: string
  open?: boolean
  defaultOpen?: boolean
}

defineProps<SheetProps>()
</script>

<style lang="less" scoped>
.sheet {
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
