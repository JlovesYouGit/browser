<template>
  <PopoverTriggerRoot data-slot="popover-trigger" v-bind="$attrs">
    <slot />
  </PopoverTriggerRoot>
</template>

<script setup lang="ts">
import { PopoverTrigger } from 'reka-ui'

interface PopoverTriggerProps {
  class?: string
  asChild?: boolean
}

defineProps<PopoverTriggerProps>()

const PopoverTriggerRoot = PopoverTrigger
</script>

<style lang="less" scoped>
.popover-trigger {
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
