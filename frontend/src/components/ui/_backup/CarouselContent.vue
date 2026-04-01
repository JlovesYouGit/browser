<template>
  <div
    ref="carouselRef"
    class="overflow-hidden"
    data-slot="carousel-content"
  >
    <div
      :class="contentClasses"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'
import { useCarousel } from './CarouselContext'

// Component props interface
interface CarouselContentProps {
  class?: string
}

// Define props
const props = defineProps<CarouselContentProps>()

// Get carousel context
const { carouselRef, orientation } = useCarousel()

// Computed classes
const contentClasses = computed(() => 
  cn(
    "flex",
    orientation.value === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
    props.class
  )
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.carousel-content {
  // Base carousel content styles
  overflow: hidden;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // Reduce animations for carousel content
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Carousel content styling is theme-agnostic
  }
  
  // Print styles
  @media print {
    // Ensure carousel content prints correctly
    overflow: visible;
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    // Mobile-specific carousel content optimizations
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    // Small mobile carousel content optimizations
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
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
.carousel-content {
  &.fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  &.slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }
  
  &.zoom-in {
    animation: zoomIn 0.3s ease-out forwards;
  }
  
  &.bounce-in {
    animation: bounceIn 0.4s ease-out forwards;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
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

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .carousel-content {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in {
      animation: none;
    }
  }
}

// Hover effects
.carousel-content {
  &.hover-lift {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  &.hover-grow {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.01);
    }
  }
}

// Focus effects
.carousel-content {
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

// Loading state
.carousel-content {
  &.loading {
    opacity: 0.7;
    
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
    }
  }
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

// Error state
.carousel-content {
  &.error {
    border-color: var(--color-destructive);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-destructive) 10%, transparent);
    }
  }
}

// Success state
.carousel-content {
  &.success {
    border-color: var(--color-chart-2);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-2) 10%, transparent);
    }
  }
}

// Accessibility enhancements
.carousel-content {
  // Ensure proper color contrast
  color: inherit;
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    border: 2px solid currentColor;
    
    &.rounded {
      border-radius: 0;
    }
  }
}

// RTL support
.carousel-content {
  [dir="rtl"] & {
    // RTL specific adjustments for carousel content
    direction: rtl;
  }
}

