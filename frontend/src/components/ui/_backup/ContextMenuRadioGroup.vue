<template>
  <ContextMenuRadioGroupRoot data-slot="context-menu-radio-group" v-bind="$attrs">
    <slot />
  </ContextMenuRadioGroupRoot>
</template>

<script setup lang="ts">
import { ContextMenuRadioGroup } from 'reka-ui'

interface ContextMenuRadioGroupProps {
  class?: string
  value?: string
  defaultValue?: string
}

defineProps<ContextMenuRadioGroupProps>()

const ContextMenuRadioGroupRoot = ContextMenuRadioGroup
</script>

<style lang="less" scoped>
.context-menu-radio-group {
  // Base radio group styles
  
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
