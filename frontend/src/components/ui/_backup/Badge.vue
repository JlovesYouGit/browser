<template>
  <component
    :is="component"
    data-slot="badge"
    :class="badgeClasses"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Slot } from 'radix-vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

// Component props interface
interface BadgeProps {
  class?: string
  variant?: VariantProps<typeof badgeVariants>['variant']
  asChild?: boolean
}

// Define props with default values
const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  asChild: false
})

// Use Slot component when asChild is true, otherwise use span
const component = computed(() => props.asChild ? Slot : 'span')

// Computed classes
const badgeClasses = computed(() => 
  cn(badgeVariants({ variant: props.variant }), props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.badge {
  // Base badge styles
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  border: 1px solid;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  width: fit-content;
  white-space: nowrap;
  flex-shrink: 0;
  gap: 0.25rem;
  overflow: hidden;
  transition: color 0.2s ease, box-shadow 0.2s ease;
  
  // Icon styling
  > svg {
    width: 0.75rem;
    height: 0.75rem;
    pointer-events: none;
  }
  
  // Focus styles
  &:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Invalid state
  &[aria-invalid="true"] {
    --ring-color: var(--color-destructive);
    outline-color: var(--color-destructive);
    border-color: var(--color-destructive);
    
    &:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 20%, transparent);
    }
  }
  
  // Default variant
  &.variant-default {
    border-color: transparent;
    background-color: var(--color-primary);
    color: var(--color-primary-foreground);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-primary) 90%, transparent);
    }
  }
  
  // Secondary variant
  &.variant-secondary {
    border-color: transparent;
    background-color: var(--color-secondary);
    color: var(--color-secondary-foreground);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-secondary) 90%, transparent);
    }
  }
  
  // Destructive variant
  &.variant-destructive {
    border-color: transparent;
    background-color: var(--color-destructive);
    color: white;
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-destructive) 90%, transparent);
    }
    
    &:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 20%, transparent);
    }
  }
  
  // Outline variant
  &.variant-outline {
    color: var(--color-foreground);
    border-color: var(--color-border);
    
    &:hover {
      background-color: var(--color-accent);
      color: var(--color-accent-foreground);
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
    transition: none;
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    &.variant-destructive {
      background-color: color-mix(in srgb, var(--color-destructive) 60%, transparent);
    }
    
    &[aria-invalid="true"] {
      &:focus-visible {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 40%, transparent);
      }
    }
  }
  
  // Print styles
  @media print {
    border: 1px solid #000;
    background: white;
    color: #000;
    
    &.variant-destructive {
      background: #d00;
      color: white;
    }
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    padding: 0.125rem 0.375rem;
    font-size: 0.6875rem;
    
    > svg {
      width: 0.625rem;
      height: 0.625rem;
    }
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    padding: 0.0625rem 0.25rem;
    font-size: 0.625rem;
    
    > svg {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
  
  // Size variants
  &.size-xs {
    padding: 0.0625rem 0.25rem;
    font-size: 0.625rem;
    
    > svg {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
  
  &.size-sm {
    padding: 0.125rem 0.375rem;
    font-size: 0.6875rem;
    
    > svg {
      width: 0.625rem;
      height: 0.625rem;
    }
  }
  
  &.size-md {
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
    
    > svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
  
  &.size-lg {
    padding: 0.1875rem 0.625rem;
    font-size: 0.8125rem;
    
    > svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
  
  &.size-xl {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
    
    > svg {
      width: 1rem;
      height: 1rem;
    }
  }
  
  // Border radius variants
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
    border-radius: 9999px;
  }
  
  // Font weight variants
  &.font-thin {
    font-weight: 100;
  }
  
  &.font-light {
    font-weight: 300;
  }
  
  &.font-normal {
    font-weight: 400;
  }
  
  &.font-medium {
    font-weight: 500;
  }
  
  &.font-semibold {
    font-weight: 600;
  }
  
  &.font-bold {
    font-weight: 700;
  }
  
  &.font-extrabold {
    font-weight: 800;
  }
  
  &.font-black {
    font-weight: 900;
  }
  
  // Text transform variants
  &.uppercase {
    text-transform: uppercase;
  }
  
  &.lowercase {
    text-transform: lowercase;
  }
  
  &.capitalize {
    text-transform: capitalize;
  }
  
  // Letter spacing variants
  &.tracking-tighter {
    letter-spacing: -0.05em;
  }
  
  &.tracking-tight {
    letter-spacing: -0.025em;
  }
  
  &.tracking-normal {
    letter-spacing: 0;
  }
  
  &.tracking-wide {
    letter-spacing: 0.025em;
  }
  
  &.tracking-wider {
    letter-spacing: 0.05em;
  }
  
  &.tracking-widest {
    letter-spacing: 0.1em;
  }
  
  // Additional color variants
  &.color-success {
    border-color: transparent;
    background-color: var(--color-chart-2);
    color: white;
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-2) 90%, transparent);
    }
  }
  
  &.color-warning {
    border-color: transparent;
    background-color: var(--color-chart-1);
    color: white;
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-1) 90%, transparent);
    }
  }
  
  &.color-info {
    border-color: transparent;
    background-color: var(--color-chart-4);
    color: white;
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-4) 90%, transparent);
    }
  }
  
  // Outline color variants
  &.outline-success {
    color: var(--color-chart-2);
    border-color: var(--color-chart-2);
    
    &:hover {
      background-color: var(--color-chart-2);
      color: white;
    }
  }
  
  &.outline-warning {
    color: var(--color-chart-1);
    border-color: var(--color-chart-1);
    
    &:hover {
      background-color: var(--color-chart-1);
      color: white;
    }
  }
  
  &.outline-info {
    color: var(--color-chart-4);
    border-color: var(--color-chart-4);
    
    &:hover {
      background-color: var(--color-chart-4);
      color: white;
    }
  }
  
  // Ghost variants
  &.ghost {
    border-color: transparent;
    background-color: transparent;
    color: var(--color-foreground);
    
    &:hover {
      background-color: var(--color-accent);
      color: var(--color-accent-foreground);
    }
  }
  
  &.ghost-success {
    border-color: transparent;
    background-color: transparent;
    color: var(--color-chart-2);
    
    &:hover {
      background-color: var(--color-chart-2);
      color: white;
    }
  }
  
  &.ghost-warning {
    border-color: transparent;
    background-color: transparent;
    color: var(--color-chart-1);
    
    &:hover {
      background-color: var(--color-chart-1);
      color: white;
    }
  }
  
  &.ghost-info {
    border-color: transparent;
    background-color: transparent;
    color: var(--color-chart-4);
    
    &:hover {
      background-color: var(--color-chart-4);
      color: white;
    }
  }
  
  // Link badge variant
  &.link {
    border-color: transparent;
    background-color: transparent;
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 2px;
    
    &:hover {
      color: var(--color-primary);
      text-decoration: none;
      background-color: var(--color-primary/10);
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

// Animation support
.badge {
  &.fade-in {
    animation: fadeIn 0.2s ease-out forwards;
  }
  
  &.slide-in {
    animation: slideIn 0.2s ease-out forwards;
  }
  
  &.zoom-in {
    animation: zoomIn 0.2s ease-out forwards;
  }
  
  &.bounce-in {
    animation: bounceIn 0.3s ease-out forwards;
  }
  
  &.pulse {
    animation: pulse 2s ease-in-out infinite;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .badge {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in,
    &.pulse {
      animation: none;
    }
  }
}

// Hover effects
.badge {
  &.hover-lift {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  &.hover-grow {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  &.hover-shrink {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(0.95);
    }
  }
  
  &.hover-rotate {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: rotate(5deg);
    }
  }
}

// Focus effects
.badge {
  &.focus-ring {
    &:focus-visible {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }
  }
  
  &.focus-inset {
    &:focus-visible {
      outline: 2px solid var(--color-ring);
      outline-offset: -2px;
    }
  }
}

// Loading states
.badge {
  &.loading {
    opacity: 0.7;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0.75rem;
      height: 0.75rem;
      margin: -0.375rem 0 0 -0.375rem;
      border: 1px solid currentColor;
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

// Accessibility enhancements
.badge {
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
    
    &.rounded {
      border-radius: 0;
    }
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
.badge {
  [dir="rtl"] & {
    // Badge is direction-agnostic
  }
}

// Print optimizations
@media print {
  .badge {
    // Ensure badge prints correctly
    border: 1px solid #000;
    background: white;
    color: #000;
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
  }
}

// High DPI optimizations
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .badge {
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
  .badge {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
    
    // Simplify backgrounds
    background-image: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .badge {
    // Dark mode badge adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .badge {
    // Light mode badge adaptations are handled by CSS variables
  }
}

// Badge groups
.badge-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  
  .badge {
    // Individual badge styles
  }
}

// Badge with counter
.badge-counter {
  position: relative;
  
  .badge {
    // Counter badge styles
  }
}

// Badge with tooltip
.badge-tooltip {
  position: relative;
  cursor: help;
  
  &[data-tooltip] {
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

// Badge with dismiss button
.badge-dismissible {
  position: relative;
  padding-right: 1.5rem;
  
  .dismiss-button {
    position: absolute;
    top: 50%;
    right: 0.25rem;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 0.125rem;
    cursor: pointer;
    color: currentColor;
    opacity: 0.7;
    border-radius: 0.125rem;
    
    &:hover {
      opacity: 1;
      background-color: color-mix(in srgb, currentColor 10%, transparent);
    }
    
    &:focus {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }
  }
}

// Badge with icon
.badge-with-icon {
  // Icon styles are handled by the base badge styles
}

// Badge with avatar
.badge-with-avatar {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  .avatar {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  
  .badge {
    // Badge styles
  }
}

// Badge with progress
.badge-progress {
  position: relative;
  overflow: visible;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: currentColor;
    opacity: 0.3;
    border-radius: 1px;
  }
  
  &[data-progress] {
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      height: 2px;
      background-color: currentColor;
      border-radius: 1px;
      width: attr(data-progress);
    }
  }
}
</style>
