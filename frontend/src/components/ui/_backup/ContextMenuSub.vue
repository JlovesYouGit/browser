<template>
  <ContextMenuSubRoot data-slot="context-menu-sub" v-bind="$attrs">
    <slot />
  </ContextMenuSubRoot>
</template>

<script setup lang="ts">
import { ContextMenuSub } from 'reka-ui'

interface ContextMenuSubProps {
  class?: string
  defaultOpen?: boolean
  open?: boolean
}

defineProps<ContextMenuSubProps>()

const ContextMenuSubRoot = ContextMenuSub
</script>

<style lang="less" scoped>
.context-menu-sub {
  // Base sub menu styles
  
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
