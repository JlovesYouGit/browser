<template>
  <DropdownMenuRoot data-slot="dropdown-menu" v-bind="$attrs">
    <slot />
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import { DropdownMenuRoot } from 'reka-ui'

interface DropdownMenuProps {
  class?: string
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

defineProps<DropdownMenuProps>()
</script>

<style lang="less" scoped>
.dropdown-menu {
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
