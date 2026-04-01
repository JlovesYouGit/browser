<template>
  <component
    :is="component"
    data-slot="button"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Slot } from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

// Component props interface
interface ButtonProps {
  class?: string
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  asChild?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

// Define props with default values
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'default',
  asChild: false,
  disabled: false,
  type: 'button'
})

// Use Slot component when asChild is true, otherwise use button
const component = computed(() => props.asChild ? Slot : 'button')

// Computed classes
const buttonClasses = computed(() => 
  cn(buttonVariants({ variant: props.variant, size: props.size, class: props.class }))
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.button {
  // Base button styles are handled by CVA variants
  
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
    // Dark mode button adaptations are handled by CSS variables
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
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    // Mobile-specific button optimizations
    min-height: 2.5rem;
    
    &.size-sm {
      min-height: 2rem;
    }
    
    &.size-lg {
      min-height: 2.5rem;
    }
    
    &.size-icon {
      min-height: 2.25rem;
      min-width: 2.25rem;
    }
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    &.size-sm {
      min-height: 1.875rem;
    }
    
    &.size-lg {
      min-height: 2.25rem;
    }
    
    &.size-icon {
      min-height: 2rem;
      min-width: 2rem;
    }
  }
  
  // Focus management
  &:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Icon handling
  > svg:not([class*='size-']) {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    pointer-events: none;
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

// Variant-specific styles
.button {
  // Default variant
  &.variant-default {
    background-color: var(--color-primary);
    color: var(--color-primary-foreground);
    
    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--color-primary) 90%, transparent);
    }
    
    &:active:not(:disabled) {
      background-color: color-mix(in srgb, var(--color-primary) 80%, transparent);
    }
  }
  
  // Destructive variant
  &.variant-destructive {
    background-color: var(--color-destructive);
    color: white;
    
    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--color-destructive) 90%, transparent);
    }
    
    &:active:not(:disabled) {
      background-color: color-mix(in srgb, var(--color-destructive) 80%, transparent);
    }
    
    &:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 20%, transparent);
    }
  }
  
  // Outline variant
  &.variant-outline {
    border: 1px solid var(--color-border);
    background-color: var(--color-background);
    color: var(--color-foreground);
    
    &:hover:not(:disabled) {
      background-color: var(--color-accent);
      color: var(--color-accent-foreground);
    }
  }
  
  // Secondary variant
  &.variant-secondary {
    background-color: var(--color-secondary);
    color: var(--color-secondary-foreground);
    
    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--color-secondary) 80%, transparent);
    }
  }
  
  // Ghost variant
  &.variant-ghost {
    background-color: transparent;
    color: var(--color-foreground);
    
    &:hover:not(:disabled) {
      background-color: var(--color-accent);
      color: var(--color-accent-foreground);
    }
  }
  
  // Link variant
  &.variant-link {
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 4px;
    background-color: transparent;
    
    &:hover:not(:disabled) {
      text-decoration: none;
    }
  }
}

// Size-specific styles
.button {
  // Default size
  &.size-default {
    height: 2.25rem;
    padding: 0.5rem 1rem;
    
    &:has(> svg) {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }
  }
  
  // Small size
  &.size-sm {
    height: 2rem;
    padding: 0.375rem 0.75rem;
    gap: 0.375rem;
    border-radius: 0.375rem;
    
    &:has(> svg) {
      padding-left: 0.625rem;
      padding-right: 0.625rem;
    }
  }
  
  // Large size
  &.size-lg {
    height: 2.5rem;
    padding: 0.625rem 1.5rem;
    border-radius: 0.375rem;
    
    &:has(> svg) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
  
  // Icon size
  &.size-icon {
    width: 2.25rem;
    height: 2.25rem;
    padding: 0;
    border-radius: 0.375rem;
  }
}

// Animation support
.button {
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
    opacity: 0.8;
  }
}

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .button {
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
.button {
  &.hover-lift {
    transition: transform 0.2s ease;
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
    }
  }
  
  &.hover-grow {
    transition: transform 0.2s ease;
    
    &:hover:not(:disabled) {
      transform: scale(1.05);
    }
  }
  
  &.hover-shrink {
    transition: transform 0.2s ease;
    
    &:hover:not(:disabled) {
      transform: scale(0.95);
    }
  }
  
  &.hover-rotate {
    transition: transform 0.2s ease;
    
    &:hover:not(:disabled) {
      transform: rotate(5deg);
    }
  }
  
  &.hover-brighten {
    transition: filter 0.2s ease;
    
    &:hover:not(:disabled) {
      filter: brightness(1.1);
    }
  }
  
  &.hover-saturate {
    transition: filter 0.2s ease;
    
    &:hover:not(:disabled) {
      filter: saturate(1.2);
    }
  }
}

