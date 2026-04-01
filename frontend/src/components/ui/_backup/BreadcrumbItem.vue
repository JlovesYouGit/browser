<template>
  <li
    data-slot="breadcrumb-item"
    :class="itemClasses"
    v-bind="$attrs"
  >
    <slot />
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

// Component props interface
interface BreadcrumbItemProps {
  class?: string
}

// Define props
const props = defineProps<BreadcrumbItemProps>()

// Computed classes
const itemClasses = computed(() => 
  cn("inline-flex items-center gap-1.5", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.breadcrumb-item {
  // Base breadcrumb item styles
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for breadcrumb item
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Breadcrumb item is theme-agnostic
  }
  
  // Print styles
  @media print {
    // Ensure breadcrumb item prints correctly
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    gap: 0.25rem;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    gap: 0.1875rem;
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Gap variants
  &.gap-none {
    gap: 0;
  }
  
  &.gap-xs {
    gap: 0.25rem;
  }
  
  &.gap-sm {
    gap: 0.375rem;
  }
  
  &.gap-md {
    gap: 0.5rem;
  }
  
  &.gap-lg {
    gap: 0.75rem;
  }
  
  &.gap-xl {
    gap: 1rem;
  }
  
  // Alignment variants
  &.align-start {
    align-items: flex-start;
  }
  
  &.align-center {
    align-items: center;
  }
  
  &.align-end {
    align-items: flex-end;
  }
  
  &.align-stretch {
    align-items: stretch;
  }
  
  // Direction variants
  &.flex-row {
    flex-direction: row;
  }
  
  &.flex-row-reverse {
    flex-direction: row-reverse;
  }
  
  &.flex-column {
    flex-direction: column;
  }
  
  &.flex-column-reverse {
    flex-direction: column-reverse;
  }
  
  // Justify variants
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
.breadcrumb-item {
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

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .breadcrumb-item {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in {
      animation: none;
    }
  }
}

// Hover effects
.breadcrumb-item {
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
}

// Focus effects
.breadcrumb-item {
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
.breadcrumb-item {
  &.active {
    // Active breadcrumb item styles
    color: var(--color-foreground);
    font-weight: 500;
  }
}

// Disabled state
.breadcrumb-item {
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
    
    > * {
      pointer-events: none;
    }
  }
}

// Loading state
.breadcrumb-item {
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
.breadcrumb-item {
  &.error {
    color: var(--color-destructive);
    
    > * {
      color: var(--color-destructive);
    }
  }
}

// Success state
.breadcrumb-item {
  &.success {
    color: var(--color-chart-2);
    
    > * {
      color: var(--color-chart-2);
    }
  }
}

// Warning state
.breadcrumb-item {
  &.warning {
    color: var(--color-chart-1);
    
    > * {
      color: var(--color-chart-1);
    }
  }
}

// Info state
.breadcrumb-item {
  &.info {
    color: var(--color-chart-4);
    
    > * {
      color: var(--color-chart-4);
    }
  }
}

// Accessibility enhancements
.breadcrumb-item {
  // Ensure proper color contrast
  color: inherit;
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    // High contrast styles
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
.breadcrumb-item {
  [dir="rtl"] & {
    // RTL specific adjustments
    flex-direction: row-reverse;
  }
}

// Print optimizations
@media print {
  .breadcrumb-item {
    // Ensure breadcrumb item prints correctly
    color: #000;
    
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
  .breadcrumb-item {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .breadcrumb-item {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .breadcrumb-item {
    // Dark mode breadcrumb item adaptations
  }
}

@media (prefers-color-scheme: light) {
  .breadcrumb-item {
    // Light mode breadcrumb item adaptations
  }
}

// Breadcrumb item with custom spacing
.breadcrumb-item {
  &.spacing-tight {
    gap: 0.25rem;
  }
  
  &.spacing-normal {
    gap: 0.375rem;
  }
  
  &.spacing-loose {
    gap: 0.5rem;
  }
  
  &.spacing-extra-loose {
    gap: 0.75rem;
  }
}

// Breadcrumb item with custom alignment
.breadcrumb-item {
  &.align-baseline {
    align-items: baseline;
  }
  
  &.align-text-top {
    align-items: text-top;
  }
  
  &.align-text-bottom {
    align-items: text-bottom;
  }
}

// Breadcrumb item with custom sizing
.breadcrumb-item {
  &.size-xs {
    font-size: 0.75rem;
    gap: 0.25rem;
  }
  
  &.size-sm {
    font-size: 0.875rem;
    gap: 0.3125rem;
  }
  
  &.size-md {
    font-size: 1rem;
    gap: 0.375rem;
  }
  
  &.size-lg {
    font-size: 1.125rem;
    gap: 0.4375rem;
  }
  
  &.size-xl {
    font-size: 1.25rem;
    gap: 0.5rem;
  }
}

// Breadcrumb item with custom weight
.breadcrumb-item {
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
}

// Breadcrumb item with custom transform
.breadcrumb-item {
  &.transform-none {
    transform: none;
  }
  
  &.transform-scale-95 {
    transform: scale(0.95);
  }
  
  &.transform-scale-100 {
    transform: scale(1);
  }
  
  &.transform-scale-105 {
    transform: scale(1.05);
  }
  
  &.transform-scale-110 {
    transform: scale(1.1);
  }
}

// Breadcrumb item with custom opacity
.breadcrumb-item {
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

// Breadcrumb item with custom visibility
.breadcrumb-item {
  &.visible {
    visibility: visible;
  }
  
  &.invisible {
    visibility: hidden;
  }
}

// Breadcrumb item with custom position
.breadcrumb-item {
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

// Breadcrumb item with custom display
.breadcrumb-item {
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

// Breadcrumb item with custom cursor
.breadcrumb-item {
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

// Breadcrumb item with custom user select
.breadcrumb-item {
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

// Breadcrumb item with custom pointer events
.breadcrumb-item {
  &.pointer-events-none {
    pointer-events: none;
  }
  
  &.pointer-events-auto {
    pointer-events: auto;
  }
}
</style>
