<template>
  <div
    data-slot="alert-title"
    :class="titleClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

// Component props interface
interface AlertTitleProps {
  class?: string
}

// Define props
const props = defineProps<AlertTitleProps>()

// Computed classes
const titleClasses = computed(() => 
  cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.alert-title {
  // Base title styles
  grid-column-start: 2;
  line-clamp: 1;
  min-height: 1rem;
  font-weight: 500;
  letter-spacing: -0.025em;
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
    color: #000;
    font-weight: 700;
    letter-spacing: 0;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    font-size: 0.875rem;
    min-height: 0.875rem;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    font-size: 0.8125rem;
    min-height: 0.8125rem;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  // Long title handling
  &.long-title {
    font-size: 0.875rem;
    min-height: 0.875rem;
    
    @media (min-width: 640px) {
      font-size: 0.9375rem;
      min-height: 1rem;
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
.alert-title {
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
.alert-title {
  &:empty::before {
    content: "Alert Title";
    color: var(--color-muted-foreground);
    font-style: italic;
  }
}

// Emphasis styles
.alert-title {
  strong {
    font-weight: 600;
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
.alert-title {
  .title-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    margin-right: 0.375rem;
    vertical-align: middle;
    
    @media (max-width: 640px) {
      width: 0.875rem;
      height: 0.875rem;
      margin-right: 0.25rem;
    }
  }
  
  &.with-icon {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }
}

// Numbered titles
.alert-title {
  &.numbered {
    counter-increment: alert-title-counter;
    
    &::before {
      content: counter(alert-title-counter) ". ";
      font-weight: 600;
      color: var(--color-muted-foreground);
    }
  }
}

// Badge integration
.alert-title {
  .title-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.125rem 0.375rem;
    margin-left: 0.5rem;
    font-size: 0.6875rem;
    font-weight: 500;
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    border-radius: 9999px;
    vertical-align: middle;
    
    @media (max-width: 640px) {
      font-size: 0.625rem;
      padding: 0.0625rem 0.25rem;
      margin-left: 0.375rem;
    }
  }
  
  .badge-success {
    background-color: var(--color-chart-2);
    color: white;
  }
  
  .badge-warning {
    background-color: var(--color-chart-1);
    color: white;
  }
  
  .badge-error {
    background-color: var(--color-destructive);
    color: white;
  }
  
  .badge-info {
    background-color: var(--color-chart-4);
    color: white;
  }
}

// Tooltip integration
.alert-title {
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
      font-size: 0.6875rem;
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

// Compact variant
.alert-title {
  &.compact {
    font-size: 0.8125rem;
    min-height: 0.875rem;
    letter-spacing: -0.01em;
  }
}

// Large variant
.alert-title {
  &.large {
    font-size: 1.125rem;
    min-height: 1.25rem;
    letter-spacing: -0.03em;
  }
}

// Link styles within title
.alert-title {
  a {
    color: var(--color-primary);
    text-decoration: underline;
    
    &:hover {
      color: var(--color-primary);
      text-decoration: none;
    }
    
    &:focus {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }
  }
}

// Code styles within title
.alert-title {
  code {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.8125em;
    background-color: var(--color-muted);
    color: var(--color-foreground);
    padding: 0.125rem 0.25rem;
    border-radius: 0.125rem;
    border: 1px solid var(--color-border);
  }
}

// Status indicators
.alert-title {
  .status-indicator {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    vertical-align: middle;
    
    &.online {
      background-color: var(--color-chart-2);
    }
    
    &.offline {
      background-color: var(--color-muted-foreground);
    }
    
    &.busy {
      background-color: var(--color-chart-1);
    }
    
    &.error {
      background-color: var(--color-destructive);
    }
  }
}

// Animation support
.alert-title {
  &.fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  &.slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }
  
  &.typewriter {
    overflow: hidden;
    border-right: 2px solid var(--color-foreground);
    white-space: nowrap;
    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: var(--color-foreground); }
}

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .alert-title {
    &.fade-in,
    &.slide-in,
    &.typewriter {
      animation: none;
    }
    
    &.typewriter {
      border-right: none;
      white-space: normal;
      overflow: visible;
    }
  }
}
</style>