// Print optimizations
@media print {
  .carousel-content {
    // Ensure carousel content prints correctly
    overflow: visible;
    
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
  .carousel-content {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .carousel-content {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .carousel-content {
    // Dark mode carousel content adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .carousel-content {
    // Light mode carousel content adaptations are handled by CSS variables
  }
}

// Carousel content with custom spacing
.carousel-content {
  &.spacing-tight {
    // Tight spacing for carousel content
  }
  
  &.spacing-normal {
    // Normal spacing for carousel content
  }
  
  &.spacing-loose {
    // Loose spacing for carousel content
  }
}

// Carousel content with custom alignment
.carousel-content {
  &.align-start {
    // Align to start
  }
  
  &.align-center {
    // Align to center
  }
  
  &.align-end {
    // Align to end
  }
}

// Carousel content with custom gap
.carousel-content {
  &.gap-none {
    gap: 0;
  }
  
  &.gap-xs {
    gap: 0.25rem;
  }
  
  &.gap-sm {
    gap: 0.5rem;
  }
  
  &.gap-md {
    gap: 0.75rem;
  }
  
  &.gap-lg {
    gap: 1rem;
  }
  
  &.gap-xl {
    gap: 1.5rem;
  }
  
  &.gap-2xl {
    gap: 2rem;
  }
}

// Carousel content with custom padding
.carousel-content {
  &.padding-none {
    padding: 0;
  }
  
  &.padding-xs {
    padding: 0.25rem;
  }
  
  &.padding-sm {
    padding: 0.5rem;
  }
  
  &.padding-md {
    padding: 0.75rem;
  }
  
  &.padding-lg {
    padding: 1rem;
  }
  
  &.padding-xl {
    padding: 1.25rem;
  }
  
  &.padding-2xl {
    padding: 1.5rem;
  }
}

// Carousel content with custom background
.carousel-content {
  &.bg-transparent {
    background-color: transparent;
  }
  
  &.bg-muted {
    background-color: var(--color-muted);
  }
  
  &.bg-accent {
    background-color: var(--color-accent);
  }
  
  &.bg-primary {
    background-color: var(--color-primary);
    color: var(--color-primary-foreground);
  }
  
  &.bg-secondary {
    background-color: var(--color-secondary);
    color: var(--color-secondary-foreground);
  }
}

// Carousel content with custom border
.carousel-content {
  &.border-none {
    border: none;
  }
  
  &.border {
    border: 1px solid var(--color-border);
  }
  
  &.border-2 {
    border: 2px solid var(--color-border);
  }
  
  &.border-t {
    border-top: 1px solid var(--color-border);
  }
  
  &.border-b {
    border-bottom: 1px solid var(--color-border);
  }
}

// Carousel content with custom border radius
.carousel-content {
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
}

// Carousel content with custom shadow
.carousel-content {
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
}

// Carousel content with custom height
.carousel-content {
  &.height-auto {
    height: auto;
  }
  
  &.height-full {
    height: 100%;
  }
  
  &.height-screen {
    height: 100vh;
  }
  
  &.height-400 {
    height: 25rem;
  }
  
  &.height-500 {
    height: 31.25rem;
  }
  
  &.height-600 {
    height: 37.5rem;
  }
}

// Carousel content with custom width
.carousel-content {
  &.width-auto {
    width: auto;
  }
  
  &.width-full {
    width: 100%;
  }
  
  &.width-screen {
    width: 100vw;
  }
  
  &.width-400 {
    width: 25rem;
  }
  
  &.width-500 {
    width: 31.25rem;
  }
  
  &.width-600 {
    width: 37.5rem;
  }
}

// Carousel content with custom overflow
.carousel-content {
  &.overflow-visible {
    overflow: visible;
  }
  
  &.overflow-hidden {
    overflow: hidden;
  }
  
  &.overflow-scroll {
    overflow: scroll;
  }
  
  &.overflow-auto {
    overflow: auto;
  }
  
  &.overflow-x-auto {
    overflow-x: auto;
    overflow-y: hidden;
  }
  
  &.overflow-y-auto {
    overflow-x: hidden;
    overflow-y: auto;
  }
  
  &.overflow-x-scroll {
    overflow-x: scroll;
    overflow-y: hidden;
  }
  
  &.overflow-y-scroll {
    overflow-x: hidden;
    overflow-y: scroll;
  }
}

// Carousel content with custom flex direction
.carousel-content {
  &.flex-row {
    flex-direction: row;
  }
  
  &.flex-row-reverse {
    flex-direction: row-reverse;
  }
  
  &.flex-col {
    flex-direction: column;
  }
  
  &.flex-col-reverse {
    flex-direction: column-reverse;
  }
}

// Carousel content with custom flex wrap
.carousel-content {
  &.flex-wrap {
    flex-wrap: wrap;
  }
  
  &.flex-wrap-reverse {
    flex-wrap: wrap-reverse;
  }
  
  &.flex-nowrap {
    flex-wrap: nowrap;
  }
}

// Carousel content with custom flex alignment
.carousel-content {
  &.items-start {
    align-items: flex-start;
  }
  
  &.items-center {
    align-items: center;
  }
  
  &.items-end {
    align-items: flex-end;
  }
  
  &.items-stretch {
    align-items: stretch;
  }
  
  &.items-baseline {
    align-items: baseline;
  }
  
  &.justify-start {
    justify-content: flex-start;
  }
  
  &.justify-center {
    justify-content: center;
  }
  
  &.justify-end {
    justify-content: flex-end;
  }
  
  &.justify-between {
    justify-content: space-between;
  }
  
  &.justify-around {
    justify-content: space-around;
  }
  
  &.justify-evenly {
    justify-content: space-evenly;
  }
}

// Carousel content with custom scroll behavior
.carousel-content {
  &.scroll-smooth {
    scroll-behavior: smooth;
  }
  
  &.scroll-auto {
    scroll-behavior: auto;
  }
}

// Carousel content with custom snap behavior
.carousel-content {
  &.snap-none {
    scroll-snap-type: none;
  }
  
  &.snap-x {
    scroll-snap-type: x mandatory;
  }
  
  &.snap-y {
    scroll-snap-type: y mandatory;
  }
  
  &.snap-both {
    scroll-snap-type: both mandatory;
  }
  
  &.snap-mandatory {
    scroll-snap-type: mandatory;
  }
  
  &.snap-proximity {
    scroll-snap-type: proximity;
  }
}
</style>
