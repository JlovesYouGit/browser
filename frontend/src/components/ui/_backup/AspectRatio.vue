<template>
  <AspectRatioRoot
    :data-slot="'aspect-ratio'"
    v-bind="$attrs"
  >
    <slot />
  </AspectRatioRoot>
</template>

<script setup lang="ts">
import { AspectRatio } from 'radix-vue'

// Component props interface
interface AspectRatioProps {
  ratio?: number | string
  asChild?: boolean
}

// Define props with default values
const props = withDefaults(defineProps<AspectRatioProps>(), {
  ratio: 1 / 1,
  asChild: false
})

// Use Radix Vue AspectRatio under the hood
const AspectRatioRoot = AspectRatio

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.aspect-ratio {
  // Base aspect ratio styles
  position: relative;
  width: 100%;
  
  // Ensure the container maintains aspect ratio
  &::before {
    content: '';
    display: block;
    padding-top: var(--aspect-ratio-padding-top, 100%);
    width: 0;
  }
  
  // Position content absolutely within the container
  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  // Common aspect ratios
  &.aspect-square {
    --aspect-ratio-padding-top: 100%;
  }
  
  &.aspect-video {
    --aspect-ratio-padding-top: 56.25%; // 16:9
  }
  
  &.aspect-4-3 {
    --aspect-ratio-padding-top: 75%;
  }
  
  &.aspect-3-2 {
    --aspect-ratio-padding-top: 66.666%;
  }
  
  &.aspect-1-1 {
    --aspect-ratio-padding-top: 100%;
  }
  
  &.aspect-9-16 {
    --aspect-ratio-padding-top: 177.777%;
  }
  
  &.aspect-21-9 {
    --aspect-ratio-padding-top: 42.857%;
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    > * {
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
    }
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for aspect ratio
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Aspect ratio doesn't change with theme
  }
  
  // Print styles
  @media print {
    // Ensure aspect ratio is maintained in print
    break-inside: avoid;
    
    > * {
      max-width: 100%;
      height: auto;
    }
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    // Ensure aspect ratio works on mobile
    max-width: 100%;
    overflow: hidden;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    // Prevent overflow on very small screens
    overflow: hidden;
    
    > * {
      min-width: 100%;
      min-height: 100%;
    }
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Container variants
  &.contain {
    > * {
      object-fit: contain;
    }
  }
  
  &.cover {
    > * {
      object-fit: cover;
    }
  }
  
  &.fill {
    > * {
      object-fit: fill;
    }
  }
  
  &.none {
    > * {
      object-fit: none;
    }
  }
  
  &.scale-down {
    > * {
      object-fit: scale-down;
    }
  }
  
  // Loading states
  &.loading {
    > * {
      opacity: 0.7;
      filter: blur(2px);
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2rem;
      height: 2rem;
      margin: -1rem 0 0 -1rem;
      border: 2px solid var(--color-primary);
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      z-index: 1;
    }
  }
  
  // Error states
  &.error {
    background-color: var(--color-destructive);
    
    > * {
      opacity: 0.5;
      filter: grayscale(100%);
    }
    
    &::before {
      content: '⚠️';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
      z-index: 1;
    }
  }
  
  // Placeholder states
  &.placeholder {
    background-color: var(--color-muted);
    border: 2px dashed var(--color-border);
    
    &::before {
      content: attr(data-placeholder);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--color-muted-foreground);
      font-size: 0.875rem;
      font-weight: 500;
      text-align: center;
      z-index: 1;
    }
  }
  
  // Rounded variants
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
  
  // Performance optimizations
  // Hardware acceleration for smooth transitions
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  
  // Optimize for animations
  will-change: auto;
  
  // Contain layout for performance
  contain: layout style paint;
  
  // Optimize child elements
  > * {
    // Hardware acceleration for images and videos
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    
    // Optimize for animations
    will-change: auto;
  }
}

// Loading animation
@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

// Responsive aspect ratios
@media (max-width: 640px) {
  .aspect-ratio {
    // Mobile-specific aspect ratios
    &.aspect-mobile-video {
      --aspect-ratio-padding-top: 56.25%;
    }
    
    &.aspect-mobile-square {
      --aspect-ratio-padding-top: 100%;
    }
    
    // Adjust for mobile screens
    &.aspect-16-9-mobile {
      --aspect-ratio-padding-top: 56.25%;
    }
  }
}

@media (max-width: 480px) {
  .aspect-ratio {
    // Small mobile adjustments
    &.aspect-small-video {
      --aspect-ratio-padding-top: 75%; // 4:3 for small screens
    }
  }
}

// RTL support
.aspect-ratio {
  [dir="rtl"] & {
    // Aspect ratio is direction-agnostic
  }
}

// Accessibility enhancements
.aspect-ratio {
  // Ensure proper color contrast for borders
  &.border {
    border-color: var(--color-border);
  }
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    &.border {
      border-color: #000;
      border-width: 2px;
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

// Animation support
.aspect-ratio {
  &.fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  &.slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }
  
  &.zoom-in {
    animation: zoomIn 0.3s ease-out forwards;
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

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .aspect-ratio {
    &.fade-in,
    &.slide-in,
    &.zoom-in {
      animation: none;
    }
  }
}

// Hover effects
.aspect-ratio {
  &.hover-zoom {
    > * {
      transition: transform 0.3s ease;
    }
    
    &:hover > * {
      transform: scale(1.05);
    }
  }
  
  &.hover-shadow {
    transition: box-shadow 0.3s ease;
    
    &:hover {
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    }
  }
}

// Focus effects
.aspect-ratio {
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

// Custom aspect ratios from props
.aspect-ratio {
  // Dynamic aspect ratio support
  &[data-ratio] {
    --aspect-ratio-padding-top: calc(100% / attr(data-ratio));
  }
  
  // Common video formats
  &[data-ratio="16/9"] {
    --aspect-ratio-padding-top: 56.25%;
  }
  
  &[data-ratio="4/3"] {
    --aspect-ratio-padding-top: 75%;
  }
  
  &[data-ratio="3/2"] {
    --aspect-ratio-padding-top: 66.666%;
  }
  
  &[data-ratio="1/1"] {
    --aspect-ratio-padding-top: 100%;
  }
  
  &[data-ratio="9/16"] {
    --aspect-ratio-padding-top: 177.777%;
  }
  
  &[data-ratio="21/9"] {
    --aspect-ratio-padding-top: 42.857%;
  }
  
  // Instagram square
  &[data-ratio="1/1"] {
    --aspect-ratio-padding-top: 100%;
  }
  
  // Instagram portrait
  &[data-ratio="4/5"] {
    --aspect-ratio-padding-top: 125%;
  }
  
  // Facebook cover
  &[data-ratio="16/9"] {
    --aspect-ratio-padding-top: 56.25%;
  }
  
  // Twitter header
  &[data-ratio="3/1"] {
    --aspect-ratio-padding-top: 33.333%;
  }
  
  // YouTube video
  &[data-ratio="16/9"] {
    --aspect-ratio-padding-top: 56.25%;
  }
  
  // TikTok video
  &[data-ratio="9/16"] {
    --aspect-ratio-padding-top: 177.777%;
  }
}
</style>
