<template>
  <DialogCloseRoot data-slot="dialog-close" v-bind="$attrs">
    <slot />
  </DialogCloseRoot>
</template>

<script setup lang="ts">
import { DialogClose } from 'reka-ui'

interface DialogCloseProps {
  class?: string
  asChild?: boolean
}

defineProps<DialogCloseProps>()

const DialogCloseRoot = DialogClose
</script>

<style lang="less" scoped>
.dialog-close {
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
