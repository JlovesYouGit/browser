<template>
  <ol
    data-slot="breadcrumb-list"
    :class="listClasses"
    v-bind="$attrs"
  >
    <slot />
  </ol>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

// Component props interface
interface BreadcrumbListProps {
  class?: string
}

// Define props
const props = defineProps<BreadcrumbListProps>()

// Computed classes
const listClasses = computed(() => 
  cn("text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.breadcrumb-list {
  // Base breadcrumb list styles
  color: var(--color-muted-foreground);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  word-break: break-words;
  
  // Responsive gap
  @media (min-width: 640px) {
    gap: 0.625rem;
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for breadcrumb list
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    color: var(--color-muted-foreground);
  }
  
  // Print styles
  @media print {
    color: #666;
    font-size: 0.75rem;
    
    // Ensure proper print layout
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    font-size: 0.8125rem;
    gap: 0.25rem;
    
    // Allow horizontal scrolling on small screens if needed
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    font-size: 0.75rem;
    gap: 0.1875rem;
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Layout variants
  &.horizontal {
    flex-direction: row;
  }
  
  &.vertical {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  // Alignment variants
  &.align-start {
    align-items: flex-start;
  }
  
  &.align-center {
    align-items: center;
  }
  
  &.align-end {
    align-items: flex-end;
  }
  
  // Text size variants
  &.text-xs {
    font-size: 0.75rem;
  }
  
  &.text-sm {
    font-size: 0.875rem;
  }
  
  &.text-base {
    font-size: 1rem;
  }
  
  &.text-lg {
    font-size: 1.125rem;
  }
  
  // Gap variants
  &.gap-none {
    gap: 0;
  }
  
  &.gap-xs {
    gap: 0.25rem;
  }
  
  &.gap-sm {
    gap: 0.375rem;
  }
  
  &.gap-md {
    gap: 0.5rem;
  }
  
  &.gap-lg {
    gap: 0.75rem;
  }
  
  &.gap-xl {
    gap: 1rem;
  }
  
  // Color variants
  &.text-foreground {
    color: var(--color-foreground);
  }
  
  &.text-muted-foreground {
    color: var(--color-muted-foreground);
  }
  
  &.text-primary {
    color: var(--color-primary);
  }
  
  &.text-secondary {
    color: var(--color-secondary);
  }
  
  &.text-accent {
    color: var(--color-accent);
  }
  
  &.text-destructive {
    color: var(--color-destructive);
  }
  
  // Wrap variants
  &.wrap-normal {
    flex-wrap: wrap;
  }
  
  &.wrap-nowrap {
    flex-wrap: nowrap;
  }
  
  &.wrap-reverse {
    flex-wrap: wrap-reverse;
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

// Animation support
.breadcrumb-list {
  &.fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  &.slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }
  
  &.stagger-in {
    > * {
      animation: staggerIn 0.3s ease-out forwards;
      animation-delay: calc(var(--stagger-delay, 0) * 0.1s);
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

@keyframes staggerIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .breadcrumb-list {
    &.fade-in,
    &.slide-in,
    &.stagger-in {
      animation: none;
    }
    
    &.stagger-in > * {
      animation: none;
    }
  }
}

// Hover effects
.breadcrumb-list {
  &.hover-lift {
    > * {
      transition: transform 0.2s ease;
    }
    
    > *:hover {
      transform: translateY(-2px);
    }
  }
}

// Focus effects
.breadcrumb-list {
  &.focus-ring {
    &:focus {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }
  }
  
  &.focus-inset {
    &:focus {
      outline: 2px solid var(--color-ring);
      outline-offset: -2px;
    }
  }
}

// Accessibility enhancements
.breadcrumb-list {
  // Ensure proper color contrast
  color: var(--color-muted-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    color: #000;
  }
  
  // Screen reader support
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
}

// RTL support
.breadcrumb-list {
  [dir="rtl"] & {
    // Breadcrumb list is direction-agnostic but may need adjustments
    flex-direction: row-reverse;
  }
}

// Print optimizations
@media print {
  .breadcrumb-list {
    // Ensure breadcrumb list prints correctly
    color: #000;
    font-size: 0.75rem;
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
    
    // Ensure proper print layout
    flex-wrap: nowrap;
    overflow-x: auto;
    page-break-inside: avoid;
  }
}

// High DPI optimizations
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .breadcrumb-list {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .breadcrumb-list {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .breadcrumb-list {
    // Dark mode breadcrumb list adaptations
    color: var(--color-muted-foreground);
  }
}

@media (prefers-color-scheme: light) {
  .breadcrumb-list {
    // Light mode breadcrumb list adaptations
    color: var(--color-muted-foreground);
  }
}

// Overflow handling
.breadcrumb-list {
  &.overflow-visible {
    overflow: visible;
  }
  
  &.overflow-hidden {
    overflow: hidden;
  }
  
  &.overflow-scroll {
    overflow: auto;
  }
  
  &.overflow-auto {
    overflow: auto;
  }
  
  // Horizontal scrolling for long breadcrumbs
  &.scroll-x {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      height: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: var(--color-muted);
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--color-muted-foreground);
      border-radius: 2px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: var(--color-foreground);
    }
  }
}

// Separator spacing
.breadcrumb-list {
  &.separator-space {
    gap: 0.5rem;
    
    @media (min-width: 640px) {
      gap: 0.75rem;
    }
  }
  
  &.separator-compact {
    gap: 0.25rem;
    
    @media (min-width: 640px) {
      gap: 0.375rem;
    }
  }
}

// Breadcrumb with maximum width
.breadcrumb-list {
  &.max-width-full {
    max-width: 100%;
  }
  
  &.max-width-prose {
    max-width: 65ch;
  }
  
  &.max-width-sm {
    max-width: 24rem;
  }
  
  &.max-width-md {
    max-width: 28rem;
  }
  
  &.max-width-lg {
    max-width: 32rem;
  }
  
  &.max-width-xl {
    max-width: 36rem;
  }
  
  &.max-width-2xl {
    max-width: 42rem;
  }
  
  &.max-width-3xl {
    max-width: 48rem;
  }
  
  &.max-width-4xl {
    max-width: 56rem;
  }
  
  &.max-width-5xl {
    max-width: 64rem;
  }
  
  &.max-width-6xl {
    max-width: 72rem;
  }
  
  &.max-width-7xl {
    max-width: 80rem;
  }
}

// Breadcrumb with ellipsis for long paths
.breadcrumb-list {
  &.truncate {
    > * {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  
  &.truncate-sm {
    > * {
      max-width: 8rem;
    }
  }
  
  &.truncate-md {
    > * {
      max-width: 12rem;
    }
  }
  
  &.truncate-lg {
    > * {
      max-width: 16rem;
    }
  }
}

// Breadcrumb with custom separators
.breadcrumb-list {
  &.separator-arrow {
    // Custom arrow separator styles
  }
  
  &.separator-dot {
    // Custom dot separator styles
  }
  
  &.separator-slash {
    // Custom slash separator styles
  }
  
  &.separator-pipe {
    // Custom pipe separator styles
  }
}

// Breadcrumb with numbering
.breadcrumb-list {
  &.numbered {
    counter-reset: breadcrumb-counter;
    
    > * {
      position: relative;
      padding-left: 2rem;
      
      &::before {
        counter-increment: breadcrumb-counter;
        content: counter(breadcrumb-counter) ".";
        position: absolute;
        left: 0;
        color: var(--color-muted-foreground);
        font-weight: 500;
      }
    }
  }
}

// Breadcrumb with custom styling
.breadcrumb-list {
  &.styled {
    // Custom styling variations
    background-color: var(--color-muted);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-border);
    
    &.elevated {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    &.outlined {
      border: 2px solid var(--color-border);
    }
  }
}

// Breadcrumb with interactive states
.breadcrumb-list {
  &.interactive {
    > * {
      transition: all 0.2s ease;
    }
    
    > *:hover {
      transform: translateY(-1px);
    }
    
    > *:active {
      transform: translateY(0);
    }
  }
}

// Breadcrumb with loading state
.breadcrumb-list {
  &.loading {
    opacity: 0.6;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1rem;
      height: 1rem;
      margin: -0.5rem 0 0 -0.5rem;
      border: 2px solid var(--color-primary);
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

// Breadcrumb with error state
.breadcrumb-list {
  &.error {
    color: var(--color-destructive);
    border-color: var(--color-destructive);
    
    > * {
      color: var(--color-destructive);
    }
  }
}

// Breadcrumb with success state
.breadcrumb-list {
  &.success {
    color: var(--color-chart-2);
    border-color: var(--color-chart-2);
    
    > * {
      color: var(--color-chart-2);
    }
  }
}

// Breadcrumb with warning state
.breadcrumb-list {
  &.warning {
    color: var(--color-chart-1);
    border-color: var(--color-chart-1);
    
    > * {
      color: var(--color-chart-1);
    }
  }
}
</style>
