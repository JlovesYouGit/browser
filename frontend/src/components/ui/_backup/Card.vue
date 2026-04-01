<template>
  <div
    data-slot="card"
    :class="cardClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

// Component props interface
interface CardProps {
  class?: string
}

// Define props
const props = defineProps<CardProps>()

// Computed classes
const cardClasses = computed(() => 
  cn("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.card {
  // Base card styles
  background-color: var(--color-card);
  color: var(--color-card-foreground);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for card
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    background-color: var(--color-card);
    color: var(--color-card-foreground);
    border-color: var(--color-border);
  }
  
  // Print styles
  @media print {
    background: white;
    color: #000;
    border: 1px solid #000;
    page-break-inside: avoid;
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    gap: 1rem;
    border-radius: 0.5rem;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    gap: 0.75rem;
    border-radius: 0.375rem;
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
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
  
  &.rounded-3xl {
    border-radius: 1.5rem;
  }
  
  &.rounded-full {
    border-radius: 50%;
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
  
  // Background variants
  &.bg-card {
    background-color: var(--color-card);
    color: var(--color-card-foreground);
  }
  
  &.bg-background {
    background-color: var(--color-background);
    color: var(--color-foreground);
  }
  
  &.bg-muted {
    background-color: var(--color-muted);
    color: var(--color-muted-foreground);
  }
  
  &.bg-primary {
    background-color: var(--color-primary);
    color: var(--color-primary-foreground);
  }
  
  &.bg-secondary {
    background-color: var(--color-secondary);
    color: var(--color-secondary-foreground);
  }
  
  &.bg-accent {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
  }
  
  &.bg-destructive {
    background-color: var(--color-destructive);
    color: var(--color-destructive-foreground);
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
  
  // Gap variants
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
.card {
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
  
  &.slide-up {
    animation: slideUp 0.3s ease-out forwards;
  }
  
  &.slide-down {
    animation: slideDown 0.3s ease-out forwards;
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

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .card {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in,
    &.slide-up,
    &.slide-down {
      animation: none;
    }
  }
}

// Hover effects
.card {
  &.hover-lift {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
  
  &.hover-grow {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  &.hover-shadow {
    transition: box-shadow 0.2s ease;
    
    &:hover {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
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
.card {
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
.card {
  &:active {
    transform: scale(0.98);
  }
}

// Loading state
.card {
  &.loading {
    opacity: 0.7;
    pointer-events: none;
    
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
.card {
  &.error {
    border-color: var(--color-destructive);
    background-color: color-mix(in srgb, var(--color-destructive) 5%, transparent);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-destructive) 10%, transparent);
    }
  }
}

// Success state
.card {
  &.success {
    border-color: var(--color-chart-2);
    background-color: color-mix(in srgb, var(--color-chart-2) 5%, transparent);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-2) 10%, transparent);
    }
  }
}

// Warning state
.card {
  &.warning {
    border-color: var(--color-chart-1);
    background-color: color-mix(in srgb, var(--color-chart-1) 5%, transparent);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-1) 10%, transparent);
    }
  }
}

// Info state
.card {
  &.info {
    border-color: var(--color-chart-4);
    background-color: color-mix(in srgb, var(--color-chart-4) 5%, transparent);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-4) 10%, transparent);
    }
  }
}

// Accessibility enhancements
.card {
  // Ensure proper color contrast
  color: var(--color-card-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    border: 2px solid currentColor;
    
    &.bg-card {
      border-color: #000;
    }
    
    &.bg-destructive {
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
.card {
  [dir="rtl"] & {
    // RTL specific adjustments
    // Card is generally direction-agnostic
  }
}

// Print optimizations
@media print {
  .card {
    // Ensure card prints correctly
    background: white;
    color: #000;
    border: 1px solid #000;
    page-break-inside: avoid;
    
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
  .card {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .card {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .card {
    // Dark mode card adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .card {
    // Light mode card adaptations are handled by CSS variables
  }
}

// Card with glass morphism
.card {
  &.glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    @media (prefers-color-scheme: dark) {
      background: rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
}

// Card with gradient background
.card {
  &.gradient {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: white;
    border: none;
    
    &.gradient-accent {
      background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
    }
    
    &.gradient-success {
      background: linear-gradient(135deg, var(--color-chart-2), var(--color-chart-4));
    }
    
    &.gradient-warning {
      background: linear-gradient(135deg, var(--color-chart-1), var(--color-chart-3));
    }
  }
}

// Card with image background
.card {
  &.with-image {
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      border-radius: inherit;
      z-index: 1;
    }
    
    > * {
      position: relative;
      z-index: 2;
      color: white;
    }
  }
}

// Card with overlay
.card {
  &.with-overlay {
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.7) 100%);
      border-radius: inherit;
      pointer-events: none;
    }
  }
}

// Card with pattern
.card {
  &.with-pattern {
    background-image: 
      radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    
    @media (prefers-color-scheme: dark) {
      background-image: 
        radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    }
  }
}

// Card with custom spacing
.card {
  &.spacing-tight {
    gap: 0.75rem;
    
    @media (max-width: 640px) {
      gap: 0.5rem;
    }
  }
  
  &.spacing-normal {
    gap: 1.5rem;
    
    @media (max-width: 640px) {
      gap: 1rem;
    }
  }
  
  &.spacing-loose {
    gap: 2rem;
    
    @media (max-width: 640px) {
      gap: 1.5rem;
    }
  }
  
  &.spacing-extra-loose {
    gap: 3rem;
    
    @media (max-width: 640px) {
      gap: 2rem;
    }
  }
}

// Card with custom padding
.card {
  &.padding-none {
    padding: 0;
  }
  
  &.padding-sm {
    padding: 0.5rem;
  }
  
  &.padding-md {
    padding: 1rem;
  }
  
  &.padding-lg {
    padding: 1.5rem;
  }
  
  &.padding-xl {
    padding: 2rem;
  }
  
  &.padding-2xl {
    padding: 3rem;
  }
}

// Card with aspect ratio
.card {
  &.aspect-square {
    aspect-ratio: 1 / 1;
  }
  
  &.aspect-video {
    aspect-ratio: 16 / 9;
  }
  
  &.aspect-4-3 {
    aspect-ratio: 4 / 3;
  }
  
  &.aspect-3-2 {
    aspect-ratio: 3 / 2;
  }
  
  &.aspect-1-1 {
    aspect-ratio: 1 / 1;
  }
  
  &.aspect-9-16 {
    aspect-ratio: 9 / 16;
  }
  
  &.aspect-21-9 {
    aspect-ratio: 21 / 9;
  }
}

// Card with max width
.card {
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
  
  &.max-width-full {
    max-width: 100%;
  }
}

// Card with custom height
.card {
  &.height-auto {
    height: auto;
  }
  
  &.height-full {
    height: 100%;
  }
  
  &.height-screen {
    height: 100vh;
  }
  
  &.height-min-screen {
    min-height: 100vh;
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
</style>
