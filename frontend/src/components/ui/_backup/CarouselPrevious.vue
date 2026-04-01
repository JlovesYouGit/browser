<template>
  <Button
    data-slot="carousel-previous"
    :variant="variant"
    :size="size"
    :class="buttonClasses"
    :disabled="!canScrollPrev"
    @click="scrollPrev"
    v-bind="$attrs"
  >
    <ArrowLeftIcon />
    <span class="sr-only">Previous slide</span>
    <slot />
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import { cn } from '@/utils/cn'
import { useCarousel } from './CarouselContext'
import Button from '@/components/ui/Button.vue'

// Component props interface
interface CarouselPreviousProps {
  class?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

// Define props with default values
const props = withDefaults(defineProps<CarouselPreviousProps>(), {
  variant: 'outline',
  size: 'icon'
})

// Get carousel context
const { orientation, scrollPrev, canScrollPrev } = useCarousel()

// Use ArrowLeft icon
const ArrowLeftIcon = ArrowLeft

// Computed classes
const buttonClasses = computed(() => 
  cn(
    "absolute size-8 rounded-full",
    orientation.value === "horizontal"
      ? "top-1/2 -left-12 -translate-y-1/2"
      : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
    props.class
  )
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.carousel-previous {
  // Base carousel previous button styles
  position: absolute;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // Reduce animations for carousel previous button
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Carousel previous button styling is theme-agnostic
  }
  
  // Print styles
  @media print {
    // Hide carousel previous button in print
    display: none;
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    // Mobile-specific carousel previous button optimizations
    width: 1.75rem;
    height: 1.75rem;
    
    &.horizontal {
      left: -1rem;
    }
    
    &.vertical {
      top: -1rem;
    }
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    // Small mobile carousel previous button optimizations
    width: 1.5rem;
    height: 1.5rem;
    
    &.horizontal {
      left: -0.75rem;
    }
    
    &.vertical {
      top: -0.75rem;
    }
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Positioning based on orientation
  &.horizontal {
    top: 50%;
    left: -3rem;
    transform: translateY(-50%);
  }
  
  &.vertical {
    top: -3rem;
    left: 50%;
    transform: translateX(-50%) rotate(90deg);
  }
  
  // Size variants
  &.size-xs {
    width: 1.5rem;
    height: 1.5rem;
    
    &.horizontal {
      left: -2rem;
    }
    
    &.vertical {
      top: -2rem;
    }
  }
  
  &.size-sm {
    width: 1.75rem;
    height: 1.75rem;
    
    &.horizontal {
      left: -2.5rem;
    }
    
    &.vertical {
      top: -2.5rem;
    }
  }
  
  &.size-md {
    width: 2rem;
    height: 2rem;
    
    &.horizontal {
      left: -3rem;
    }
    
    &.vertical {
      top: -3rem;
    }
  }
  
  &.size-lg {
    width: 2.5rem;
    height: 2.5rem;
    
    &.horizontal {
      left: -3.5rem;
    }
    
    &.vertical {
      top: -3.5rem;
    }
  }
  
  &.size-xl {
    width: 3rem;
    height: 3rem;
    
    &.horizontal {
      left: -4rem;
    }
    
    &.vertical {
      top: -4rem;
    }
  }
  
  // Position variants
  &.position-inside {
    &.horizontal {
      left: 0.5rem;
    }
    
    &.vertical {
      top: 0.5rem;
    }
  }
  
  &.position-outside {
    &.horizontal {
      left: -3rem;
    }
    
    &.vertical {
      top: -3rem;
    }
  }
  
  &.position-far {
    &.horizontal {
      left: -4rem;
    }
    
    &.vertical {
      top: -4rem;
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
.carousel-previous {
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
  .carousel-previous {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in {
      animation: none;
    }
  }
}

// Hover effects
.carousel-previous {
  &.hover-lift {
    transition: transform 0.2s ease;
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
    }
  }
  
  &.hover-grow {
    transition: transform 0.2s ease;
    
    &:hover:not(:disabled) {
      transform: scale(1.1);
    }
  }
  
  &.hover-shrink {
    transition: transform 0.2s ease;
    
    &:hover:not(:disabled) {
      transform: scale(0.9);
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
      filter: saturate(1.1);
    }
  }
  
  &.hover-rotate {
    transition: transform 0.2s ease;
    
    &:hover:not(:disabled) {
      transform: rotate(-10deg);
    }
  }
}

// Focus effects
.carousel-previous {
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
.carousel-previous {
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
}

// Disabled state
.carousel-previous {
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
    
    &:hover {
      transform: none;
      filter: none;
    }
  }
}

// Loading state
.carousel-previous {
  &.loading {
    opacity: 0.7;
    pointer-events: none;
    
    &::after {
      content: '';
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
.carousel-previous {
  &.error {
    border-color: var(--color-destructive);
    color: var(--color-destructive);
    
    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--color-destructive) 10%, transparent);
    }
  }
}

// Success state
.carousel-previous {
  &.success {
    border-color: var(--color-chart-2);
    color: var(--color-chart-2);
    
    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--color-chart-2) 10%, transparent);
    }
  }
}

// Warning state
.carousel-previous {
  &.warning {
    border-color: var(--color-chart-1);
    color: var(--color-chart-1);
    
    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--color-chart-1) 10%, transparent);
    }
  }
}

