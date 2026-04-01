<template>
  <TooltipTriggerRoot
    data-slot="tooltip-trigger"
    :as-child="asChild"
    v-bind="$attrs"
  >
    <slot />
  </TooltipTriggerRoot>
</template>

<script setup lang="ts">
import { TooltipTrigger } from 'reka-ui'

interface TooltipTriggerProps {
  asChild?: boolean
}

const props = defineProps<TooltipTriggerProps>()

const TooltipTriggerRoot = TooltipTrigger
</script>

<style lang="less" scoped>
.tooltip-trigger {
  cursor: pointer;
  
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
