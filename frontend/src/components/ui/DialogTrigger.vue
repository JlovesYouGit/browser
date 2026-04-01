<template>
  <DialogTriggerRoot data-slot="dialog-trigger" v-bind="$attrs">
    <slot />
  </DialogTriggerRoot>
</template>

<script setup lang="ts">
import { DialogTrigger } from 'reka-ui'

interface DialogTriggerProps {
  class?: string
  asChild?: boolean
}

defineProps<DialogTriggerProps>()

const DialogTriggerRoot = DialogTrigger
</script>

<style lang="less" scoped>
.dialog-trigger {
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
