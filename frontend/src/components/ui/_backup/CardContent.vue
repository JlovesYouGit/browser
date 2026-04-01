<template>
  <div
    data-slot="card-content"
    :class="contentClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

// Component props interface
interface CardContentProps {
  class?: string
}

// Define props
const props = defineProps<CardContentProps>()

// Computed classes
const contentClasses = computed(() => 
  cn("px-6 [&:last-child]:pb-6", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.card-content {
  // Base card content styles
  padding: 0 1.5rem;
  
  // Last child gets bottom padding
  &:last-child {
    padding-bottom: 1.5rem;
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for card content
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Card content styling is theme-agnostic
  }
  
  // Print styles
  @media print {
    padding: 0 1rem;
    
    &:last-child {
      padding-bottom: 1rem;
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
    padding: 0 1rem;
    
    &:last-child {
      padding-bottom: 1rem;
    }
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    padding: 0 0.75rem;
    
    &:last-child {
      padding-bottom: 0.75rem;
    }
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Padding variants
  &.padding-none {
    padding: 0;
    
    &:last-child {
      padding-bottom: 0;
    }
  }
  
  &.padding-xs {
    padding: 0 0.5rem;
    
    &:last-child {
      padding-bottom: 0.5rem;
    }
  }
  
  &.padding-sm {
    padding: 0 0.75rem;
    
    &:last-child {
      padding-bottom: 0.75rem;
    }
  }
  
  &.padding-md {
    padding: 0 1rem;
    
    &:last-child {
      padding-bottom: 1rem;
    }
  }
  
  &.padding-lg {
    padding: 0 1.25rem;
    
    &:last-child {
      padding-bottom: 1.25rem;
    }
  }
  
  &.padding-xl {
    padding: 0 1.5rem;
    
    &:last-child {
      padding-bottom: 1.5rem;
    }
  }
  
  &.padding-2xl {
    padding: 0 2rem;
    
    &:last-child {
      padding-bottom: 2rem;
    }
  }
  
  &.padding-3xl {
    padding: 0 2.5rem;
    
    &:last-child {
      padding-bottom: 2.5rem;
    }
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
.card-content {
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
  .card-content {
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
.card-content {
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
.card-content {
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
.card-content {
  &:active {
    transform: scale(0.98);
  }
}

// Loading state
.card-content {
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
.card-content {
  &.error {
    border-color: var(--color-destructive);
    background-color: color-mix(in srgb, var(--color-destructive) 5%, transparent);
  }
}

// Success state
.card-content {
  &.success {
    border-color: var(--color-chart-2);
    background-color: color-mix(in srgb, var(--color-chart-2) 5%, transparent);
  }
}

// Warning state
.card-content {
  &.warning {
    border-color: var(--color-chart-1);
    background-color: color-mix(in srgb, var(--color-chart-1) 5%, transparent);
  }
}

// Info state
.card-content {
  &.info {
    border-color: var(--color-chart-4);
    background-color: color-mix(in srgb, var(--color-chart-4) 5%, transparent);
  }
}

// Accessibility enhancements
.card-content {
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
.card-content {
  [dir="rtl"] & {
    // RTL specific adjustments
    // Card content is generally direction-agnostic
  }
}

// Print optimizations
@media print {
  .card-content {
    // Ensure card content prints correctly
    padding: 0 1rem;
    
    &:last-child {
      padding-bottom: 1rem;
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
  .card-content {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .card-content {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .card-content {
    // Dark mode card content adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .card-content {
    // Light mode card content adaptations are handled by CSS variables
  }
}

// Card content with scrollable content
.card-content {
  &.scrollable {
    max-height: 20rem;
    overflow-y: auto;
    padding-right: 1rem;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: var(--color-muted);
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--color-muted-foreground);
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: var(--color-foreground);
    }
    
    @media (max-width: 640px) {
      max-height: 16rem;
    }
  }
  
  &.scrollable-sm {
    max-height: 12rem;
  }
  
  &.scrollable-md {
    max-height: 16rem;
  }
  
  &.scrollable-lg {
    max-height: 24rem;
  }
  
  &.scrollable-xl {
    max-height: 32rem;
  }
}

// Card content with custom spacing
.card-content {
  &.spacing-tight {
    padding: 0 1rem;
    
    &:last-child {
      padding-bottom: 1rem;
    }
    
    @media (max-width: 640px) {
      padding: 0 0.75rem;
      
      &:last-child {
        padding-bottom: 0.75rem;
      }
    }
  }
  
  &.spacing-normal {
    padding: 0 1.5rem;
    
    &:last-child {
      padding-bottom: 1.5rem;
    }
    
    @media (max-width: 640px) {
      padding: 0 1rem;
      
      &:last-child {
        padding-bottom: 1rem;
      }
    }
  }
  
  &.spacing-loose {
    padding: 0 2rem;
    
    &:last-child {
      padding-bottom: 2rem;
    }
    
    @media (max-width: 640px) {
      padding: 0 1.5rem;
      
      &:last-child {
        padding-bottom: 1.5rem;
      }
    }
  }
  
  &.spacing-extra-loose {
    padding: 0 2.5rem;
    
    &:last-child {
      padding-bottom: 2.5rem;
    }
    
    @media (max-width: 640px) {
      padding: 0 2rem;
      
      &:last-child {
        padding-bottom: 2rem;
      }
    }
  }
}

// Card content with background pattern
.card-content {
  &.with-pattern {
    background-image: 
      radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    
    @media (prefers-color-scheme: dark) {
      background-image: 
        radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    }
  }
  
  &.with-dots {
    background-image: 
      radial-gradient(circle at 2px 2px, var(--color-muted-foreground) 1px, transparent 1px);
    background-size: 16px 16px;
    opacity: 0.3;
  }
  
  &.with-lines {
    background-image: 
      linear-gradient(0deg, var(--color-border) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.3;
  }
  
  &.with-grid {
    background-image: 
      linear-gradient(0deg, var(--color-border) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
    background-size: 24px 24px;
    opacity: 0.2;
  }
}

// Card content with gradient background
.card-content {
  &.gradient-vertical {
    background: linear-gradient(to bottom, var(--color-muted), transparent);
  }
  
  &.gradient-horizontal {
    background: linear-gradient(to right, var(--color-muted), transparent);
  }
  
  &.gradient-diagonal {
    background: linear-gradient(135deg, var(--color-muted), transparent);
  }
  
  &.gradient-radial {
    background: radial-gradient(circle, var(--color-muted), transparent);
  }
}

// Card content with custom height
.card-content {
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

// Card content with custom max height
.card-content {
  &.max-height-none {
    max-height: none;
  }
  
  &.max-height-32 {
    max-height: 8rem;
  }
  
  &.max-height-40 {
    max-height: 10rem;
  }
  
  &.max-height-48 {
    max-height: 12rem;
  }
  
  &.max-height-56 {
    max-height: 14rem;
  }
  
  &.max-height-64 {
    max-height: 16rem;
  }
  
  &.max-height-72 {
    max-height: 18rem;
  }
  
  &.max-height-80 {
    max-height: 20rem;
  }
  
  &.max-height-96 {
    max-height: 24rem;
  }
  
  &.max-height-screen {
    max-height: 100vh;
  }
}

// Card content with overflow handling
.card-content {
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

// Card content with text overflow handling
.card-content {
  &.text-overflow-ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  
  &.text-overflow-clip {
    text-overflow: clip;
    white-space: nowrap;
    overflow: hidden;
  }
  
  &.text-overflow-visible {
    text-overflow: visible;
    overflow: visible;
  }
}

// Card content with word break
.card-content {
  &.break-normal {
    word-break: normal;
    overflow-wrap: normal;
  }
  
  &.break-words {
    word-break: break-word;
    overflow-wrap: break-word;
  }
  
  &.break-all {
    word-break: break-all;
    overflow-wrap: anywhere;
  }
}

// Card content with hyphenation
.card-content {
  &.hyphenate-auto {
    hyphens: auto;
  }
  
  &.hyphenate-manual {
    hyphens: manual;
  }
  
  &.hyphenate-none {
    hyphens: none;
  }
}

// Card content with rich text support
.card-content {
  // Support for typography elements
  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    line-height: 1.25;
    font-weight: 600;
    color: var(--color-foreground);
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  h3 {
    font-size: 1.25rem;
  }
  
  h4 {
    font-size: 1.125rem;
  }
  
  h5 {
    font-size: 1rem;
  }
  
  h6 {
    font-size: 0.875rem;
  }
  
  p {
    margin-top: 1rem;
    margin-bottom: 1rem;
    line-height: 1.625;
    color: var(--color-foreground);
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  ul, ol {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    color: var(--color-foreground);
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
    
    li {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      line-height: 1.625;
      
      &:first-child {
        margin-top: 0;
      }
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  blockquote {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding-left: 1rem;
    border-left: 4px solid var(--color-border);
    font-style: italic;
    color: var(--color-muted-foreground);
    line-height: 1.625;
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
    
    p {
      margin: 0;
    }
  }
  
  code {
    background-color: var(--color-muted);
    color: var(--color-foreground);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.875em;
  }
  
  pre {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: var(--color-muted);
    color: var(--color-foreground);
    border-radius: 0.375rem;
    font-family: monospace;
    font-size: 0.875em;
    overflow-x: auto;
    line-height: 1.625;
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
    
    code {
      background: none;
      padding: 0;
    }
  }
  
  table {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
    
    th, td {
      padding: 0.5rem 1rem;
      text-align: left;
      border-bottom: 1px solid var(--color-border);
    }
    
    th {
      font-weight: 600;
      color: var(--color-foreground);
    }
    
    td {
      color: var(--color-muted-foreground);
    }
    
    thead th {
      border-bottom: 2px solid var(--color-border);
    }
    
    tbody tr:last-child td {
      border-bottom: none;
    }
  }
  
  hr {
    margin-top: 2rem;
    margin-bottom: 2rem;
    border: none;
    border-top: 1px solid var(--color-border);
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  img {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    max-width: 100%;
    height: auto;
    border-radius: 0.375rem;
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  a {
    color: var(--color-primary);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;
    
    &:hover {
      border-bottom-color: var(--color-primary);
    }
    
    &:focus {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }
  }
  
  strong, b {
    font-weight: 600;
    color: var(--color-foreground);
  }
  
  em, i {
    font-style: italic;
  }
  
  u {
    text-decoration: underline;
    text-decoration-color: var(--color-muted-foreground);
  }
  
  s, del {
    text-decoration: line-through;
    text-decoration-color: var(--color-muted-foreground);
  }
  
  mark {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
  }
}
</style>