// Focus effects
.button {
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

// Active state
.button {
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
}

// Loading state
.button {
  &.loading {
    pointer-events: none;
    opacity: 0.7;
    
    > *:not(.loading-spinner) {
      opacity: 0;
    }
    
    .loading-spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1rem;
      height: 1rem;
      margin: -0.5rem 0 0 -0.5rem;
      border: 2px solid currentColor;
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

// Error state
.button {
  &.error {
    border-color: var(--color-destructive);
    background-color: color-mix(in srgb, var(--color-destructive) 10%, transparent);
    color: var(--color-destructive);
    
    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--color-destructive) 20%, transparent);
    }
  }
}

// Success state
.button {
  &.success {
    border-color: var(--color-chart-2);
    background-color: color-mix(in srgb, var(--color-chart-2) 10%, transparent);
    color: var(--color-chart-2);
    
    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--color-chart-2) 20%, transparent);
    }
  }
}

// Warning state
.button {
  &.warning {
    border-color: var(--color-chart-1);
    background-color: color-mix(in srgb, var(--color-chart-1) 10%, transparent);
    color: var(--color-chart-1);
    
    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--color-chart-1) 20%, transparent);
    }
  }
}

// Accessibility enhancements
.button {
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
  
  // Skip link
  &.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--color-primary);
    color: var(--color-primary-foreground);
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    
    &:focus {
      top: 6px;
    }
  }
}

// RTL support
.button {
  [dir="rtl"] & {
    // RTL specific adjustments
    // Button is generally direction-agnostic
  }
}

// Print optimizations
@media print {
  .button {
    // Ensure button prints correctly
    border: 1px solid #000;
    background: white;
    color: #000;
    
    &.variant-destructive {
      background: #d00;
      color: white;
    }
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
    
    // Ensure proper print layout
    break-inside: avoid;
  }
}

// High DPI optimizations
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .button {
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
  .button {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .button {
    // Dark mode button adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .button {
    // Light mode button adaptations are handled by CSS variables
  }
}

// Button groups
.button-group {
  display: inline-flex;
  align-items: center;
  
  .button {
    border-radius: 0;
    
    &:first-child {
      border-top-left-radius: 0.375rem;
      border-bottom-left-radius: 0.375rem;
    }
    
    &:last-child {
      border-top-right-radius: 0.375rem;
      border-bottom-right-radius: 0.375rem;
    }
    
    &:not(:first-child):not(:last-child) {
      border-radius: 0;
    }
    
    &:not(:last-child) {
      border-right: none;
    }
  }
}

// Button with icon
.button {
  &.icon-only {
    padding: 0;
    width: 2.25rem;
    height: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.size-sm {
      width: 2rem;
      height: 2rem;
    }
    
    &.size-lg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
  
  &.icon-left {
    > svg:first-child {
      margin-right: 0.5rem;
    }
  }
  
  &.icon-right {
    > svg:last-child {
      margin-left: 0.5rem;
    }
  }
}

// Button with badge
.button {
  &.with-badge {
    position: relative;
    
    .badge {
      position: absolute;
      top: -0.25rem;
      right: -0.25rem;
      background-color: var(--color-destructive);
      color: white;
      font-size: 0.625rem;
      font-weight: 600;
      padding: 0.125rem 0.375rem;
      border-radius: 9999px;
      min-width: 1rem;
      text-align: center;
    }
  }
}

// Button with tooltip
.button {
  &[data-tooltip] {
    position: relative;
    
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

// Button with dropdown
.button {
  &.dropdown {
    position: relative;
    
    &::after {
      content: '▼';
      margin-left: 0.5rem;
      font-size: 0.75rem;
      opacity: 0.7;
    }
  }
}

// Button with progress
.button {
  &.with-progress {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: color-mix(in srgb, currentColor 20%, transparent);
      border-radius: 1px;
    }
    
    &[data-progress] {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background-color: currentColor;
        border-radius: 1px;
        width: attr(data-progress);
      }
    }
  }
}

// Full width button
.button {
  &.full-width {
    width: 100%;
  }
}

// Block button
.button {
  &.block {
    display: block;
    width: 100%;
  }
}

// Rounded button variants
.button {
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
}

// Custom button sizes
.button {
  &.size-xs {
    height: 1.5rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    
    &:has(> svg) {
      padding-left: 0.375rem;
      padding-right: 0.375rem;
    }
  }
  
  &.size-2xl {
    height: 3rem;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    
    &:has(> svg) {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }
  
  &.size-3xl {
    height: 3.5rem;
    padding: 1rem 2.5rem;
    font-size: 1.125rem;
    
    &:has(> svg) {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
}

// Button with custom spacing
.button {
  &.spacing-tight {
    gap: 0.25rem;
    
    &:has(> svg) {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }
  
  &.spacing-normal {
    gap: 0.5rem;
    
    &:has(> svg) {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }
  }
  
  &.spacing-loose {
    gap: 0.75rem;
    
    &:has(> svg) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
}

// Button with custom font weights
.button {
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
}

// Button with custom text transforms
.button {
  &.uppercase {
    text-transform: uppercase;
  }
  
  &.lowercase {
    text-transform: lowercase;
  }
  
  &.capitalize {
    text-transform: capitalize;
  }
}

// Button with custom letter spacing
.button {
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
}
</style>
