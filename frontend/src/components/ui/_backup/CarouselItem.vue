<template>
  <div
    role="group"
    aria-roledescription="slide"
    data-slot="carousel-item"
    :class="itemClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'
import { useCarousel } from './CarouselContext'

// Component props interface
interface CarouselItemProps {
  class?: string
}

// Define props
const props = defineProps<CarouselItemProps>()

// Get carousel context
const { orientation } = useCarousel()

// Computed classes
const itemClasses = computed(() => 
  cn(
    "min-w-0 shrink-0 grow-0 basis-full",
    orientation.value === "horizontal" ? "pl-4" : "pt-4",
    props.class
  )
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.carousel-item {
  // Base carousel item styles
  min-width: 0;
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 100%;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // Reduce animations for carousel item
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Carousel item styling is theme-agnostic
  }
  
  // Print styles
  @media print {
    // Ensure carousel item prints correctly
    flex-basis: 100%;
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    // Mobile-specific carousel item optimizations
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    // Small mobile carousel item optimizations
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
.carousel-item {
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
  .carousel-item {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in {
      animation: none;
    }
  }
}

// Hover effects
.carousel-item {
  &.hover-lift {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  &.hover-grow {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  &.hover-shrink {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(0.98);
    }
  }
  
  &.hover-brighten {
    transition: filter 0.2s ease;
    
    &:hover {
      filter: brightness(1.05);
    }
  }
  
  &.hover-saturate {
    transition: filter 0.2s ease;
    
    &:hover {
      filter: saturate(1.1);
    }
  }
}

// Focus effects
.carousel-item {
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
.carousel-item {
  &:active {
    transform: scale(0.98);
  }
}

// Loading state
.carousel-item {
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
.carousel-item {
  &.error {
    border-color: var(--color-destructive);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-destructive) 10%, transparent);
    }
  }
}

// Success state
.carousel-item {
  &.success {
    border-color: var(--color-chart-2);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-2) 10%, transparent);
    }
  }
}

// Warning state
.carousel-item {
  &.warning {
    border-color: var(--color-chart-1);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-1) 10%, transparent);
    }
  }
}

// Info state
.carousel-item {
  &.info {
    border-color: var(--color-chart-4);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-4) 10%, transparent);
    }
  }
}

