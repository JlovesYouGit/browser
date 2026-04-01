<template>
  <DialogTriggerRoot data-slot="sheet-trigger" v-bind="$attrs">
    <slot />
  </DialogTriggerRoot>
</template>

<script setup lang="ts">
import { DialogTrigger } from 'reka-ui'

interface SheetTriggerProps {
  class?: string
  asChild?: boolean
}

defineProps<SheetTriggerProps>()

const DialogTriggerRoot = DialogTrigger
</script>

<style lang="less" scoped>
.sheet-trigger {
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
