<template>
  <DropdownMenuSubRoot data-slot="dropdown-menu-sub" v-bind="$attrs">
    <slot />
  </DropdownMenuSubRoot>
</template>

<script setup lang="ts">
import { DropdownMenuSub } from 'reka-ui'

interface DropdownMenuSubProps {
  class?: string
  defaultOpen?: boolean
  open?: boolean
}

defineProps<DropdownMenuSubProps>()

const DropdownMenuSubRoot = DropdownMenuSub
</script>

<style lang="less" scoped>
.dropdown-menu-sub {
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
