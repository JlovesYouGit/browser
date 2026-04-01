<template>
  <div
    data-slot="card-footer"
    :class="footerClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

// Component props interface
interface CardFooterProps {
  class?: string
}

// Define props
const props = defineProps<CardFooterProps>()

// Computed classes
const footerClasses = computed(() => 
  cn("flex items-center px-6 pb-6 [.border-t]:pt-6", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.card-footer {
  // Base card footer styles
  display: flex;
  align-items: center;
  padding: 0 1.5rem 1.5rem;
  
  // When there's a top border
  &.border-t {
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-border);
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for card footer
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Card footer styling is theme-agnostic
  }
  
  // Print styles
  @media print {
    padding: 0 1rem 1rem;
    
    &.border-t {
      border-top: 1px solid #000;
      padding-top: 1rem;
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
    padding: 0 1rem 1rem;
    
    &.border-t {
      padding-top: 1rem;
    }
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    padding: 0 0.75rem 0.75rem;
    
    &.border-t {
      padding-top: 0.75rem;
    }
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Flex direction variants
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
  
  &.padding-3xl {
    padding: 2rem;
  }
  
  // Horizontal padding variants
  &.px-none {
    padding-left: 0;
    padding-right: 0;
  }
  
  &.px-xs {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
  
  &.px-sm {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  
  &.px-md {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  
  &.px-lg {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  &.px-xl {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
  
  &.px-2xl {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  &.px-3xl {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  
  // Vertical padding variants
  &.py-none {
    padding-top: 0;
    padding-bottom: 0;
  }
  
  &.py-xs {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
  
  &.py-sm {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  
  &.py-md {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  
  &.py-lg {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  
  &.py-xl {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }
  
  &.py-2xl {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  
  &.py-3xl {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  
  // Bottom padding variants
  &.pb-none {
    padding-bottom: 0;
  }
  
  &.pb-xs {
    padding-bottom: 0.25rem;
  }
  
  &.pb-sm {
    padding-bottom: 0.5rem;
  }
  
  &.pb-md {
    padding-bottom: 0.75rem;
  }
  
  &.pb-lg {
    padding-bottom: 1rem;
  }
  
  &.pb-xl {
    padding-bottom: 1.25rem;
  }
  
  &.pb-2xl {
    padding-bottom: 1.5rem;
  }
  
  &.pb-3xl {
    padding-bottom: 2rem;
  }
  
  // Top padding variants
  &.pt-none {
    padding-top: 0;
  }
  
  &.pt-xs {
    padding-top: 0.25rem;
  }
  
  &.pt-sm {
    padding-top: 0.5rem;
  }
  
  &.pt-md {
    padding-top: 0.75rem;
  }
  
  &.pt-lg {
    padding-top: 1rem;
  }
  
  &.pt-xl {
    padding-top: 1.25rem;
  }
  
  &.pt-2xl {
    padding-top: 1.5rem;
  }
  
  &.pt-3xl {
    padding-top: 2rem;
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
  
  &.rounded-full {
    border-radius: 50%;
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
.card-footer {
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

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .card-footer {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in,
    &.slide-up {
      animation: none;
    }
  }
}

// Hover effects
.card-footer {
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
  
  &.hover-shrink {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(0.99);
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
.card-footer {
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
.card-footer {
  &:active {
    transform: scale(0.98);
  }
}

// Loading state
.card-footer {
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
.card-footer {
  &.error {
    border-top-color: var(--color-destructive);
    background-color: color-mix(in srgb, var(--color-destructive) 5%, transparent);
  }
}

// Success state
.card-footer {
  &.success {
    border-top-color: var(--color-chart-2);
    background-color: color-mix(in srgb, var(--color-chart-2) 5%, transparent);
  }
}

// Warning state
.card-footer {
  &.warning {
    border-top-color: var(--color-chart-1);
    background-color: color-mix(in srgb, var(--color-chart-1) 5%, transparent);
  }
}

// Info state
.card-footer {
  &.info {
    border-top-color: var(--color-chart-4);
    background-color: color-mix(in srgb, var(--color-chart-4) 5%, transparent);
  }
}

// Accessibility enhancements
.card-footer {
  // Ensure proper color contrast
  color: inherit;
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    border-top: 2px solid currentColor;
    
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
.card-footer {
  [dir="rtl"] & {
    // RTL specific adjustments
    // Card footer is generally direction-agnostic
  }
}

// Print optimizations
@media print {
  .card-footer {
    // Ensure card footer prints correctly
    padding: 0 1rem 1rem;
    
    &.border-t {
      border-top: 1px solid #000;
      padding-top: 1rem;
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
  .card-footer {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .card-footer {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .card-footer {
    // Dark mode card footer adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .card-footer {
    // Light mode card footer adaptations are handled by CSS variables
  }
}

// Card footer with custom spacing
.card-footer {
  &.spacing-tight {
    padding: 0 1rem 1rem;
    
    &.border-t {
      padding-top: 1rem;
    }
    
    @media (max-width: 640px) {
      padding: 0 0.75rem 0.75rem;
      
      &.border-t {
        padding-top: 0.75rem;
      }
    }
  }
  
  &.spacing-normal {
    padding: 0 1.5rem 1.5rem;
    
    &.border-t {
      padding-top: 1.5rem;
    }
    
    @media (max-width: 640px) {
      padding: 0 1rem 1rem;
      
      &.border-t {
        padding-top: 1rem;
      }
    }
  }
  
  &.spacing-loose {
    padding: 0 2rem 2rem;
    
    &.border-t {
      padding-top: 2rem;
    }
    
    @media (max-width: 640px) {
      padding: 0 1.5rem 1.5rem;
      
      &.border-t {
        padding-top: 1.5rem;
      }
    }
  }
  
  &.spacing-extra-loose {
    padding: 0 2.5rem 2.5rem;
    
    &.border-t {
      padding-top: 2.5rem;
    }
    
    @media (max-width: 640px) {
      padding: 0 2rem 2rem;
      
      &.border-t {
        padding-top: 2rem;
      }
    }
  }
}

// Card footer with button actions
.card-footer {
  &.with-actions {
    justify-content: flex-end;
    gap: 0.5rem;
    
    &.actions-start {
      justify-content: flex-start;
    }
    
    &.actions-center {
      justify-content: center;
    }
    
    &.actions-between {
      justify-content: space-between;
    }
    
    &.actions-around {
      justify-content: space-around;
    }
    
    &.actions-evenly {
      justify-content: space-evenly;
    }
  }
}

// Card footer with metadata
.card-footer {
  &.with-metadata {
    justify-content: space-between;
    align-items: center;
    
    .metadata {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-muted-foreground);
      font-size: 0.875rem;
      
      .metadata-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        
        > svg {
          width: 1rem;
          height: 1rem;
        }
      }
    }
    
    .actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
}

// Card footer with status
.card-footer {
  &.with-status {
    justify-content: space-between;
    align-items: center;
    
    .status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      
      &::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        flex-shrink: 0;
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
      
      &.status-warning::before {
        background-color: var(--color-chart-3);
      }
      
      &.status-success::before {
        background-color: var(--color-chart-2);
      }
      
      &.status-info::before {
        background-color: var(--color-chart-4);
      }
    }
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

// Card footer with progress
.card-footer {
  &.with-progress {
    flex-direction: column;
    gap: 0.75rem;
    
    .progress-bar {
      width: 100%;
      height: 0.5rem;
      background-color: var(--color-muted);
      border-radius: 9999px;
      overflow: hidden;
      
      .progress-fill {
        height: 100%;
        background-color: var(--color-primary);
        border-radius: 9999px;
        transition: width 0.3s ease;
      }
    }
    
    .progress-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
      color: var(--color-muted-foreground);
    }
  }
}

// Card footer with pagination
.card-footer {
  &.with-pagination {
    justify-content: center;
    gap: 0.5rem;
    
    .pagination-info {
      font-size: 0.875rem;
      color: var(--color-muted-foreground);
    }
    
    .pagination-controls {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      
      .pagination-button {
        padding: 0.25rem 0.5rem;
        border: 1px solid var(--color-border);
        border-radius: 0.25rem;
        background-color: var(--color-background);
        color: var(--color-foreground);
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
          background-color: var(--color-accent);
          color: var(--color-accent-foreground);
        }
        
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        &.active {
          background-color: var(--color-primary);
          color: var(--color-primary-foreground);
          border-color: var(--color-primary);
        }
      }
    }
  }
}

// Card footer with tabs
.card-footer {
  &.with-tabs {
    justify-content: center;
    border-top: 1px solid var(--color-border);
    
    .tabs {
      display: flex;
      gap: 0.5rem;
      
      .tab {
        padding: 0.5rem 1rem;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--color-muted-foreground);
        
        &:hover {
          color: var(--color-foreground);
          border-bottom-color: var(--color-muted-foreground);
        }
        
        &.active {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary);
        }
      }
    }
  }
}

// Card footer with navigation
.card-footer {
  &.with-navigation {
    justify-content: space-between;
    align-items: center;
    
    .nav-prev,
    .nav-next {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: 1px solid var(--color-border);
      border-radius: 0.375rem;
      background-color: var(--color-background);
      color: var(--color-foreground);
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: var(--color-accent);
        color: var(--color-accent-foreground);
      }
      
      &:focus {
        outline: 2px solid var(--color-ring);
        outline-offset: 2px;
      }
      
      > svg {
        width: 1rem;
        height: 1rem;
      }
    }
    
    .nav-info {
      font-size: 0.875rem;
      color: var(--color-muted-foreground);
    }
  }
}

// Card footer with share buttons
.card-footer {
  &.with-share {
    justify-content: center;
    gap: 0.5rem;
    
    .share-button {
      width: 2.5rem;
      height: 2.5rem;
      padding: 0;
      border: 1px solid var(--color-border);
      border-radius: 0.375rem;
      background-color: var(--color-background);
      color: var(--color-foreground);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      
      > svg {
        width: 1rem;
        height: 1rem;
      }
      
      &:hover {
        background-color: var(--color-accent);
        color: var(--color-accent-foreground);
      }
      
      &:focus {
        outline: 2px solid var(--color-ring);
        outline-offset: 2px;
      }
      
      &.twitter:hover {
        background-color: #1DA1F2;
        color: white;
        border-color: #1DA1F2;
      }
      
      &.facebook:hover {
        background-color: #1877F2;
        color: white;
        border-color: #1877F2;
      }
      
      &.linkedin:hover {
        background-color: #0077B5;
        color: white;
        border-color: #0077B5;
      }
      
      &.email:hover {
        background-color: var(--color-primary);
        color: var(--color-primary-foreground);
        border-color: var(--color-primary);
      }
    }
  }
}

// Card footer with rating
.card-footer {
  &.with-rating {
    justify-content: space-between;
    align-items: center;
    
    .rating {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      
      .star {
        width: 1rem;
        height: 1rem;
        color: var(--color-muted-foreground);
        
        &.filled {
          color: var(--color-warning);
        }
        
        &.half-filled {
          position: relative;
          
          &::before {
            content: '★';
            position: absolute;
            left: 0;
            top: 0;
            width: 50%;
            overflow: hidden;
            color: var(--color-warning);
          }
        }
      }
      
      .rating-value {
        font-size: 0.875rem;
        color: var(--color-muted-foreground);
        margin-left: 0.25rem;
      }
    }
    
    .rating-count {
      font-size: 0.875rem;
      color: var(--color-muted-foreground);
    }
  }
}

// Card footer with tags
.card-footer {
  &.with-tags {
    flex-wrap: wrap;
    gap: 0.5rem;
    
    .tag {
      padding: 0.25rem 0.5rem;
      background-color: var(--color-muted);
      color: var(--color-muted-foreground);
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: var(--color-accent);
        color: var(--color-accent-foreground);
      }
      
      &.primary {
        background-color: var(--color-primary);
        color: var(--color-primary-foreground);
        
        &:hover {
          background-color: color-mix(in srgb, var(--color-primary) 90%, transparent);
        }
      }
      
      &.secondary {
        background-color: var(--color-secondary);
        color: var(--color-secondary-foreground);
        
        &:hover {
          background-color: color-mix(in srgb, var(--color-secondary) 90%, transparent);
        }
      }
    }
  }
}

// Card footer with timestamp
.card-footer {
  &.with-timestamp {
    justify-content: space-between;
    align-items: center;
    
    .timestamp {
      font-size: 0.875rem;
      color: var(--color-muted-foreground);
      display: flex;
      align-items: center;
      gap: 0.25rem;
      
      > svg {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>
