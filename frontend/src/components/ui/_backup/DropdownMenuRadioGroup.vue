<template>
  <DropdownMenuRadioGroupRoot data-slot="dropdown-menu-radio-group" v-bind="$attrs">
    <slot />
  </DropdownMenuRadioGroupRoot>
</template>

<script setup lang="ts">
import { DropdownMenuRadioGroup } from 'reka-ui'

interface DropdownMenuRadioGroupProps {
  class?: string
  value?: string
  defaultValue?: string
}

defineProps<DropdownMenuRadioGroupProps>()

const DropdownMenuRadioGroupRoot = DropdownMenuRadioGroup
</script>

<style lang="less" scoped>
.dropdown-menu-radio-group {
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
