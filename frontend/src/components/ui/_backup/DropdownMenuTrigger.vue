<template>
  <DropdownMenuTriggerRoot data-slot="dropdown-menu-trigger" v-bind="$attrs">
    <slot />
  </DropdownMenuTriggerRoot>
</template>

<script setup lang="ts">
import { DropdownMenuTrigger } from 'reka-ui'

interface DropdownMenuTriggerProps {
  class?: string
  asChild?: boolean
}

defineProps<DropdownMenuTriggerProps>()

const DropdownMenuTriggerRoot = DropdownMenuTrigger
</script>

<style lang="less" scoped>
.dropdown-menu-trigger {
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