// Accessibility enhancements
.carousel-item {
  // Ensure proper color contrast
  color: inherit;
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    border: 2px solid currentColor;
    
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
.carousel-item {
  [dir="rtl"] & {
    // RTL specific adjustments for carousel item
    direction: rtl;
  }
}

// Print optimizations
@media print {
  .carousel-item {
    // Ensure carousel item prints correctly
    flex-basis: 100%;
    
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
  .carousel-item {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .carousel-item {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .carousel-item {
    // Dark mode carousel item adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .carousel-item {
    // Light mode carousel item adaptations are handled by CSS variables
  }
}

// Carousel item with custom spacing
.carousel-item {
  &.spacing-tight {
    // Tight spacing for carousel item
  }
  
  &.spacing-normal {
    // Normal spacing for carousel item
  }
  
  &.spacing-loose {
    // Loose spacing for carousel item
  }
}

// Carousel item with custom padding
.carousel-item {
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

// Carousel item with custom margin
.carousel-item {
  &.margin-none {
    margin: 0;
  }
  
  &.margin-xs {
    margin: 0.25rem;
  }
  
  &.margin-sm {
    margin: 0.5rem;
  }
  
  &.margin-md {
    margin: 0.75rem;
  }
  
  &.margin-lg {
    margin: 1rem;
  }
  
  &.margin-xl {
    margin: 1.25rem;
  }
  
  &.margin-2xl {
    margin: 1.5rem;
  }
}

// Carousel item with custom background
.carousel-item {
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

// Carousel item with custom border
.carousel-item {
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
  
  &.border-r {
    border-right: 1px solid var(--color-border);
  }
  
  &.border-b {
    border-bottom: 1px solid var(--color-border);
  }
  
  &.border-l {
    border-left: 1px solid var(--color-border);
  }
}

// Carousel item with custom border radius
.carousel-item {
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
  
  &.rounded-3xl {
    border-radius: 1.5rem;
  }
  
  &.rounded-full {
    border-radius: 50%;
  }
}

// Carousel item with custom shadow
.carousel-item {
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

// Carousel item with custom height
.carousel-item {
  &.height-auto {
    height: auto;
  }
  
  &.height-full {
    height: 100%;
  }
  
  &.height-screen {
    height: 100vh;
  }
  
  &.height-32 {
    height: 8rem;
  }
  
  &.height-40 {
    height: 10rem;
  }
  
  &.height-48 {
    height: 12rem;
  }
  
  &.height-56 {
    height: 14rem;
  }
  
  &.height-64 {
    height: 16rem;
  }
  
  &.height-72 {
    height: 18rem;
  }
  
  &.height-80 {
    height: 20rem;
  }
  
  &.height-96 {
    height: 24rem;
  }
}

// Carousel item with custom width
.carousel-item {
  &.width-auto {
    width: auto;
  }
  
  &.width-full {
    width: 100%;
  }
  
  &.width-screen {
    width: 100vw;
  }
  
  &.width-32 {
    width: 8rem;
  }
  
  &.width-40 {
    width: 10rem;
  }
  
  &.width-48 {
    width: 12rem;
  }
  
  &.width-56 {
    width: 14rem;
  }
  
  &.width-64 {
    width: 16rem;
  }
  
  &.width-72 {
    width: 18rem;
  }
  
  &.width-80 {
    width: 20rem;
  }
  
  &.width-96 {
    width: 24rem;
  }
}

// Carousel item with custom flex basis
.carousel-item {
  &.basis-auto {
    flex-basis: auto;
  }
  
  &.basis-full {
    flex-basis: 100%;
  }
  
  &.basis-1/2 {
    flex-basis: 50%;
  }
  
  &.basis-1/3 {
    flex-basis: 33.333333%;
  }
  
  &.basis-2/3 {
    flex-basis: 66.666667%;
  }
  
  &.basis-1/4 {
    flex-basis: 25%;
  }
  
  &.basis-3/4 {
    flex-basis: 75%;
  }
  
  &.basis-1/5 {
    flex-basis: 20%;
  }
  
  &.basis-2/5 {
    flex-basis: 40%;
  }
  
  &.basis-3/5 {
    flex-basis: 60%;
  }
  
  &.basis-4/5 {
    flex-basis: 80%;
  }
  
  &.basis-1/6 {
    flex-basis: 16.666667%;
  }
  
  &.basis-5/6 {
    flex-basis: 83.333333%;
  }
  
  &.basis-1/12 {
    flex-basis: 8.333333%;
  }
  
  &.basis-5/12 {
    flex-basis: 41.666667%;
  }
  
  &.basis-7/12 {
    flex-basis: 58.333333%;
  }
  
  &.basis-11/12 {
    flex-basis: 91.666667%;
  }
}

// Carousel item with custom flex grow
.carousel-item {
  &.grow-0 {
    flex-grow: 0;
  }
  
  &.grow {
    flex-grow: 1;
  }
  
  &.grow-2 {
    flex-grow: 2;
  }
  
  &.grow-3 {
    flex-grow: 3;
  }
  
  &.grow-4 {
    flex-grow: 4;
  }
  
  &.grow-5 {
    flex-grow: 5;
  }
}

// Carousel item with custom flex shrink
.carousel-item {
  &.shrink-0 {
    flex-shrink: 0;
  }
  
  &.shrink {
    flex-shrink: 1;
  }
  
  &.shrink-2 {
    flex-shrink: 2;
  }
  
  &.shrink-3 {
    flex-shrink: 3;
  }
  
  &.shrink-4 {
    flex-shrink: 4;
  }
  
  &.shrink-5 {
    flex-shrink: 5;
  }
}

// Carousel item with custom min width
.carousel-item {
  &.min-w-0 {
    min-width: 0px;
  }
  
  &.min-w-full {
    min-width: 100%;
  }
  
  &.min-w-min {
    min-width: min-content;
  }
  
  &.min-w-max {
    min-width: max-content;
  }
  
  &.min-w-32 {
    min-width: 8rem;
  }
  
  &.min-w-40 {
    min-width: 10rem;
  }
  
  &.min-w-48 {
    min-width: 12rem;
  }
  
  &.min-w-56 {
    min-width: 14rem;
  }
  
  &.min-w-64 {
    min-width: 16rem;
  }
  
  &.min-w-72 {
    min-width: 18rem;
  }
  
  &.min-w-80 {
    min-width: 20rem;
  }
  
  &.min-w-96 {
    min-width: 24rem;
  }
}

// Carousel item with custom max width
.carousel-item {
  &.max-w-none {
    max-width: none;
  }
  
  &.max-w-xs {
    max-width: 20rem;
  }
  
  &.max-w-sm {
    max-width: 24rem;
  }
  
  &.max-w-md {
    max-width: 28rem;
  }
  
  &.max-w-lg {
    max-width: 32rem;
  }
  
  &.max-w-xl {
    max-width: 36rem;
  }
  
  &.max-w-2xl {
    max-width: 42rem;
  }
  
  &.max-w-3xl {
    max-width: 48rem;
  }
  
  &.max-w-4xl {
    max-width: 56rem;
  }
  
  &.max-w-5xl {
    max-width: 64rem;
  }
  
  &.max-w-6xl {
    max-width: 72rem;
  }
  
  &.max-w-7xl {
    max-width: 80rem;
  }
  
  &.max-w-full {
    max-width: 100%;
  }
  
  &.max-w-screen-sm {
    max-width: 640px;
  }
  
  &.max-w-screen-md {
    max-width: 768px;
  }
  
  &.max-w-screen-lg {
    max-width: 1024px;
  }
  
  &.max-w-screen-xl {
    max-width: 1280px;
  }
  
  &.max-w-screen-2xl {
    max-width: 1536px;
  }
}

// Carousel item with custom overflow
.carousel-item {
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

// Carousel item with custom position
.carousel-item {
  &.static {
    position: static;
  }
  
  &.fixed {
    position: fixed;
  }
  
  &.absolute {
    position: absolute;
  }
  
  &.relative {
    position: relative;
  }
  
  &.sticky {
    position: sticky;
  }
}

// Carousel item with custom z-index
.carousel-item {
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

// Carousel item with custom display
.carousel-item {
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

// Carousel item with custom opacity
.carousel-item {
  &.opacity-0 {
    opacity: 0;
  }
  
  &.opacity-5 {
    opacity: 0.05;
  }
  
  &.opacity-10 {
    opacity: 0.1;
  }
  
  &.opacity-20 {
    opacity: 0.2;
  }
  
  &.opacity-25 {
    opacity: 0.25;
  }
  
  &.opacity-30 {
    opacity: 0.3;
  }
  
  &.opacity-40 {
    opacity: 0.4;
  }
  
  &.opacity-50 {
    opacity: 0.5;
  }
  
  &.opacity-60 {
    opacity: 0.6;
  }
  
  &.opacity-70 {
    opacity: 0.7;
  }
  
  &.opacity-75 {
    opacity: 0.75;
  }
  
  &.opacity-80 {
    opacity: 0.8;
  }
  
  &.opacity-90 {
    opacity: 0.9;
  }
  
  &.opacity-100 {
    opacity: 1;
  }
}

// Carousel item with custom cursor
.carousel-item {
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

// Carousel item with custom pointer events
.carousel-item {
  &.pointer-events-none {
    pointer-events: none;
  }
  
  &.pointer-events-auto {
    pointer-events: auto;
  }
}

// Carousel item with custom user select
.carousel-item {
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

// Carousel item with custom resize
.carousel-item {
  &.resize-none {
    resize: none;
  }
  
  &.resize-y {
    resize: vertical;
  }
  
  &.resize-x {
    resize: horizontal;
  }
  
  &.resize {
    resize: both;
  }
}

// Carousel item with custom scroll behavior
.carousel-item {
  &.scroll-auto {
    scroll-behavior: auto;
  }
  
  &.scroll-smooth {
    scroll-behavior: smooth;
  }
}

// Carousel item with custom scroll snap type
.carousel-item {
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

// Carousel item with custom scroll snap align
.carousel-item {
  &.snap-start {
    scroll-snap-align: start;
  }
  
  &.snap-end {
    scroll-snap-align: end;
  }
  
  &.snap-center {
    scroll-snap-align: center;
  }
  
  &.snap-align-none {
    scroll-snap-align: none;
  }
}

// Carousel item with custom scroll snap stop
.carousel-item {
  &.snap-normal {
    scroll-snap-stop: normal;
  }
  
  &.snap-always {
    scroll-snap-stop: always;
  }
}

// Carousel item with custom scroll margin
.carousel-item {
  &.scroll-m-0 {
    scroll-margin: 0;
  }
  
  &.scroll-m-1 {
    scroll-margin: 0.25rem;
  }
  
  &.scroll-m-2 {
    scroll-margin: 0.5rem;
  }
  
  &.scroll-m-3 {
    scroll-margin: 0.75rem;
  }
  
  &.scroll-m-4 {
    scroll-margin: 1rem;
  }
  
  &.scroll-m-5 {
    scroll-margin: 1.25rem;
  }
  
  &.scroll-m-6 {
    scroll-margin: 1.5rem;
  }
  
  &.scroll-m-8 {
    scroll-margin: 2rem;
  }
  
  &.scroll-m-10 {
    scroll-margin: 2.5rem;
  }
  
  &.scroll-m-12 {
    scroll-margin: 3rem;
  }
  
  &.scroll-m-16 {
    scroll-margin: 4rem;
  }
  
  &.scroll-m-20 {
    scroll-margin: 5rem;
  }
  
  &.scroll-m-24 {
    scroll-margin: 6rem;
  }
  
  &.scroll-m-32 {
    scroll-margin: 8rem;
  }
  
  &.scroll-m-auto {
    scroll-margin: auto;
  }
}

// Carousel item with custom scroll padding
.carousel-item {
  &.scroll-p-0 {
    scroll-padding: 0;
  }
  
  &.scroll-p-1 {
    scroll-padding: 0.25rem;
  }
  
  &.scroll-p-2 {
    scroll-padding: 0.5rem;
  }
  
  &.scroll-p-3 {
    scroll-padding: 0.75rem;
  }
  
  &.scroll-p-4 {
    scroll-padding: 1rem;
  }
  
  &.scroll-p-5 {
    scroll-padding: 1.25rem;
  }
  
  &.scroll-p-6 {
    scroll-padding: 1.5rem;
  }
  
  &.scroll-p-8 {
    scroll-padding: 2rem;
  }
  
  &.scroll-p-10 {
    scroll-padding: 2.5rem;
  }
  
  &.scroll-p-12 {
    scroll-padding: 3rem;
  }
  
  &.scroll-p-16 {
    scroll-padding: 4rem;
  }
  
  &.scroll-p-20 {
    scroll-padding: 5rem;
  }
  
  &.scroll-p-24 {
    scroll-padding: 6rem;
  }
  
  &.scroll-p-32 {
    scroll-padding: 8rem;
  }
  
  &.scroll-p-auto {
    scroll-padding: auto;
  }
}
</style>
