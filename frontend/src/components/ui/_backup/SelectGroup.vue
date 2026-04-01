<template>
  <SelectGroupRoot data-slot="select-group" v-bind="$attrs">
    <slot />
  </SelectGroupRoot>
</template>

<script setup lang="ts">
import { SelectGroup } from 'reka-ui'

interface SelectGroupProps {
  class?: string
}

defineProps<SelectGroupProps>()

const SelectGroupRoot = SelectGroup
</script>

<style lang="less" scoped>
.select-group {
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
