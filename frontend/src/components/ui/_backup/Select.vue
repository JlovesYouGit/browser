<template>
  <SelectRoot data-slot="select" v-bind="$attrs" v-model="modelValue">
    <slot />
  </SelectRoot>
</template>

<script setup lang="ts">
import { SelectRoot } from 'reka-ui'

interface SelectProps {
  class?: string
  modelValue?: string
  defaultValue?: string
  open?: boolean
  defaultOpen?: boolean
}

const props = defineProps<SelectProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:open': [open: boolean]
}>()
</script>

<style lang="less" scoped>
.select {
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
