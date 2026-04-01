<template>
  <AlertDialogOverlayPrimitive
    :data-slot="'alert-dialog-overlay'"
    :class="overlayClasses"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AlertDialogOverlay } from 'radix-vue'
import { cn } from '@/utils/cn'

// Component props interface
interface AlertDialogOverlayProps {
  class?: string
  forceMount?: boolean
}

// Define props with default values
const props = withDefaults(defineProps<AlertDialogOverlayProps>(), {
  forceMount: false
})

// Use Radix Vue AlertDialogOverlay under the hood
const AlertDialogOverlayPrimitive = AlertDialogOverlay

// Computed classes
const overlayClasses = computed(() => 
  cn(
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
    props.class
  )
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.alert-dialog-overlay {
  // Base overlay styles
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
  
  // Animation states
  &[data-state="open"] {
    animation: fadeIn 0.2s ease-out forwards;
  }
  
  &[data-state="closed"] {
    animation: fadeOut 0.2s ease-out forwards;
  }
}

// Animations
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

// High DPI display optimization
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .alert-dialog-overlay {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  .alert-dialog-overlay {
    animation: none;
    
    &[data-state="open"] {
      opacity: 1;
    }
    
    &[data-state="closed"] {
      opacity: 0;
    }
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .alert-dialog-overlay {
    background-color: rgba(0, 0, 0, 0.7);
  }
}

// Print styles
@media print {
  .alert-dialog-overlay {
    display: none;
  }
}
</style>
