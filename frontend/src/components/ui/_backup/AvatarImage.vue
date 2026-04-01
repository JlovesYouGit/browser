<template>
  <AvatarImagePrimitive
    :data-slot="'avatar-image'"
    :class="imageClasses"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AvatarImage } from 'radix-vue'
import { cn } from '@/utils/cn'

// Component props interface
interface AvatarImageProps {
  class?: string
  src?: string
  alt?: string
  referrerPolicy?: 'no-referrer' | 'origin' | 'unsafe-url'
  loading?: 'lazy' | 'eager'
}

// Define props
const props = defineProps<AvatarImageProps>()

// Use Radix Vue AvatarImage under the hood
const AvatarImagePrimitive = AvatarImage

// Computed classes
const imageClasses = computed(() => 
  cn("aspect-square size-full", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.avatar-image {
  // Base image styles
  aspect-ratio: 1 / 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for avatar image
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Image styling is theme-agnostic
  }
  
  // Print styles
  @media print {
    // Ensure image prints correctly
    max-width: 100%;
    height: auto;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    // Mobile-specific image optimizations
    image-rendering: auto;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    // Small mobile image optimizations
    image-rendering: auto;
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Object fit variants
  &.object-cover {
    object-fit: cover;
  }
  
  &.object-contain {
    object-fit: contain;
  }
  
  &.object-fill {
    object-fit: fill;
  }
  
  &.object-none {
    object-fit: none;
  }
  
  &.object-scale-down {
    object-fit: scale-down;
  }
  
  // Position variants
  &.object-center {
    object-position: center;
  }
  
  &.object-top {
    object-position: top;
  }
  
  &.object-bottom {
    object-position: bottom;
  }
  
  &.object-left {
    object-position: left;
  }
  
  &.object-right {
    object-position: right;
  }
  
  &.object-top-left {
    object-position: top left;
  }
  
  &.object-top-right {
    object-position: top right;
  }
  
  &.object-bottom-left {
    object-position: bottom left;
  }
  
  &.object-bottom-right {
    object-position: bottom right;
  }
  
  // Loading states
  &.loading {
    opacity: 0.7;
    filter: blur(2px);
  }
  
  // Error states
  &.error {
    opacity: 0.5;
    filter: grayscale(100%);
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
.avatar-image {
  &.fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  &.slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }
  
  &.zoom-in {
    animation: zoomIn 0.3s ease-out forwards;
  }
  
  &.rotate-in {
    animation: rotateIn 0.5s ease-out forwards;
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

@keyframes rotateIn {
  from {
    opacity: 0;
    transform: rotate(-180deg) scale(0.8);
  }
  to {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
}

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .avatar-image {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.rotate-in {
      animation: none;
    }
  }
}

// Hover effects
.avatar-image {
  &.hover-zoom {
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  &.hover-rotate {
    transition: transform 0.3s ease;
    
    &:hover {
      transform: rotate(5deg);
    }
  }
  
  &.hover-brighten {
    transition: filter 0.3s ease;
    
    &:hover {
      filter: brightness(1.1);
    }
  }
  
  &.hover-saturate {
    transition: filter 0.3s ease;
    
    &:hover {
      filter: saturate(1.2);
    }
  }
  
  &.hover-grayscale {
    transition: filter 0.3s ease;
    
    &:hover {
      filter: grayscale(0%);
    }
  }
}

// Focus effects
.avatar-image {
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

// Filter effects
.avatar-image {
  &.filter-grayscale {
    filter: grayscale(100%);
  }
  
  &.filter-sepia {
    filter: sepia(100%);
  }
  
  &.filter-blur {
    filter: blur(2px);
  }
  
  &.filter-brightness {
    filter: brightness(1.2);
  }
  
  &.filter-contrast {
    filter: contrast(1.2);
  }
  
  &.filter-hue-rotate {
    filter: hue-rotate(90deg);
  }
  
  &.filter-invert {
    filter: invert(100%);
  }
  
  &.filter-saturate {
    filter: saturate(2);
  }
  
  &.filter-darken {
    filter: brightness(0.8);
  }
  
  &.filter-lighten {
    filter: brightness(1.2);
  }
}

// Image quality optimizations
.avatar-image {
  // Lazy loading placeholder
  &[loading="lazy"] {
    // Lazy loading styles
  }
  
  // Eager loading
  &[loading="eager"] {
    // Eager loading styles
  }
  
  // Referrer policy
  &[referrerpolicy="no-referrer"] {
    // No referrer policy styles
  }
  
  &[referrerpolicy="origin"] {
    // Origin referrer policy styles
  }
  
  &[referrerpolicy="unsafe-url"] {
    // Unsafe URL referrer policy styles
  }
}

// Accessibility enhancements
.avatar-image {
  // Ensure proper alt text for screen readers
  &:not([alt]) {
    // Warn about missing alt text in development
  }
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    filter: contrast(1.2);
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
.avatar-image {
  [dir="rtl"] & {
    // Image is direction-agnostic
  }
}

// Print optimizations
@media print {
  .avatar-image {
    // Ensure images print correctly
    max-width: 100%;
    height: auto;
    page-break-inside: avoid;
    
    // Remove filters in print
    filter: none;
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
  }
}

// High DPI optimizations
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .avatar-image {
    // Crisp rendering on high DPI displays
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    
    // Enhance image quality
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .avatar-image {
    // Optimize for low bandwidth
    image-rendering: auto;
    
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .avatar-image {
    // Dark mode image adaptations
    filter: brightness(0.95);
  }
}

@media (prefers-color-scheme: light) {
  .avatar-image {
    // Light mode image adaptations
    filter: brightness(1.05);
  }
}

// Image loading states
.avatar-image {
  // Loading state
  &.is-loading {
    opacity: 0.5;
    filter: blur(1px);
  }
  
  // Loaded state
  &.is-loaded {
    opacity: 1;
    filter: none;
  }
  
  // Error state
  &.is-error {
    opacity: 0.3;
    filter: grayscale(100%);
  }
}

// Progressive enhancement
.avatar-image {
  // Fallback for unsupported features
  &:not(:defined) {
    display: none;
  }
  
  // Fallback image
  &.has-fallback {
    // Fallback image styles
  }
}

// Security considerations
.avatar-image {
  // Prevent XSS through image sources
  &[src^="javascript:"] {
    display: none;
  }
  
  &[src^="data:"] {
    // Allow data URLs but validate in production
  }
  
  // CSP compliance
  &[src^="http:"] {
    // External images should be allowed by CSP
  }
  
  &[src^="https:"] {
    // External images should be allowed by CSP
  }
}
</style>
