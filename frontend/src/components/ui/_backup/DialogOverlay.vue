<template>
  <DialogOverlayRoot
    data-slot="dialog-overlay"
    :class="overlayClasses"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DialogOverlay } from 'reka-ui'
import { cn } from '@/utils/cn'

interface DialogOverlayProps {
  class?: string
}

defineProps<DialogOverlayProps>()

const DialogOverlayRoot = DialogOverlay

const overlayClasses = computed(() =>
  cn(
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
    props.class
  )
)
</script>

<style lang="less" scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
  
  &[data-state="open"] {
    animation: fadeIn 0.15s ease-out;
  }
  
  &[data-state="closed"] {
    animation: fadeOut 0.1s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    transition: none !important;
  }
  
  // Performance optimizations
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
