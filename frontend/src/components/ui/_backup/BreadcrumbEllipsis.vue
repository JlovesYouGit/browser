<template>
  <span
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    aria-hidden="true"
    :class="ellipsisClasses"
    v-bind="$attrs"
  >
    <MoreHorizontalIcon class="size-4" />
    <span class="sr-only">More</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MoreHorizontal } from 'lucide-vue-next'
import { cn } from '@/utils/cn'

// Component props interface
interface BreadcrumbEllipsisProps {
  class?: string
}

// Define props
const props = defineProps<BreadcrumbEllipsisProps>()

// Use MoreHorizontal icon
const MoreHorizontalIcon = MoreHorizontal

// Computed classes
const ellipsisClasses = computed(() => 
  cn("flex size-9 items-center justify-center", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.breadcrumb-ellipsis {
  // Base breadcrumb ellipsis styles
  display: flex;
  width: 2.25rem;
  height: 2.25rem;
  align-items: center;
  justify-content: center;
  color: var(--color-muted-foreground);
  cursor: default;
  
  // Icon sizing
  > svg {
    width: 1rem;
    height: 1rem;
  }
  
  // Screen reader only text
  .sr-only {
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
    // No animations needed for ellipsis
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    color: var(--color-muted-foreground);
  }
  
  // Print styles
  @media print {
    color: #666;
    
    > svg {
      // Ensure icon prints correctly
      fill: #666;
    }
    
    .sr-only {
      // Hide screen reader text in print
      display: none;
    }
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    width: 2rem;
    height: 2rem;
    
    > svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    width: 1.75rem;
    height: 1.75rem;
    
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
  
  // Size variants
  &.size-xs {
    width: 1.5rem;
    height: 1.5rem;
    
    > svg {
      width: 0.625rem;
      height: 0.625rem;
    }
  }
  
  &.size-sm {
    width: 1.75rem;
    height: 1.75rem;
    
    > svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
  
  &.size-md {
    width: 2rem;
    height: 2rem;
    
    > svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
  
  &.size-lg {
    width: 2.5rem;
    height: 2.5rem;
    
    > svg {
      width: 1.125rem;
      height: 1.125rem;
    }
  }
  
  &.size-xl {
    width: 3rem;
    height: 3rem;
    
    > svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  
  // Shape variants
  &.rounded-none {
    border-radius: 0;
  }
  
  &.rounded-sm {
    border-radius: 0.125rem;
  }
  
  &.rounded {
    border-radius: 0.25rem;
  }
  
  &.rounded-md {
    border-radius: 0.375rem;
  }
  
  &.rounded-lg {
    border-radius: 0.5rem;
  }
  
  &.rounded-xl {
    border-radius: 0.75rem;
  }
  
  &.rounded-2xl {
    border-radius: 1rem;
  }
  
  &.rounded-full {
    border-radius: 50%;
  }
  
  // Color variants
  &.text-foreground {
    color: var(--color-foreground);
    
    > svg {
      color: var(--color-foreground);
    }
  }
  
  &.text-muted-foreground {
    color: var(--color-muted-foreground);
    
    > svg {
      color: var(--color-muted-foreground);
    }
  }
  
  &.text-primary {
    color: var(--color-primary);
    
    > svg {
      color: var(--color-primary);
    }
  }
  
  &.text-secondary {
    color: var(--color-secondary);
    
    > svg {
      color: var(--color-secondary);
    }
  }
  
  &.text-accent {
    color: var(--color-accent);
    
    > svg {
      color: var(--color-accent);
    }
  }
  
  &.text-destructive {
    color: var(--color-destructive);
    
    > svg {
      color: var(--color-destructive);
    }
  }
  
  &.text-success {
    color: var(--color-chart-2);
    
    > svg {
      color: var(--color-chart-2);
    }
  }
  
  &.text-warning {
    color: var(--color-chart-1);
    
    > svg {
      color: var(--color-chart-1);
    }
  }
  
  &.text-info {
    color: var(--color-chart-4);
    
    > svg {
      color: var(--color-chart-4);
    }
  }
  
  // Background variants
  &.bg-muted {
    background-color: var(--color-muted);
  }
  
  &.bg-primary {
    background-color: var(--color-primary);
    color: var(--color-primary-foreground);
    
    > svg {
      color: var(--color-primary-foreground);
    }
  }
  
  &.bg-secondary {
    background-color: var(--color-secondary);
    color: var(--color-secondary-foreground);
    
    > svg {
      color: var(--color-secondary-foreground);
    }
  }
  
  &.bg-accent {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    
    > svg {
      color: var(--color-accent-foreground);
    }
  }
  
  &.bg-destructive {
    background-color: var(--color-destructive);
    color: var(--color-destructive-foreground);
    
    > svg {
      color: var(--color-destructive-foreground);
    }
  }
  
  &.bg-success {
    background-color: var(--color-chart-2);
    color: white;
    
    > svg {
      color: white;
    }
  }
  
  &.bg-warning {
    background-color: var(--color-chart-1);
    color: white;
    
    > svg {
      color: white;
    }
  }
  
  &.bg-info {
    background-color: var(--color-chart-4);
    color: white;
    
    > svg {
      color: white;
    }
  }
  
  // Border variants
  &.border-none {
    border: none;
  }
  
  &.border {
    border: 1px solid var(--color-border);
  }
  
  &.border-2 {
    border: 2px solid var(--color-border);
  }
  
  &.border-4 {
    border: 4px solid var(--color-border);
  }
  
  // Shadow variants
  &.shadow-none {
    box-shadow: none;
  }
  
  &.shadow-sm {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  
  &.shadow {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
  
  &.shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  &.shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  &.shadow-xl {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  &.shadow-2xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  // Animation variants
  &.rotate {
    > svg {
      animation: rotate 2s linear infinite;
    }
  }
  
  &.pulse {
    > svg {
      animation: pulse 2s ease-in-out infinite;
    }
  }
  
  &.bounce {
    > svg {
      animation: bounce 1s ease-in-out infinite;
    }
  }
  
  &.fade {
    > svg {
      animation: fade 1s ease-in-out infinite;
    }
  }
  
  &.spin {
    > svg {
      animation: spin 1s linear infinite;
    }
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

// Animations
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

@keyframes fade {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .breadcrumb-ellipsis {
    &.rotate,
    &.pulse,
    &.bounce,
    &.fade,
    &.spin {
      > svg {
        animation: none;
      }
    }
  }
}

// Hover effects
.breadcrumb-ellipsis {
  &.hover-lift {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  &.hover-grow {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
  
  &.hover-shrink {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(0.9);
    }
  }
  
  &.hover-rotate {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: rotate(90deg);
    }
  }
  
  &.hover-brighten {
    transition: filter 0.2s ease;
    
    &:hover {
      filter: brightness(1.2);
    }
  }
  
  &.hover-saturate {
    transition: filter 0.2s ease;
    
    &:hover {
      filter: saturate(1.5);
    }
  }
  
  &.hover-color {
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--color-foreground);
      
      > svg {
        color: var(--color-foreground);
      }
    }
  }
}

// Focus effects
.breadcrumb-ellipsis {
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
  
  &.focus-visible {
    &:focus-visible {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }
  }
}

// Active state
.breadcrumb-ellipsis {
  &.active {
    color: var(--color-foreground);
    
    > svg {
      color: var(--color-foreground);
    }
  }
}

// Disabled state
.breadcrumb-ellipsis {
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
    
    > svg {
      opacity: 0.5;
    }
  }
}

// Loading state
.breadcrumb-ellipsis {
  &.loading {
    opacity: 0.7;
    pointer-events: none;
    
    > svg {
      animation: spin 1s linear infinite;
    }
  }
}

// Error state
.breadcrumb-ellipsis {
  &.error {
    color: var(--color-destructive);
    
    > svg {
      color: var(--color-destructive);
    }
  }
}

// Success state
.breadcrumb-ellipsis {
  &.success {
    color: var(--color-chart-2);
    
    > svg {
      color: var(--color-chart-2);
    }
  }
}

// Warning state
.breadcrumb-ellipsis {
  &.warning {
    color: var(--color-chart-1);
    
    > svg {
      color: var(--color-chart-1);
    }
  }
}

// Info state
.breadcrumb-ellipsis {
  &.info {
    color: var(--color-chart-4);
    
    > svg {
      color: var(--color-chart-4);
    }
  }
}

// Accessibility enhancements
.breadcrumb-ellipsis {
  // Ensure proper color contrast
  color: var(--color-muted-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    color: #000;
    
    > svg {
      color: #000;
    }
  }
}

// RTL support
.breadcrumb-ellipsis {
  [dir="rtl"] & {
    // RTL specific adjustments
    // Ellipsis is direction-agnostic
  }
}

// Print optimizations
@media print {
  .breadcrumb-ellipsis {
    // Ensure breadcrumb ellipsis prints correctly
    color: #666;
    
    > svg {
      fill: #666;
    }
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
    
    // Hide screen reader text in print
    .sr-only {
      display: none;
    }
  }
}

// High DPI optimizations
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .breadcrumb-ellipsis {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    > svg {
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
    }
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .breadcrumb-ellipsis {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
    
    > svg {
      animation: none;
    }
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .breadcrumb-ellipsis {
    // Dark mode breadcrumb ellipsis adaptations
    color: var(--color-muted-foreground);
    
    > svg {
      color: var(--color-muted-foreground);
    }
  }
}

@media (prefers-color-scheme: light) {
  .breadcrumb-ellipsis {
    // Light mode breadcrumb ellipsis adaptations
    color: var(--color-muted-foreground);
    
    > svg {
      color: var(--color-muted-foreground);
    }
  }
}

// Ellipsis with custom content
.breadcrumb-ellipsis {
  &.custom-content {
    > svg {
      display: none;
    }
    
    // Custom content is handled by slot
  }
  
  &.text-ellipsis {
    > svg {
      display: none;
    }
    
    &::before {
      content: '...';
      font-weight: 300;
      opacity: 0.7;
    }
  }
  
  &.dots {
    > svg {
      display: none;
    }
    
    &::before {
      content: '•••';
      font-weight: 300;
      opacity: 0.7;
      letter-spacing: 0.125rem;
    }
  }
}

// Ellipsis with tooltip
.breadcrumb-ellipsis {
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

// Ellipsis with click handler
.breadcrumb-ellipsis {
  &.clickable {
    cursor: pointer;
    
    &:hover {
      color: var(--color-foreground);
      
      > svg {
        color: var(--color-foreground);
      }
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
}

// Ellipsis with custom spacing
.breadcrumb-ellipsis {
  &.spacing-tight {
    margin: 0 0.25rem;
  }
  
  &.spacing-normal {
    margin: 0 0.375rem;
  }
  
  &.spacing-loose {
    margin: 0 0.5rem;
  }
  
  &.spacing-extra-loose {
    margin: 0 0.75rem;
  }
  
  &.spacing-none {
    margin: 0;
  }
}

// Ellipsis with custom opacity
.breadcrumb-ellipsis {
  &.opacity-0 {
    opacity: 0;
  }
  
  &.opacity-25 {
    opacity: 0.25;
  }
  
  &.opacity-50 {
    opacity: 0.5;
  }
  
  &.opacity-75 {
    opacity: 0.75;
  }
  
  &.opacity-100 {
    opacity: 1;
  }
}

// Ellipsis with custom visibility
.breadcrumb-ellipsis {
  &.visible {
    visibility: visible;
  }
  
  &.invisible {
    visibility: hidden;
  }
}

// Ellipsis with custom position
.breadcrumb-ellipsis {
  &.static {
    position: static;
  }
  
  &.relative {
    position: relative;
  }
  
  &.absolute {
    position: absolute;
  }
  
  &.fixed {
    position: fixed;
  }
  
  &.sticky {
    position: sticky;
  }
}

// Ellipsis with custom display
.breadcrumb-ellipsis {
  &.block {
    display: block;
  }
  
  &.inline-block {
    display: inline-block;
  }
  
  &.inline {
    display: inline;
  }
  
  &.flex {
    display: flex;
  }
  
  &.inline-flex {
    display: inline-flex;
  }
  
  &.grid {
    display: grid;
  }
  
  &.inline-grid {
    display: inline-grid;
  }
  
  &.hidden {
    display: none;
  }
}
</style>
