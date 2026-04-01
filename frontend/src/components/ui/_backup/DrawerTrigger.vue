<template>
  <DrawerTriggerRoot data-slot="drawer-trigger" v-bind="$attrs">
    <slot />
  </DrawerTriggerRoot>
</template>

<script setup lang="ts">
import { DrawerTrigger } from 'vaul'

interface DrawerTriggerProps {
  class?: string
  asChild?: boolean
}

defineProps<DrawerTriggerProps>()

const DrawerTriggerRoot = DrawerTrigger
</script>

<style lang="less" scoped>
.drawer-trigger {
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
