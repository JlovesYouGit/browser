<template>
  <div
    data-slot="alert"
    role="alert"
    :class="alertClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

// Component props interface
interface AlertProps {
  class?: string
  variant?: VariantProps<typeof alertVariants>['variant']
}

// Define props with default values
const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'default'
})

// Computed classes
const alertClasses = computed(() => 
  cn(alertVariants({ variant: props.variant }), props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.alert {
  // Base alert styles
  position: relative;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  display: grid;
  align-items: flex-start;
  gap: 0.5rem 0;
  
  // Grid layout with icon
  &:has(> svg) {
    grid-template-columns: calc(var(--spacing, 1rem) * 4) 1fr;
    gap-x: 0.75rem;
  }
  
  // Grid layout without icon
  &:not(:has(> svg)) {
    grid-template-columns: 0 1fr;
  }
  
  // Icon styling
  > svg {
    width: 1rem;
    height: 1rem;
    transform: translateY(0.125rem);
    color: currentColor;
  }
  
  // Default variant
  &.variant-default {
    background: var(--color-card);
    color: var(--color-card-foreground);
  }
  
  // Destructive variant
  &.variant-destructive {
    color: var(--color-destructive);
    background: var(--color-card);
    
    > svg {
      color: currentColor;
    }
    
    *:deep([data-slot="alert-description"]) {
      color: color-mix(in srgb, var(--color-destructive) 90%, transparent);
    }
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    > svg {
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
    }
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for alert
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    &.variant-default {
      background: var(--color-card);
      color: var(--color-card-foreground);
      border-color: var(--color-border);
    }
    
    &.variant-destructive {
      background: var(--color-card);
      border-color: var(--color-destructive);
    }
  }
  
  // Print styles
  @media print {
    border: 1px solid #000;
    background: white;
    color: #000;
    
    &.variant-destructive {
      color: #d00;
      border-color: #d00;
    }
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    padding: 0.625rem 0.875rem;
    font-size: 0.8125rem;
    
    &:has(> svg) {
      grid-template-columns: calc(var(--spacing, 0.875rem) * 4) 1fr;
      gap-x: 0.625rem;
    }
    
    > svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    
    &:has(> svg) {
      grid-template-columns: calc(var(--spacing, 0.75rem) * 4) 1fr;
      gap-x: 0.5rem;
    }
    
    > svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Error states
  &.error-state {
    border-color: var(--color-destructive);
    background: color-mix(in srgb, var(--color-destructive) 5%, transparent);
  }
  
  // Success states
  &.success-state {
    border-color: var(--color-chart-2);
    background: color-mix(in srgb, var(--color-chart-2) 5%, transparent);
  }
  
  // Warning states
  &.warning-state {
    border-color: var(--color-chart-1);
    background: color-mix(in srgb, var(--color-chart-1) 5%, transparent);
  }
  
  // Info states
  &.info-state {
    border-color: var(--color-chart-4);
    background: color-mix(in srgb, var(--color-chart-4) 5%, transparent);
  }
  
  // Performance optimizations
  // Hardware acceleration for smooth transitions
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  
  // Optimize for animations
  will-change: auto;
  
  // Contain layout for performance
  contain: layout style paint;
}

// Animation classes for dynamic alerts
.alert {
  &.slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }
  
  &.slide-out {
    animation: slideOut 0.3s ease-out forwards;
  }
  
  &.fade-in {
    animation: fadeIn 0.2s ease-out forwards;
  }
  
  &.fade-out {
    animation: fadeOut 0.2s ease-out forwards;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .alert {
    &.slide-in,
    &.slide-out,
    &.fade-in,
    &.fade-out {
      animation: none;
    }
    
    &.slide-out,
    &.fade-out {
      display: none;
    }
  }
}

// Accessibility enhancements
.alert {
  // Ensure proper color contrast
  color: var(--color-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    border: 2px solid currentColor;
    
    &.variant-default {
      border-color: #000;
    }
    
    &.variant-destructive {
      border-color: #d00;
    }
  }
  
  // Screen reader announcements
  &.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  // Live region for dynamic content
  &.live-region {
    // Announce changes to screen readers
    // This is typically handled by the role="alert" attribute
  }
}

// Icon states
.alert {
  > svg {
    // Icon animations
    &.spin {
      animation: spin 1s linear infinite;
    }
    
    &.pulse {
      animation: pulse 2s ease-in-out infinite;
    }
    
    &.bounce {
      animation: bounce 1s ease-in-out infinite;
    }
  }
}

@keyframes spin {
  from { transform: translateY(0.125rem) rotate(0deg); }
  to { transform: translateY(0.125rem) rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0.125rem); }
  50% { transform: translateY(-0.125rem); }
}

// RTL support
.alert {
  [dir="rtl"] & {
    text-align: right;
    
    &:has(> svg) {
      grid-template-columns: 1fr calc(var(--spacing, 1rem) * 4);
    }
  }
}

// Loading state
.alert {
  &.loading {
    > svg {
      animation: spin 1s linear infinite;
    }
    
    .loading-text {
      font-style: italic;
      opacity: 0.8;
    }
  }
}

// Dismissible alerts
.alert {
  &.dismissible {
    grid-template-columns: 1fr auto;
    
    &:has(> svg) {
      grid-template-columns: calc(var(--spacing, 1rem) * 4) 1fr auto;
    }
    
    .dismiss-button {
      background: none;
      border: none;
      padding: 0.25rem;
      cursor: pointer;
      color: var(--color-muted-foreground);
      border-radius: 0.125rem;
      
      &:hover {
        background: var(--color-muted);
        color: var(--color-foreground);
      }
      
      &:focus {
        outline: 2px solid var(--color-ring);
        outline-offset: 2px;
      }
    }
  }
}

// Compact variant
.alert {
  &.compact {
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
    
    &:has(> svg) {
      grid-template-columns: calc(var(--spacing, 0.75rem) * 4) 1fr;
      gap-x: 0.5rem;
    }
    
    > svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
}

// Large variant
.alert {
  &.large {
    padding: 1rem 1.25rem;
    font-size: 1rem;
    
    &:has(> svg) {
      grid-template-columns: calc(var(--spacing, 1.25rem) * 4) 1fr;
      gap-x: 1rem;
    }
    
    > svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
}
</style>
