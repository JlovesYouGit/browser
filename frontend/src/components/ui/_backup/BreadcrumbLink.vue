<template>
  <component
    :is="component"
    data-slot="breadcrumb-link"
    :class="linkClasses"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Slot } from 'radix-vue'
import { cn } from '@/utils/cn'

// Component props interface
interface BreadcrumbLinkProps {
  class?: string
  asChild?: boolean
  href?: string
  target?: string
  rel?: string
}

// Define props with default values
const props = withDefaults(defineProps<BreadcrumbLinkProps>(), {
  asChild: false
})

// Use Slot component when asChild is true, otherwise use a
const component = computed(() => props.asChild ? Slot : 'a')

// Computed classes
const linkClasses = computed(() => 
  cn("hover:text-foreground transition-colors", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.breadcrumb-link {
  // Base breadcrumb link styles
  color: var(--color-muted-foreground);
  transition: color 0.2s ease;
  text-decoration: none;
  
  &:hover {
    color: var(--color-foreground);
  }
  
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  &:visited {
    color: var(--color-muted-foreground);
  }
  
  &:active {
    color: var(--color-foreground);
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    color: var(--color-muted-foreground);
    
    &:hover {
      color: var(--color-foreground);
    }
  }
  
  // Print styles
  @media print {
    color: #000;
    text-decoration: underline;
    
    &:hover {
      color: #000;
    }
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    // Mobile-specific link optimizations
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    // Small mobile link optimizations
  }
  
  // Text decoration variants
  &.underline-none {
    text-decoration: none;
    
    &:hover {
      text-decoration: none;
    }
  }
  
  &.underline {
    text-decoration: underline;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  &.underline-hover {
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  &.underline-focus {
    text-decoration: none;
    
    &:focus {
      text-decoration: underline;
    }
  }
  
  // Color variants
  &.text-foreground {
    color: var(--color-foreground);
    
    &:hover {
      color: var(--color-foreground);
    }
  }
  
  &.text-muted-foreground {
    color: var(--color-muted-foreground);
    
    &:hover {
      color: var(--color-foreground);
    }
  }
  
  &.text-primary {
    color: var(--color-primary);
    
    &:hover {
      color: var(--color-primary);
    }
  }
  
  &.text-secondary {
    color: var(--color-secondary);
    
    &:hover {
      color: var(--color-secondary);
    }
  }
  
  &.text-accent {
    color: var(--color-accent);
    
    &:hover {
      color: var(--color-accent);
    }
  }
  
  &.text-destructive {
    color: var(--color-destructive);
    
    &:hover {
      color: var(--color-destructive);
    }
  }
  
  &.text-success {
    color: var(--color-chart-2);
    
    &:hover {
      color: var(--color-chart-2);
    }
  }
  
  &.text-warning {
    color: var(--color-chart-1);
    
    &:hover {
      color: var(--color-chart-1);
    }
  }
  
  &.text-info {
    color: var(--color-chart-4);
    
    &:hover {
      color: var(--color-chart-4);
    }
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
  
  // Size variants
  &.text-xs {
    font-size: 0.75rem;
  }
  
  &.text-sm {
    font-size: 0.875rem;
  }
  
  &.text-base {
    font-size: 1rem;
  }
  
  &.text-lg {
    font-size: 1.125rem;
  }
  
  &.text-xl {
    font-size: 1.25rem;
  }
  
  &.text-2xl {
    font-size: 1.5rem;
  }
  
  &.text-3xl {
    font-size: 1.875rem;
  }
  
  &.text-4xl {
    font-size: 2.25rem;
  }
  
  &.text-5xl {
    font-size: 3rem;
  }
  
  &.text-6xl {
    font-size: 3.75rem;
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
.breadcrumb-link {
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
  .breadcrumb-link {
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
.breadcrumb-link {
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
  
  &.hover-brighten {
    transition: filter 0.2s ease;
    
    &:hover {
      filter: brightness(1.1);
    }
  }
  
  &.hover-saturate {
    transition: filter 0.2s ease;
    
    &:hover {
      filter: saturate(1.2);
    }
  }
  
  &.hover-grayscale {
    transition: filter 0.2s ease;
    
    &:hover {
      filter: grayscale(0%);
    }
  }
}

// Focus effects
.breadcrumb-link {
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
.breadcrumb-link {
  &.active {
    color: var(--color-foreground);
    font-weight: 500;
    text-decoration: none;
    
    &:hover {
      color: var(--color-foreground);
    }
  }
}

// Disabled state
.breadcrumb-link {
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
    
    &:hover {
      color: var(--color-muted-foreground);
    }
  }
}

// Loading state
.breadcrumb-link {
  &.loading {
    opacity: 0.7;
    pointer-events: none;
    
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

// Error state
.breadcrumb-link {
  &.error {
    color: var(--color-destructive);
    
    &:hover {
      color: var(--color-destructive);
    }
  }
}

// Success state
.breadcrumb-link {
  &.success {
    color: var(--color-chart-2);
    
    &:hover {
      color: var(--color-chart-2);
    }
  }
}

// Warning state
.breadcrumb-link {
  &.warning {
    color: var(--color-chart-1);
    
    &:hover {
      color: var(--color-chart-1);
    }
  }
}

// Info state
.breadcrumb-link {
  &.info {
    color: var(--color-chart-4);
    
    &:hover {
      color: var(--color-chart-4);
    }
  }
}

// External link indicator
.breadcrumb-link {
  &[target="_blank"] {
    &::after {
      content: '↗';
      font-size: 0.75em;
      margin-left: 0.25rem;
      opacity: 0.7;
    }
  }
}

// Download link indicator
.breadcrumb-link {
  &[download] {
    &::before {
      content: '⬇';
      font-size: 0.75em;
      margin-right: 0.25rem;
      opacity: 0.7;
    }
  }
}

// Accessibility enhancements
.breadcrumb-link {
  // Ensure proper color contrast
  color: var(--color-muted-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    color: #000;
    text-decoration: underline;
    
    &:hover {
      color: #000;
      text-decoration: none;
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
.breadcrumb-link {
  [dir="rtl"] & {
    // RTL specific adjustments
    text-align: right;
  }
}

// Print optimizations
@media print {
  .breadcrumb-link {
    // Ensure breadcrumb link prints correctly
    color: #000;
    text-decoration: underline;
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
    
    // Ensure proper print layout
    break-inside: avoid;
    
    // Show URLs for external links
    &[href^="http"]::after {
      content: " (" attr(href) ")";
      font-size: 0.8em;
      color: #666;
    }
  }
}

// High DPI optimizations
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .breadcrumb-link {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .breadcrumb-link {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .breadcrumb-link {
    // Dark mode breadcrumb link adaptations
    color: var(--color-muted-foreground);
    
    &:hover {
      color: var(--color-foreground);
    }
  }
}

@media (prefers-color-scheme: light) {
  .breadcrumb-link {
    // Light mode breadcrumb link adaptations
    color: var(--color-muted-foreground);
    
    &:hover {
      color: var(--color-foreground);
    }
  }
}

// Link with icon
.breadcrumb-link {
  &.with-icon {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    
    > svg {
      width: 1rem;
      height: 1rem;
    }
  }
}

// Link with badge
.breadcrumb-link {
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

// Link with tooltip
.breadcrumb-link {
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

// Link with progress
.breadcrumb-link {
  &.with-progress {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--color-muted);
      opacity: 0.3;
    }
    
    &[data-progress] {
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        height: 2px;
        background-color: var(--color-primary);
        width: attr(data-progress);
      }
    }
  }
}

// Link with security indicators
.breadcrumb-link {
  &.secure {
    &::before {
      content: '🔒';
      font-size: 0.75em;
      margin-right: 0.25rem;
      opacity: 0.7;
    }
  }
  
  &.insecure {
    &::before {
      content: '⚠️';
      font-size: 0.75em;
      margin-right: 0.25rem;
      opacity: 0.7;
    }
  }
}
</style>
