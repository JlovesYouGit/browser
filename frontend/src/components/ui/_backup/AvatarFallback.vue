<template>
  <AvatarFallbackPrimitive
    :data-slot="'avatar-fallback'"
    :class="fallbackClasses"
    v-bind="$attrs"
  >
    <slot />
  </AvatarFallbackPrimitive>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AvatarFallback } from 'radix-vue'
import { cn } from '@/utils/cn'

// Component props interface
interface AvatarFallbackProps {
  class?: string
  delayMs?: number
}

// Define props with default values
const props = withDefaults(defineProps<AvatarFallbackProps>(), {
  delayMs: 0
})

// Use Radix Vue AvatarFallback under the hood
const AvatarFallbackPrimitive = AvatarFallback

// Computed classes
const fallbackClasses = computed(() => 
  cn("bg-muted flex size-full items-center justify-center rounded-full", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.avatar-fallback {
  // Base fallback styles
  background-color: var(--color-muted);
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--color-foreground);
  font-weight: 500;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for fallback
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    background-color: var(--color-muted);
    color: var(--color-foreground);
  }
  
  // Print styles
  @media print {
    background-color: #f0f0f0;
    color: #000;
    border: 1px solid #000;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    font-size: 0.75rem;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    font-size: 0.625rem;
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Size variants
  &.size-xs {
    font-size: 0.5rem;
  }
  
  &.size-sm {
    font-size: 0.625rem;
  }
  
  &.size-md {
    font-size: 0.75rem;
  }
  
  &.size-lg {
    font-size: 0.875rem;
  }
  
  &.size-xl {
    font-size: 1rem;
  }
  
  &.size-2xl {
    font-size: 1.125rem;
  }
  
  &.size-3xl {
    font-size: 1.25rem;
  }
  
  &.size-4xl {
    font-size: 1.5rem;
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
  
  // Background color variants
  &.bg-muted {
    background-color: var(--color-muted);
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
  
  // Text color variants
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
  
  &.text-white {
    color: white;
  }
  
  &.text-black {
    color: black;
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
  
  // Dynamic background colors based on name
  &[data-color="blue"] {
    background-color: #3b82f6;
    color: white;
  }
  
  &[data-color="green"] {
    background-color: #10b981;
    color: white;
  }
  
  &[data-color="red"] {
    background-color: #ef4444;
    color: white;
  }
  
  &[data-color="purple"] {
    background-color: #8b5cf6;
    color: white;
  }
  
  &[data-color="orange"] {
    background-color: #f97316;
    color: white;
  }
  
  &[data-color="pink"] {
    background-color: #ec4899;
    color: white;
  }
  
  &[data-color="yellow"] {
    background-color: #eab308;
    color: black;
  }
  
  &[data-color="indigo"] {
    background-color: #6366f1;
    color: white;
  }
  
  &[data-color="teal"] {
    background-color: #14b8a6;
    color: white;
  }
  
  &[data-color="cyan"] {
    background-color: #06b6d4;
    color: white;
  }
  
  &[data-color="gray"] {
    background-color: #6b7280;
    color: white;
  }
  
  &[data-color="slate"] {
    background-color: #475569;
    color: white;
  }
  
  // Pattern variants
  &.pattern-dots {
    background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
    background-size: 0.5rem 0.5rem;
    background-position: 0 0, 0.25rem 0.25rem;
    opacity: 0.3;
  }
  
  &.pattern-lines {
    background-image: repeating-linear-gradient(
      45deg,
      currentColor,
      currentColor 1px,
      transparent 1px,
      transparent 0.5rem
    );
    opacity: 0.3;
  }
  
  &.pattern-grid {
    background-image: 
      linear-gradient(currentColor 1px, transparent 1px),
      linear-gradient(90deg, currentColor 1px, transparent 1px);
    background-size: 0.5rem 0.5rem;
    opacity: 0.3;
  }
  
  &.pattern-chevron {
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 0.25rem,
      currentColor 0.25rem,
      currentColor 0.5rem
    );
    opacity: 0.3;
  }
  
  // Gradient variants
  &.gradient-primary {
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary/80));
    color: var(--color-primary-foreground);
  }
  
  &.gradient-secondary {
    background: linear-gradient(135deg, var(--color-secondary), var(--color-secondary/80));
    color: var(--color-secondary-foreground);
  }
  
  &.gradient-accent {
    background: linear-gradient(135deg, var(--color-accent), var(--color-accent/80));
    color: var(--color-accent-foreground);
  }
  
  &.gradient-destructive {
    background: linear-gradient(135deg, var(--color-destructive), var(--color-destructive/80));
    color: var(--color-destructive-foreground);
  }
  
  &.gradient-success {
    background: linear-gradient(135deg, var(--color-chart-2), var(--color-chart-2/80));
    color: white;
  }
  
  &.gradient-warning {
    background: linear-gradient(135deg, var(--color-chart-1), var(--color-chart-1/80));
    color: white;
  }
  
  &.gradient-info {
    background: linear-gradient(135deg, var(--color-chart-4), var(--color-chart-4/80));
    color: white;
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
}

// Animation support
.avatar-fallback {
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
    animation: bounceIn 0.5s ease-out forwards;
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
  .avatar-fallback {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in,
    &.rotate-in {
      animation: none;
    }
  }
}

// Hover effects
.avatar-fallback {
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
}

// Focus effects
.avatar-fallback {
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

// Loading states
.avatar-fallback {
  &.loading {
    opacity: 0.7;
    
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

// Accessibility enhancements
.avatar-fallback {
  // Ensure proper color contrast
  color: var(--color-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    background-color: #000;
    color: #fff;
    border: 2px solid #000;
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
.avatar-fallback {
  [dir="rtl"] & {
    // Fallback is direction-agnostic
  }
}

// Print optimizations
@media print {
  .avatar-fallback {
    // Ensure fallback prints correctly
    background-color: #f0f0f0;
    color: #000;
    border: 1px solid #000;
    
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
  .avatar-fallback {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .avatar-fallback {
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
  .avatar-fallback {
    // Dark mode fallback adaptations
    background-color: var(--color-muted);
    color: var(--color-foreground);
  }
}

@media (prefers-color-scheme: light) {
  .avatar-fallback {
    // Light mode fallback adaptations
    background-color: var(--color-muted);
    color: var(--color-foreground);
  }
}

// Delay support
.avatar-fallback {
  &[data-delay] {
    // Support for delayed fallback display
    animation-delay: attr(data-delay);
  }
}
</style>
