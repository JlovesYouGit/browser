<template>
  <DrawerCloseRoot data-slot="drawer-close" v-bind="$attrs">
    <slot />
  </DrawerCloseRoot>
</template>

<script setup lang="ts">
import { DrawerClose } from 'vaul'

interface DrawerCloseProps {
  class?: string
  asChild?: boolean
}

defineProps<DrawerCloseProps>()

const DrawerCloseRoot = DrawerClose
</script>

<style lang="less" scoped>
.drawer-close {
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Performance optimizations
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
