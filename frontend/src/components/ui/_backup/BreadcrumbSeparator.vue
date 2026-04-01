<template>
  <li
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    :class="separatorClasses"
    v-bind="$attrs"
  >
    <slot>
      <ChevronRightIcon class="size-3.5" />
    </slot>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/utils/cn'

// Component props interface
interface BreadcrumbSeparatorProps {
  class?: string
}

// Define props
const props = defineProps<BreadcrumbSeparatorProps>()

// Use ChevronRight icon as default
const ChevronRightIcon = ChevronRight

// Computed classes
const separatorClasses = computed(() => 
  cn("[&>svg]:size-3.5", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.breadcrumb-separator {
  // Base breadcrumb separator styles
  display: inline-flex;
  align-items: center;
  color: var(--color-muted-foreground);
  
  // Icon sizing
  > svg {
    width: 0.875rem;
    height: 0.875rem;
  }
  
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
    // No animations needed for separator
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    color: var(--color-muted-foreground);
  }
  
  // Print styles
  @media print {
    color: #666;
    
    > svg {
      // Ensure icon prints correctly
      fill: #666;
    }
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    > svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    > svg {
      width: 0.625rem;
      height: 0.625rem;
    }
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Size variants
  &.size-xs {
    > svg {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
  
  &.size-sm {
    > svg {
      width: 0.625rem;
      height: 0.625rem;
    }
  }
  
  &.size-md {
    > svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
  
  &.size-lg {
    > svg {
      width: 1rem;
      height: 1rem;
    }
  }
  
  &.size-xl {
    > svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  
  // Color variants
  &.text-foreground {
    color: var(--color-foreground);
    
    > svg {
      color: var(--color-foreground);
    }
  }
  
  &.text-muted-foreground {
    color: var(--color-muted-foreground);
    
    > svg {
      color: var(--color-muted-foreground);
    }
  }
  
  &.text-primary {
    color: var(--color-primary);
    
    > svg {
      color: var(--color-primary);
    }
  }
  
  &.text-secondary {
    color: var(--color-secondary);
    
    > svg {
      color: var(--color-secondary);
    }
  }
  
  &.text-accent {
    color: var(--color-accent);
    
    > svg {
      color: var(--color-accent);
    }
  }
  
  &.text-destructive {
    color: var(--color-destructive);
    
    > svg {
      color: var(--color-destructive);
    }
  }
  
  &.text-success {
    color: var(--color-chart-2);
    
    > svg {
      color: var(--color-chart-2);
    }
  }
  
  &.text-warning {
    color: var(--color-chart-1);
    
    > svg {
      color: var(--color-chart-1);
    }
  }
  
  &.text-info {
    color: var(--color-chart-4);
    
    > svg {
      color: var(--color-chart-4);
    }
  }
  
  // Separator type variants
  &.separator-arrow {
    > svg {
      // Arrow separator styles
    }
  }
  
  &.separator-slash {
    // Text separator
    > svg {
      display: none;
    }
    
    &::before {
      content: '/';
      font-weight: 300;
    }
  }
  
  &.separator-pipe {
    // Text separator
    > svg {
      display: none;
    }
    
    &::before {
      content: '|';
      font-weight: 300;
    }
  }
  
  &.separator-dot {
    // Dot separator
    > svg {
      display: none;
    }
    
    &::before {
      content: '•';
      font-weight: 300;
    }
  }
  
  &.separator-double-arrow {
    // Double arrow separator
    > svg {
      display: none;
    }
    
    &::before {
      content: '»';
      font-weight: 300;
    }
  }
  
  &.separator-greater {
    // Greater than separator
    > svg {
      display: none;
    }
    
    &::before {
      content: '>';
      font-weight: 300;
    }
  }
  
  // Animation variants
  &.rotate {
    > svg {
      animation: rotate 2s linear infinite;
    }
  }
  
  &.pulse {
    > svg {
      animation: pulse 2s ease-in-out infinite;
    }
  }
  
  &.bounce {
    > svg {
      animation: bounce 1s ease-in-out infinite;
    }
  }
  
  &.fade {
    > svg {
      animation: fade 1s ease-in-out infinite;
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

// Animations
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

@keyframes fade {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .breadcrumb-separator {
    &.rotate,
    &.pulse,
    &.bounce,
    &.fade {
      > svg {
        animation: none;
      }
    }
  }
}

// Hover effects
.breadcrumb-separator {
  &.hover-lift {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  &.hover-grow {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
  
  &.hover-shrink {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(0.9);
    }
  }
  
  &.hover-rotate {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: rotate(90deg);
    }
  }
  
  &.hover-brighten {
    transition: filter 0.2s ease;
    
    &:hover {
      filter: brightness(1.2);
    }
  }
  
  &.hover-saturate {
    transition: filter 0.2s ease;
    
    &:hover {
      filter: saturate(1.5);
    }
  }
}

// Focus effects
.breadcrumb-separator {
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

// Active state
.breadcrumb-separator {
  &.active {
    color: var(--color-foreground);
    
    > svg {
      color: var(--color-foreground);
    }
  }
}

// Disabled state
.breadcrumb-separator {
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
    
    > svg {
      opacity: 0.5;
    }
  }
}

// Loading state
.breadcrumb-separator {
  &.loading {
    opacity: 0.7;
    
    > svg {
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// Accessibility enhancements
.breadcrumb-separator {
  // Ensure proper color contrast
  color: var(--color-muted-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    color: #000;
    
    > svg {
      color: #000;
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
.breadcrumb-separator {
  [dir="rtl"] & {
    // RTL specific adjustments
    transform: rotate(180deg);
  }
}

// Print optimizations
@media print {
  .breadcrumb-separator {
    // Ensure breadcrumb separator prints correctly
    color: #666;
    
    > svg {
      fill: #666;
    }
    
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
  .breadcrumb-separator {
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
  .breadcrumb-separator {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
    
    > svg {
      animation: none;
    }
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .breadcrumb-separator {
    // Dark mode breadcrumb separator adaptations
    color: var(--color-muted-foreground);
    
    > svg {
      color: var(--color-muted-foreground);
    }
  }
}

@media (prefers-color-scheme: light) {
  .breadcrumb-separator {
    // Light mode breadcrumb separator adaptations
    color: var(--color-muted-foreground);
    
    > svg {
      color: var(--color-muted-foreground);
    }
  }
}

// Separator with custom content
.breadcrumb-separator {
  &.custom-content {
    > svg {
      display: none;
    }
    
    // Custom content is handled by slot
  }
  
  &.text-separator {
    > svg {
      display: none;
    }
    
    &::before {
      content: attr(data-separator);
      font-weight: 300;
      opacity: 0.7;
    }
  }
}

// Separator with spacing
.breadcrumb-separator {
  &.spacing-tight {
    margin: 0 0.25rem;
  }
  
  &.spacing-normal {
    margin: 0 0.375rem;
  }
  
  &.spacing-loose {
    margin: 0 0.5rem;
  }
  
  &.spacing-extra-loose {
    margin: 0 0.75rem;
  }
  
  &.spacing-none {
    margin: 0;
  }
}

// Separator with background
.breadcrumb-separator {
  &.with-background {
    background-color: var(--color-muted);
    padding: 0.125rem 0.25rem;
    border-radius: 0.125rem;
    
    &.rounded {
      border-radius: 0.125rem;
    }
    
    &.rounded-sm {
      border-radius: 0.0625rem;
    }
    
    &.rounded-md {
      border-radius: 0.1875rem;
    }
    
    &.rounded-lg {
      border-radius: 0.25rem;
    }
    
    &.rounded-full {
      border-radius: 9999px;
    }
  }
}

// Separator with border
.breadcrumb-separator {
  &.with-border {
    border: 1px solid var(--color-border);
    padding: 0.125rem 0.25rem;
    border-radius: 0.125rem;
    
    &.border-2 {
      border-width: 2px;
    }
    
    &.border-4 {
      border-width: 4px;
    }
  }
}

// Separator with shadow
.breadcrumb-separator {
  &.with-shadow {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    padding: 0.125rem 0.25rem;
    border-radius: 0.125rem;
    
    &.shadow-sm {
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    }
    
    &.shadow-md {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    &.shadow-lg {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
}

// Separator with animation on hover
.breadcrumb-separator {
  &.animate-on-hover {
    > svg {
      transition: transform 0.3s ease;
    }
    
    &:hover > svg {
      transform: rotate(90deg);
    }
  }
  
  &.scale-on-hover {
    > svg {
      transition: transform 0.3s ease;
    }
    
    &:hover > svg {
      transform: scale(1.2);
    }
  }
  
  &.fade-on-hover {
    > svg {
      transition: opacity 0.3s ease;
    }
    
    &:hover > svg {
      opacity: 0.5;
    }
  }
}

// Separator with custom rotation
.breadcrumb-separator {
  &.rotate-45 {
    > svg {
      transform: rotate(45deg);
    }
  }
  
  &.rotate-90 {
    > svg {
      transform: rotate(90deg);
    }
  }
  
  &.rotate-180 {
    > svg {
      transform: rotate(180deg);
    }
  }
  
  &.rotate-270 {
    > svg {
      transform: rotate(270deg);
    }
  }
}

// Separator with custom opacity
.breadcrumb-separator {
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

// Separator with custom visibility
.breadcrumb-separator {
  &.visible {
    visibility: visible;
  }
  
  &.invisible {
    visibility: hidden;
  }
}

// Separator with custom position
.breadcrumb-separator {
  &.static {
    position: static;
  }
  
  &.relative {
    position: relative;
  }
  
  &.absolute {
    position: absolute;
  }
  
  &.fixed {
    position: fixed;
  }
  
  &.sticky {
    position: sticky;
  }
}

// Separator with custom display
.breadcrumb-separator {
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
</style>
