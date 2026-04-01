<template>
  <ContextMenuGroupRoot data-slot="context-menu-group" v-bind="$attrs">
    <slot />
  </ContextMenuGroupRoot>
</template>

<script setup lang="ts">
import { ContextMenuGroup } from 'reka-ui'

interface ContextMenuGroupProps {
  class?: string
}

defineProps<ContextMenuGroupProps>()

const ContextMenuGroupRoot = ContextMenuGroup
</script>

<style lang="less" scoped>
.context-menu-group {
  // Base group styles
  
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
