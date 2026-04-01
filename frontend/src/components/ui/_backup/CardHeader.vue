<template>
  <div
    data-slot="card-header"
    :class="headerClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

// Component props interface
interface CardHeaderProps {
  class?: string
}

// Define props
const props = defineProps<CardHeaderProps>()

// Computed classes
const headerClasses = computed(() => 
  cn("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.card-header {
  // Base card header styles
  display: grid;
  grid-auto-rows: min-content;
  grid-template-rows: auto auto;
  align-items: flex-start;
  gap: 0.375rem;
  padding: 1.5rem 1.5rem 0;
  
  // Container query for card header
  @container card-header {
    // Container query styles
  }
  
  // When card action is present
  &:has([data-slot="card-action"]) {
    grid-template-columns: 1fr auto;
  }
  
  // When there's a bottom border
  &.border-b {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-border);
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for card header
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Card header styling is theme-agnostic
  }
  
  // Print styles
  @media print {
    // Ensure card header prints correctly
    padding: 1rem 1rem 0;
    
    &.border-b {
      border-bottom: 1px solid #000;
    }
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    padding: 1rem 1rem 0;
    gap: 0.25rem;
    
    &.border-b {
      padding-bottom: 1rem;
    }
    
    &:has([data-slot="card-action"]) {
      grid-template-columns: 1fr auto;
      gap: 0.5rem;
    }
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    padding: 0.75rem 0.75rem 0;
    gap: 0.1875rem;
    
    &.border-b {
      padding-bottom: 0.75rem;
    }
    
    &:has([data-slot="card-action"]) {
      grid-template-columns: 1fr auto;
      gap: 0.375rem;
    }
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
  
  &.gap-2xl {
    gap: 1.5rem;
  }
  
  // Padding variants
  &.padding-none {
    padding: 0;
  }
  
  &.padding-xs {
    padding: 0.25rem 0.25rem 0;
  }
  
  &.padding-sm {
    padding: 0.5rem 0.5rem 0;
  }
  
  &.padding-md {
    padding: 0.75rem 0.75rem 0;
  }
  
  &.padding-lg {
    padding: 1rem 1rem 0;
  }
  
  &.padding-xl {
    padding: 1.25rem 1.25rem 0;
  }
  
  &.padding-2xl {
    padding: 1.5rem 1.5rem 0;
  }
  
  &.padding-3xl {
    padding: 2rem 2rem 0;
  }
  
  // Border variants
  &.border-none {
    border: none;
  }
  
  &.border {
    border: 1px solid var(--color-border);
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
  
  &.border-2 {
    border: 2px solid var(--color-border);
  }
  
  &.border-t-2 {
    border-top: 2px solid var(--color-border);
  }
  
  &.border-r-2 {
    border-right: 2px solid var(--color-border);
  }
  
  &.border-b-2 {
    border-bottom: 2px solid var(--color-border);
  }
  
  &.border-l-2 {
    border-left: 2px solid var(--color-border);
  }
  
  // Background variants
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
  
  // Grid layout variants
  &.grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  
  &.grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  &.grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  
  &.grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  
  &.grid-cols-auto {
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  }
  
  // Alignment variants
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
.card-header {
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
  .card-header {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in,
    &.slide-down {
      animation: none;
    }
  }
}

// Hover effects
.card-header {
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
.card-header {
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
.card-header {
  &:active {
    transform: scale(0.99);
  }
}

// Loading state
.card-header {
  &.loading {
    opacity: 0.7;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1.5rem;
      height: 1.5rem;
      margin: -0.75rem 0 0 -0.75rem;
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
.card-header {
  &.error {
    border-bottom-color: var(--color-destructive);
    
    &.border-b {
      border-bottom-color: var(--color-destructive);
    }
  }
}

// Success state
.card-header {
  &.success {
    border-bottom-color: var(--color-chart-2);
    
    &.border-b {
      border-bottom-color: var(--color-chart-2);
    }
  }
}

// Warning state
.card-header {
  &.warning {
    border-bottom-color: var(--color-chart-1);
    
    &.border-b {
      border-bottom-color: var(--color-chart-1);
    }
  }
}

// Info state
.card-header {
  &.info {
    border-bottom-color: var(--color-chart-4);
    
    &.border-b {
      border-bottom-color: var(--color-chart-4);
    }
  }
}

// Accessibility enhancements
.card-header {
  // Ensure proper color contrast
  color: inherit;
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    &.border-b {
      border-bottom: 2px solid currentColor;
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
.card-header {
  [dir="rtl"] & {
    // RTL specific adjustments
    // Card header is generally direction-agnostic
  }
}

// Print optimizations
@media print {
  .card-header {
    // Ensure card header prints correctly
    padding: 1rem 1rem 0;
    
    &.border-b {
      border-bottom: 1px solid #000;
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
  .card-header {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .card-header {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .card-header {
    // Dark mode card header adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .card-header {
    // Light mode card header adaptations are handled by CSS variables
  }
}

// Card header with custom spacing
.card-header {
  &.spacing-tight {
    gap: 0.25rem;
    padding: 1rem 1rem 0;
    
    &.border-b {
      padding-bottom: 1rem;
    }
    
    @media (max-width: 640px) {
      gap: 0.1875rem;
      padding: 0.75rem 0.75rem 0;
      
      &.border-b {
        padding-bottom: 0.75rem;
      }
    }
  }
  
  &.spacing-normal {
    gap: 0.375rem;
    padding: 1.5rem 1.5rem 0;
    
    &.border-b {
      padding-bottom: 1.5rem;
    }
    
    @media (max-width: 640px) {
      gap: 0.25rem;
      padding: 1rem 1rem 0;
      
      &.border-b {
        padding-bottom: 1rem;
      }
    }
  }
  
  &.spacing-loose {
    gap: 0.5rem;
    padding: 2rem 2rem 0;
    
    &.border-b {
      padding-bottom: 2rem;
    }
    
    @media (max-width: 640px) {
      gap: 0.375rem;
      padding: 1.5rem 1.5rem 0;
      
      &.border-b {
        padding-bottom: 1.5rem;
      }
    }
  }
  
  &.spacing-extra-loose {
    gap: 0.75rem;
    padding: 2.5rem 2.5rem 0;
    
    &.border-b {
      padding-bottom: 2.5rem;
    }
    
    @media (max-width: 640px) {
      gap: 0.5rem;
      padding: 2rem 2rem 0;
      
      &.border-b {
        padding-bottom: 2rem;
      }
    }
  }
}

// Card header with custom layout
.card-header {
  &.layout-horizontal {
    grid-template-columns: auto 1fr;
    gap: 1rem;
    
    &:has([data-slot="card-action"]) {
      grid-template-columns: auto 1fr auto;
    }
  }
  
  &.layout-vertical {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 0.5rem;
    
    &:has([data-slot="card-action"]) {
      grid-template-columns: 1fr auto;
      grid-template-rows: auto auto;
    }
  }
  
  &.layout-center {
    justify-content: center;
    text-align: center;
    
    &:has([data-slot="card-action"]) {
      justify-content: space-between;
    }
  }
}

// Card header with background
.card-header {
  &.with-background {
    background-color: var(--color-muted);
    border-radius: 0.75rem 0.75rem 0 0;
    margin: -1.5rem -1.5rem 1rem -1.5rem;
    padding: 2rem 2rem 1rem;
    
    @media (max-width: 640px) {
      margin: -1rem -1rem 0.75rem -1rem;
      padding: 1.5rem 1.5rem 0.75rem;
    }
  }
  
  &.with-gradient {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: white;
    border-radius: 0.75rem 0.75rem 0 0;
    margin: -1.5rem -1.5rem 1rem -1.5rem;
    padding: 2rem 2rem 1rem;
    
    @media (max-width: 640px) {
      margin: -1rem -1rem 0.75rem -1rem;
      padding: 1.5rem 1.5rem 0.75rem;
    }
  }
}

// Card header with image
.card-header {
  &.with-image {
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 8rem;
    margin: -1.5rem -1.5rem 1rem -1.5rem;
    border-radius: 0.75rem 0.75rem 0 0;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6));
      border-radius: 0.75rem 0.75rem 0 0;
      z-index: 1;
    }
    
    > * {
      position: relative;
      z-index: 2;
      color: white;
    }
    
    @media (max-width: 640px) {
      margin: -1rem -1rem 0.75rem -1rem;
      border-radius: 0.5rem 0.5rem 0 0;
      
      &::before {
        border-radius: 0.5rem 0.5rem 0 0;
      }
    }
  }
}

// Card header with status indicator
.card-header {
  &.with-status {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      border-radius: 0.75rem 0.75rem 0 0;
      
      .status-success & {
        background-color: var(--color-chart-2);
      }
      
      .status-warning & {
        background-color: var(--color-chart-1);
      }
      
      .status-error & {
        background-color: var(--color-destructive);
      }
      
      .status-info & {
        background-color: var(--color-chart-4);
      }
    }
    
    @media (max-width: 640px) {
      &::before {
        border-radius: 0.5rem 0.5rem 0 0;
      }
    }
  }
}

// Card header with badge
.card-header {
  &.with-badge {
    position: relative;
    
    .badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background-color: var(--color-primary);
      color: var(--color-primary-foreground);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      z-index: 10;
      
      @media (max-width: 640px) {
        top: 0.75rem;
        right: 0.75rem;
      }
    }
  }
}

// Card header with tabs
.card-header {
  &.with-tabs {
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 0;
    
    .tabs {
      display: flex;
      gap: 0.5rem;
      padding: 0 1.5rem;
      margin: 0 -1.5rem;
      border-bottom: 2px solid var(--color-border);
      
      @media (max-width: 640px) {
        padding: 0 1rem;
        margin: 0 -1rem;
      }
      
      .tab {
        padding: 0.5rem 1rem;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary);
        }
        
        &.active {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary);
        }
      }
    }
  }
}

// Card header with progress
.card-header {
  &.with-progress {
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--color-muted);
      
      &[data-progress]::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: var(--color-primary);
        width: attr(data-progress);
      }
    }
  }
}
</style>
