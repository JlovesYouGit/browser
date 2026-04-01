<template>
  <SelectValueRoot data-slot="select-value" v-bind="$attrs">
    <slot />
  </SelectValueRoot>
</template>

<script setup lang="ts">
import { SelectValue } from 'reka-ui'

interface SelectValueProps {
  class?: string
  placeholder?: string
}

defineProps<SelectValueProps>()

const SelectValueRoot = SelectValue
</script>

<style lang="less" scoped>
.select-value {
  line-clamp: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
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
