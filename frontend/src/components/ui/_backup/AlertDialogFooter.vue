<template>
  <div
    :data-slot="'alert-dialog-footer'"
    :class="footerClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

// Component props interface
interface AlertDialogFooterProps {
  class?: string
}

// Define props
const props = defineProps<AlertDialogFooterProps>()

// Computed classes
const footerClasses = computed(() => 
  cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.alert-dialog-footer {
  // Base footer styles
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  
  // Responsive design
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for footer
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Footer inherits colors from buttons
  }
  
  // Print styles
  @media print {
    flex-direction: row;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    gap: 0.375rem;
    
    // Ensure buttons don't get too small on mobile
    > * {
      min-height: 2.5rem;
    }
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    gap: 0.25rem;
    
    > * {
      min-height: 2.25rem;
      font-size: 0.875rem;
    }
  }
  
  // Accessibility enhancements
  // Ensure proper spacing for touch targets
  > * {
    min-height: 2.5rem;
    min-width: 3rem;
  }
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    gap: 1rem;
    
    > * {
      border: 2px solid #000;
    }
  }
  
  // Button layout optimization
  .button-primary,
  .button-secondary {
    flex: 1;
    
    @media (min-width: 640px) {
      flex: none;
      min-width: 5rem;
    }
  }
  
  .button-primary {
    // Primary button should be more prominent
    font-weight: 600;
  }
  
  .button-secondary {
    // Secondary button should be less prominent
    font-weight: 500;
  }
  
  // RTL support
  [dir="rtl"] & {
    @media (min-width: 640px) {
      flex-direction: row-reverse;
    }
  }
  
  // Focus management
  > *:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Loading states
  .loading {
    pointer-events: none;
    opacity: 0.7;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1rem;
      height: 1rem;
      margin: -0.5rem 0 0 -0.5rem;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
  
  // Error states
  .error {
    border-color: var(--color-destructive);
    color: var(--color-destructive);
    
    &:hover {
      background-color: var(--color-destructive);
      color: var(--color-destructive-foreground);
    }
  }
  
  // Success states
  .success {
    border-color: var(--color-chart-2);
    color: var(--color-chart-2);
    
    &:hover {
      background-color: var(--color-chart-2);
      color: white;
    }
  }
  
  // Warning states
  .warning {
    border-color: var(--color-chart-1);
    color: var(--color-chart-1);
    
    &:hover {
      background-color: var(--color-chart-1);
      color: white;
    }
  }
}

// Loading animation
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// Performance optimizations
.alert-dialog-footer {
  // Contain layout for performance
  contain: layout style;
  
  // Optimize for animations
  will-change: auto;
  
  // Hardware acceleration for smooth transitions
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

// Reduced motion support for loading animation
@media (prefers-reduced-motion: reduce) {
  .loading::after {
    animation: none;
  }
}
</style>
