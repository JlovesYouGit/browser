<template>
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogContentPrimitive
      :data-slot="'alert-dialog-content'"
      :class="contentClasses"
      v-bind="$attrs"
    >
      <slot />
    </AlertDialogContentPrimitive>
  </AlertDialogPortal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AlertDialogContent, AlertDialogPortal } from 'radix-vue'
import { cn } from '@/utils/cn'
import AlertDialogOverlay from './AlertDialogOverlay.vue'

// Component props interface
interface AlertDialogContentProps {
  class?: string
  forceMount?: boolean
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onPointerDownOutside?: (event: PointerEvent) => void
  onFocusOutside?: (event: FocusEvent) => void
  onInteractOutside?: (event: Event) => void
}

// Define props with default values
const props = withDefaults(defineProps<AlertDialogContentProps>(), {
  forceMount: false
})

// Use Radix Vue AlertDialogContent under the hood
const AlertDialogContentPrimitive = AlertDialogContent

// Computed classes
const contentClasses = computed(() => 
  cn(
    "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
    props.class
  )
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.alert-dialog-content {
  // Base content styles
  background: var(--color-background);
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 50;
  display: grid;
  width: 100%;
  max-width: calc(100% - 2rem);
  transform: translateX(-50%) translateY(-50%);
  gap: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  padding: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  // Animation states
  &[data-state="open"] {
    animation: zoomIn 0.2s ease-out forwards;
  }
  
  &[data-state="closed"] {
    animation: zoomOut 0.2s ease-out forwards;
  }
  
  // Responsive design
  @media (min-width: 640px) {
    max-width: 32rem; // sm:max-w-lg
  }
}

// Animations
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%) scale(1);
  }
}

@keyframes zoomOut {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-50%) scale(0.95);
  }
}

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
  .alert-dialog-content {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    // Enhance border rendering on retina displays
    border: 0.5px solid var(--color-border);
  }
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  .alert-dialog-content {
    animation: none;
    transition: none;
    
    &[data-state="open"] {
      opacity: 1;
      transform: translateX(-50%) translateY(-50%) scale(1);
    }
    
    &[data-state="closed"] {
      opacity: 0;
      transform: translateX(-50%) translateY(-50%) scale(0.95);
    }
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .alert-dialog-content {
    background: var(--color-background);
    border-color: var(--color-border);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
  }
}

// Print styles
@media print {
  .alert-dialog-content {
    position: static;
    transform: none;
    max-width: 100%;
    border: 1px solid #000;
    box-shadow: none;
  }
}

// Mobile optimizations
@media (max-width: 640px) {
  .alert-dialog-content {
    margin: 1rem;
    max-width: calc(100% - 2rem);
    padding: 1rem;
    
    // Ensure content doesn't overflow on small screens
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
  }
}

// Small mobile optimizations
@media (max-width: 480px) {
  .alert-dialog-content {
    margin: 0.5rem;
    padding: 0.75rem;
    gap: 0.75rem;
  }
}

// Focus management
.alert-dialog-content:focus {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

// Error states
.alert-dialog-content {
  &.error-state {
    border-color: var(--color-destructive);
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
  }
}

// Success states
.alert-dialog-content {
  &.success-state {
    border-color: var(--color-chart-2);
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
  }
}

// Warning states
.alert-dialog-content {
  &.warning-state {
    border-color: var(--color-chart-1);
    box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
  }
}

// Performance optimizations
.alert-dialog-content {
  // Hardware acceleration for smooth animations
  transform: translateX(-50%) translateY(-50%) scale(1);
  -webkit-transform: translateX(-50%) translateY(-50%) scale(1);
  
  // Optimize for animations
  will-change: transform, opacity, scale;
  
  // Contain layout for performance
  contain: layout style paint;
}

// Accessibility enhancements
.alert-dialog-content {
  // Ensure proper color contrast
  color: var(--color-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    border: 2px solid var(--color-foreground);
    box-shadow: 0 0 0 2px var(--color-background), 0 0 0 4px var(--color-foreground);
  }
}
</style>