// Info state
.carousel-previous {
  &.info {
    border-color: var(--color-chart-4);
    color: var(--color-chart-4);
    
    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--color-chart-4) 10%, transparent);
    }
  }
}

// Accessibility enhancements
.carousel-previous {
  // Ensure proper color contrast
  color: var(--color-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    border: 2px solid currentColor;
    
    &.rounded {
      border-radius: 0;
    }
  }
  
  // Screen reader support
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
}

// RTL support
.carousel-previous {
  [dir="rtl"] & {
    &.horizontal {
      left: auto;
      right: -3rem;
    }
    
    &.vertical {
      transform: translateX(-50%) rotate(-90deg);
    }
  }
}

// Print optimizations
@media print {
  .carousel-previous {
    // Hide carousel previous button in print
    display: none;
    
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
  .carousel-previous {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .carousel-previous {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .carousel-previous {
    // Dark mode carousel previous button adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .carousel-previous {
    // Light mode carousel previous button adaptations are handled by CSS variables
  }
}

// Carousel previous with custom background
.carousel-previous {
  &.bg-transparent {
    background-color: transparent;
  }
  
  &.bg-muted {
    background-color: var(--color-muted);
    color: var(--color-muted-foreground);
  }
  
  &.bg-accent {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
  }
  
  &.bg-primary {
    background-color: var(--color-primary);
    color: var(--color-primary-foreground);
  }
  
  &.bg-secondary {
    background-color: var(--color-secondary);
    color: var(--color-secondary-foreground);
  }
  
  &.bg-success {
    background-color: var(--color-chart-2);
    color: white;
  }
  
  &.bg-warning {
    background-color: var(--color-chart-1);
    color: white;
  }
  
  &.bg-info {
    background-color: var(--color-chart-4);
    color: white;
  }
  
  &.bg-error {
    background-color: var(--color-destructive);
    color: var(--color-destructive-foreground);
  }
}

// Carousel previous with custom border
.carousel-previous {
  &.border-none {
    border: none;
  }
  
  &.border {
    border: 1px solid var(--color-border);
  }
  
  &.border-2 {
    border: 2px solid var(--color-border);
  }
  
  &.border-transparent {
    border: 1px solid transparent;
  }
}

// Carousel previous with custom shadow
.carousel-previous {
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
  
  &.shadow-inner {
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  }
}

// Carousel previous with custom opacity
.carousel-previous {
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

// Carousel previous with custom visibility
.carousel-previous {
  &.visible {
    visibility: visible;
  }
  
  &.invisible {
    visibility: hidden;
  }
  
  &.collapse {
    visibility: collapse;
  }
}

// Carousel previous with custom transition
.carousel-previous {
  &.transition-none {
    transition: none;
  }
  
  &.transition-all {
    transition: all 0.15s ease-in-out;
  }
  
  &.transition-colors {
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  }
  
  &.transition-opacity {
    transition: opacity 0.15s ease-in-out;
  }
  
  &.transition-shadow {
    transition: box-shadow 0.15s ease-in-out;
  }
  
  &.transition-transform {
    transition: transform 0.15s ease-in-out;
  }
}

// Carousel previous with custom duration
.carousel-previous {
  &.duration-75 {
    transition-duration: 75ms;
  }
  
  &.duration-100 {
    transition-duration: 100ms;
  }
  
  &.duration-150 {
    transition-duration: 150ms;
  }
  
  &.duration-200 {
    transition-duration: 200ms;
  }
  
  &.duration-300 {
    transition-duration: 300ms;
  }
  
  &.duration-500 {
    transition-duration: 500ms;
  }
  
  &.duration-700 {
    transition-duration: 700ms;
  }
  
  &.duration-1000 {
    transition-duration: 1000ms;
  }
}

// Carousel previous with custom ease
.carousel-previous {
  &.ease-linear {
    transition-timing-function: linear;
  }
  
  &.ease-in {
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  }
  
  &.ease-out {
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  
  &.ease-in-out {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
}

// Carousel previous with custom delay
.carousel-previous {
  &.delay-75 {
    transition-delay: 75ms;
  }
  
  &.delay-100 {
    transition-delay: 100ms;
  }
  
  &.delay-150 {
    transition-delay: 150ms;
  }
  
  &.delay-200 {
    transition-delay: 200ms;
  }
  
  &.delay-300 {
    transition-delay: 300ms;
  }
  
  &.delay-500 {
    transition-delay: 500ms;
  }
  
  &.delay-700 {
    transition-delay: 700ms;
  }
  
  &.delay-1000 {
    transition-delay: 1000ms;
  }
}

// Carousel previous with custom transform
.carousel-previous {
  &.transform-none {
    transform: none;
  }
  
  &.scale-0 {
    transform: scale(0);
  }
  
  &.scale-50 {
    transform: scale(0.5);
  }
  
  &.scale-75 {
    transform: scale(0.75);
  }
  
  &.scale-90 {
    transform: scale(0.9);
  }
  
  &.scale-95 {
    transform: scale(0.95);
  }
  
  &.scale-100 {
    transform: scale(1);
  }
  
  &.scale-105 {
    transform: scale(1.05);
  }
  
  &.scale-110 {
    transform: scale(1.1);
  }
  
  &.scale-125 {
    transform: scale(1.25);
  }
  
  &.scale-150 {
    transform: scale(1.5);
  }
}

// Carousel previous with custom translate
.carousel-previous {
  &.translate-x-0 {
    transform: translateX(0);
  }
  
  &.translate-x-1 {
    transform: translateX(0.25rem);
  }
  
  &.translate-x-2 {
    transform: translateX(0.5rem);
  }
  
  &.translate-x-3 {
    transform: translateX(0.75rem);
  }
  
  &.translate-x-4 {
    transform: translateX(1rem);
  }
  
  &.translate-x-5 {
    transform: translateX(1.25rem);
  }
  
  &.translate-x-6 {
    transform: translateX(1.5rem);
  }
  
  &.translate-x-8 {
    transform: translateX(2rem);
  }
  
  &.translate-x-10 {
    transform: translateX(2.5rem);
  }
  
  &.translate-x-12 {
    transform: translateX(3rem);
  }
  
  &.translate-x-16 {
    transform: translateX(4rem);
  }
  
  &.translate-x-20 {
    transform: translateX(5rem);
  }
  
  &.translate-x-24 {
    transform: translateX(6rem);
  }
  
  &.translate-x-32 {
    transform: translateX(8rem);
  }
  
  &.translate-x-40 {
    transform: translateX(10rem);
  }
  
  &.translate-x-48 {
    transform: translateX(12rem);
  }
  
  &.translate-x-56 {
    transform: translateX(14rem);
  }
  
  &.translate-x-64 {
    transform: translateX(16rem);
  }
  
  &.translate-x-72 {
    transform: translateX(18rem);
  }
  
  &.translate-x-80 {
    transform: translateX(20rem);
  }
  
  &.translate-x-96 {
    transform: translateX(24rem);
  }
  
  &.translate-x-full {
    transform: translateX(100%);
  }
  
  &.translate-x-1/2 {
    transform: translateX(50%);
  }
  
  &.translate-x-1/3 {
    transform: translateX(33.333333%);
  }
  
  &.translate-x-2/3 {
    transform: translateX(66.666667%);
  }
  
  &.translate-x-1/4 {
    transform: translateX(25%);
  }
  
  &.translate-x-3/4 {
    transform: translateX(75%);
  }
  
  &.translate-x-1/5 {
    transform: translateX(20%);
  }
  
  &.translate-x-2/5 {
    transform: translateX(40%);
  }
  
  &.translate-x-3/5 {
    transform: translateX(60%);
  }
  
  &.translate-x-4/5 {
    transform: translateX(80%);
  }
  
  &.translate-x-1/6 {
    transform: translateX(16.666667%);
  }
  
  &.translate-x-5/6 {
    transform: translateX(83.333333%);
  }
  
  &.translate-x-1/12 {
    transform: translateX(8.333333%);
  }
  
  &.translate-x-5/12 {
    transform: translateX(41.666667%);
  }
  
  &.translate-x-7/12 {
    transform: translateX(58.333333%);
  }
  
  &.translate-x-11/12 {
    transform: translateX(91.666667%);
  }
  
  &.translate-x-auto {
    transform: translateX(auto);
  }
  
  &.-translate-x-1 {
    transform: translateX(-0.25rem);
  }
  
  &.-translate-x-2 {
    transform: translateX(-0.5rem);
  }
  
  &.-translate-x-3 {
    transform: translateX(-0.75rem);
  }
  
  &.-translate-x-4 {
    transform: translateX(-1rem);
  }
  
  &.-translate-x-5 {
    transform: translateX(-1.25rem);
  }
  
  &.-translate-x-6 {
    transform: translateX(-1.5rem);
  }
  
  &.-translate-x-8 {
    transform: translateX(-2rem);
  }
  
  &.-translate-x-10 {
    transform: translateX(-2.5rem);
  }
  
  &.-translate-x-12 {
    transform: translateX(-3rem);
  }
  
  &.-translate-x-16 {
    transform: translateX(-4rem);
  }
  
  &.-translate-x-20 {
    transform: translateX(-5rem);
  }
  
  &.-translate-x-24 {
    transform: translateX(-6rem);
  }
  
  &.-translate-x-32 {
    transform: translateX(-8rem);
  }
  
  &.-translate-x-40 {
    transform: translateX(-10rem);
  }
  
  &.-translate-x-48 {
    transform: translateX(-12rem);
  }
  
  &.-translate-x-56 {
    transform: translateX(-14rem);
  }
  
  &.-translate-x-64 {
    transform: translateX(-16rem);
  }
  
  &.-translate-x-72 {
    transform: translateX(-18rem);
  }
  
  &.-translate-x-80 {
    transform: translateX(-20rem);
  }
  
  &.-translate-x-96 {
    transform: translateX(-24rem);
  }
  
  &.-translate-x-full {
    transform: translateX(-100%);
  }
  
  &.-translate-x-1/2 {
    transform: translateX(-50%);
  }
  
  &.-translate-x-1/3 {
    transform: translateX(-33.333333%);
  }
  
  &.-translate-x-2/3 {
    transform: translateX(-66.666667%);
  }
  
  &.-translate-x-1/4 {
    transform: translateX(-25%);
  }
  
  &.-translate-x-3/4 {
    transform: translateX(-75%);
  }
  
  &.-translate-x-1/5 {
    transform: translateX(-20%);
  }
  
  &.-translate-x-2/5 {
    transform: translateX(-40%);
  }
  
  &.-translate-x-3/5 {
    transform: translateX(-60%);
  }
  
  &.-translate-x-4/5 {
    transform: translateX(-80%);
  }
  
  &.-translate-x-1/6 {
    transform: translateX(-16.666667%);
  }
  
  &.-translate-x-5/6 {
    transform: translateX(-83.333333%);
  }
  
  &.-translate-x-1/12 {
    transform: translateX(-8.333333%);
  }
  
  &.-translate-x-5/12 {
    transform: translateX(-41.666667%);
  }
  
  &.-translate-x-7/12 {
    transform: translateX(-58.333333%);
  }
  
  &.-translate-x-11/12 {
    transform: translateX(-91.666667%);
  }
  
  &.-translate-x-auto {
    transform: translateX(auto);
  }
}

// Carousel previous with custom cursor
.carousel-previous {
  &.cursor-auto {
    cursor: auto;
  }
  
  &.cursor-default {
    cursor: default;
  }
  
  &.cursor-pointer {
    cursor: pointer;
  }
  
  &.cursor-wait {
    cursor: wait;
  }
  
  &.cursor-text {
    cursor: text;
  }
  
  &.cursor-move {
    cursor: move;
  }
  
  &.cursor-help {
    cursor: help;
  }
  
  &.cursor-not-allowed {
    cursor: not-allowed;
  }
}

// Carousel previous with custom pointer events
.carousel-previous {
  &.pointer-events-none {
    pointer-events: none;
  }
  
  &.pointer-events-auto {
    pointer-events: auto;
  }
}

// Carousel previous with custom user select
.carousel-previous {
  &.select-none {
    user-select: none;
  }
  
  &.select-text {
    user-select: text;
  }
  
  &.select-all {
    user-select: all;
  }
  
  &.select-auto {
    user-select: auto;
  }
}

// Carousel previous with custom z-index
.carousel-previous {
  &.z-auto {
    z-index: auto;
  }
  
  &.z-0 {
    z-index: 0;
  }
  
  &.z-10 {
    z-index: 10;
  }
  
  &.z-20 {
    z-index: 20;
  }
  
  &.z-30 {
    z-index: 30;
  }
  
  &.z-40 {
    z-index: 40;
  }
  
  &.z-50 {
    z-index: 50;
  }
}
</style>
