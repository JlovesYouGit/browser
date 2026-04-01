<template>
  <ContextMenuRoot data-slot="context-menu" v-bind="$attrs">
    <slot />
  </ContextMenuRoot>
</template>

<script setup lang="ts">
import { ContextMenuRoot } from 'reka-ui'

interface ContextMenuProps {
  class?: string
  modal?: boolean
}

defineProps<ContextMenuProps>()
</script>

<style lang="less" scoped>
.context-menu {
  // Base context menu styles
  
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

// Dark mode support
@media (prefers-color-scheme: dark) {
  .context-menu {
    // Dark mode adaptations handled by CSS variables
  }
}

// Print styles
@media print {
  .context-menu {
    display: none;
  }
}
</style>
