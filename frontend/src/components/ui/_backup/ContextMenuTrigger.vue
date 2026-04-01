<template>
  <ContextMenuTriggerRoot data-slot="context-menu-trigger" v-bind="$attrs">
    <slot />
  </ContextMenuTriggerRoot>
</template>

<script setup lang="ts">
import { ContextMenuTrigger } from 'reka-ui'

interface ContextMenuTriggerProps {
  class?: string
  disabled?: boolean
  asChild?: boolean
}

defineProps<ContextMenuTriggerProps>()

const ContextMenuTriggerRoot = ContextMenuTrigger
</script>

<style lang="less" scoped>
.context-menu-trigger {
  cursor: context-menu;
  user-select: none;
  
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
