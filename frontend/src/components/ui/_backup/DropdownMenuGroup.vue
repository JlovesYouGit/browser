<template>
  <DropdownMenuGroupRoot data-slot="dropdown-menu-group" v-bind="$attrs">
    <slot />
  </DropdownMenuGroupRoot>
</template>

<script setup lang="ts">
import { DropdownMenuGroup } from 'reka-ui'

interface DropdownMenuGroupProps {
  class?: string
}

defineProps<DropdownMenuGroupProps>()

const DropdownMenuGroupRoot = DropdownMenuGroup
</script>

<style lang="less" scoped>
.dropdown-menu-group {
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
