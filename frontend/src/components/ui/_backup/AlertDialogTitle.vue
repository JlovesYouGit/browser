<template>
  <AlertDialogTitlePrimitive
    :data-slot="'alert-dialog-title'"
    :class="titleClasses"
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogTitlePrimitive>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AlertDialogTitle } from 'radix-vue'
import { cn } from '@/utils/cn'

// Component props interface
interface AlertDialogTitleProps {
  class?: string
}

// Define props
const props = defineProps<AlertDialogTitleProps>()

// Use Radix Vue AlertDialogTitle under the hood
const AlertDialogTitlePrimitive = AlertDialogTitle

// Computed classes
const titleClasses = computed(() => 
  cn("text-lg font-semibold", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.alert-dialog-title {
  // Base title styles
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--color-foreground);
  margin: 0;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for title
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    color: var(--color-foreground);
  }
  
  // Print styles
  @media print {
    font-size: 1rem;
    color: #000;
    font-weight: 700;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    font-size: 1rem;
    line-height: 1.4;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    font-size: 0.9375rem;
    line-height: 1.3;
  }
  
  // Accessibility enhancements
  // Ensure proper color contrast
  color: var(--color-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    color: #000;
    font-weight: 700;
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Text overflow handling
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  
  // Long title handling
  &.long-title {
    font-size: 1rem;
    line-height: 1.4;
    
    @media (min-width: 640px) {
      font-size: 1.125rem;
      line-height: 1.5;
    }
  }
  
  // Warning state
  &.warning {
    color: var(--color-chart-1);
  }
  
  // Error state
  &.error {
    color: var(--color-destructive);
  }
  
  // Success state
  &.success {
    color: var(--color-chart-2);
  }
  
  // Info state
  &.info {
    color: var(--color-chart-4);
  }
  
  // RTL support
  [dir="rtl"] & {
    text-align: right;
  }
  
  // Performance optimizations
  // Contain text rendering
  contain: layout style paint;
  
  // Optimize for animations
  will-change: auto;
  
  // Hardware acceleration for smooth transitions
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

// Text selection styles
.alert-dialog-title {
  &::selection {
    background-color: var(--color-ring);
    color: var(--color-background);
  }
  
  &::-moz-selection {
    background-color: var(--color-ring);
    color: var(--color-background);
  }
}

// Placeholder styles for dynamic content
.alert-dialog-title {
  &:empty::before {
    content: "Alert Title";
    color: var(--color-muted-foreground);
    font-style: italic;
  }
}

// Emphasis styles
.alert-dialog-title {
  strong {
    font-weight: 700;
  }
  
  em {
    font-style: italic;
  }
  
  .highlight {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    padding: 0.125rem 0.25rem;
    border-radius: 0.125rem;
  }
}

// Icon integration
.alert-dialog-title {
  .title-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
    vertical-align: middle;
    
    @media (max-width: 640px) {
      width: 1rem;
      height: 1rem;
      margin-right: 0.375rem;
    }
  }
  
  &.with-icon {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

// Numbered titles
.alert-dialog-title {
  &.numbered {
    counter-increment: alert-dialog-counter;
    
    &::before {
      content: counter(alert-dialog-counter) ". ";
      font-weight: 700;
      color: var(--color-muted-foreground);
    }
  }
}

// Badge integration
.alert-dialog-title {
  .title-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.125rem 0.5rem;
    margin-left: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    border-radius: 9999px;
    vertical-align: middle;
    
    @media (max-width: 640px) {
      font-size: 0.6875rem;
      padding: 0.0625rem 0.375rem;
    }
  }
}

// Tooltip integration
.alert-dialog-title {
  &[data-tooltip] {
    position: relative;
    cursor: help;
    
    &::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      font-weight: 400;
      background-color: var(--color-popover);
      color: var(--color-popover-foreground);
      border: 1px solid var(--color-border);
      border-radius: 0.25rem;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
      z-index: 1000;
    }
    
    &:hover::after {
      opacity: 1;
    }
  }
}
</style>
