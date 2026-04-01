<template>
  <span
    data-slot="breadcrumb-page"
    role="link"
    aria-disabled="true"
    aria-current="page"
    :class="pageClasses"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

// Component props interface
interface BreadcrumbPageProps {
  class?: string
}

// Define props
const props = defineProps<BreadcrumbPageProps>()

// Computed classes
const pageClasses = computed(() => 
  cn("text-foreground font-normal", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.breadcrumb-page {
  // Base breadcrumb page styles
  color: var(--color-foreground);
  font-weight: 400;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for breadcrumb page
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    color: var(--color-foreground);
  }
  
  // Print styles
  @media print {
    color: #000;
    font-weight: 700;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    // Mobile-specific page optimizations
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    // Small mobile page optimizations
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
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
  
  // Color variants
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
  
  &.text-success {
    color: var(--color-chart-2);
  }
  
  &.text-warning {
    color: var(--color-chart-1);
  }
  
  &.text-info {
    color: var(--color-chart-4);
  }
  
  &.text-white {
    color: white;
  }
  
  &.text-black {
    color: black;
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
.breadcrumb-page {
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
  
  &.highlight {
    animation: highlight 1s ease-out forwards;
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

@keyframes highlight {
  0% {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
  }
  100% {
    background-color: transparent;
    color: var(--color-foreground);
  }
}

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .breadcrumb-page {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in,
    &.pulse,
    &.highlight {
      animation: none;
    }
  }
}

// Hover effects
.breadcrumb-page {
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
}

// Focus effects
.breadcrumb-page {
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
.breadcrumb-page {
  &.active {
    color: var(--color-foreground);
    font-weight: 500;
  }
}

// Disabled state
.breadcrumb-page {
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
}

// Loading state
.breadcrumb-page {
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

// Error state
.breadcrumb-page {
  &.error {
    color: var(--color-destructive);
  }
}

// Success state
.breadcrumb-page {
  &.success {
    color: var(--color-chart-2);
  }
}

// Warning state
.breadcrumb-page {
  &.warning {
    color: var(--color-chart-1);
  }
}

// Info state
.breadcrumb-page {
  &.info {
    color: var(--color-chart-4);
  }
}

// Truncation
.breadcrumb-page {
  &.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  &.truncate-sm {
    max-width: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  &.truncate-md {
    max-width: 12rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  &.truncate-lg {
    max-width: 16rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

// Accessibility enhancements
.breadcrumb-page {
  // Ensure proper color contrast
  color: var(--color-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    color: #000;
    font-weight: 700;
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
.breadcrumb-page {
  [dir="rtl"] & {
    // RTL specific adjustments
    text-align: right;
  }
}

// Print optimizations
@media print {
  .breadcrumb-page {
    // Ensure breadcrumb page prints correctly
    color: #000;
    font-weight: 700;
    
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
  .breadcrumb-page {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .breadcrumb-page {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .breadcrumb-page {
    // Dark mode breadcrumb page adaptations
    color: var(--color-foreground);
  }
}

@media (prefers-color-scheme: light) {
  .breadcrumb-page {
    // Light mode breadcrumb page adaptations
    color: var(--color-foreground);
  }
}

// Page with icon
.breadcrumb-page {
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

// Page with badge
.breadcrumb-page {
  &.with-badge {
    position: relative;
    
    .badge {
      position: absolute;
      top: -0.25rem;
      right: -0.25rem;
      background-color: var(--color-primary);
      color: var(--color-primary-foreground);
      font-size: 0.625rem;
      font-weight: 600;
      padding: 0.125rem 0.375rem;
      border-radius: 9999px;
      min-width: 1rem;
      text-align: center;
    }
  }
}

// Page with tooltip
.breadcrumb-page {
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

// Page with status indicator
.breadcrumb-page {
  &.with-status {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: -1rem;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      transform: translateY(-50%);
    }
    
    &.status-online::before {
      background-color: var(--color-chart-2);
    }
    
    &.status-offline::before {
      background-color: var(--color-muted-foreground);
    }
    
    &.status-busy::before {
      background-color: var(--color-chart-1);
      animation: pulse 2s ease-in-out infinite;
    }
    
    &.status-error::before {
      background-color: var(--color-destructive);
    }
  }
}

// Page with emphasis
.breadcrumb-page {
  &.emphasis {
    font-weight: 600;
    color: var(--color-primary);
  }
  
  &.emphasis-secondary {
    font-weight: 600;
    color: var(--color-secondary);
  }
  
  &.emphasis-accent {
    font-weight: 600;
    color: var(--color-accent);
  }
  
  &.emphasis-destructive {
    font-weight: 600;
    color: var(--color-destructive);
  }
}

// Page with background
.breadcrumb-page {
  &.with-background {
    background-color: var(--color-muted);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    
    &.rounded {
      border-radius: 0.25rem;
    }
    
    &.rounded-md {
      border-radius: 0.375rem;
    }
    
    &.rounded-lg {
      border-radius: 0.5rem;
    }
    
    &.rounded-full {
      border-radius: 9999px;
    }
  }
}

// Page with border
.breadcrumb-page {
  &.with-border {
    border: 1px solid var(--color-border);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    
    &.border-2 {
      border-width: 2px;
    }
    
    &.border-4 {
      border-width: 4px;
    }
  }
}

// Page with shadow
.breadcrumb-page {
  &.with-shadow {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    
    &.shadow-sm {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
    
    &.shadow-md {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    &.shadow-lg {
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }
  }
}

// Page with animation
.breadcrumb-page {
  &.animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }
  
  &.animate-bounce {
    animation: bounce 1s ease-in-out infinite;
  }
  
  &.animate-spin {
    animation: spin 1s linear infinite;
  }
  
  &.animate-ping {
    animation: ping 1s ease-in-out infinite;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
