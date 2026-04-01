<template>
  <PopoverRoot data-slot="popover" v-bind="$attrs">
    <slot />
  </PopoverRoot>
</template>

<script setup lang="ts">
import { PopoverRoot } from 'reka-ui'

interface PopoverProps {
  class?: string
  open?: boolean
  defaultOpen?: boolean
}

defineProps<PopoverProps>()
</script>

<style lang="less" scoped>
.popover {
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
