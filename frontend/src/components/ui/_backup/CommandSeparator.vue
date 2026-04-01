<template>
  <CommandSeparatorRoot
    data-slot="command-separator"
    :class="separatorClasses"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Command } from 'cmdk-vue'
import { cn } from '@/utils/cn'

// Component props interface
interface CommandSeparatorProps {
  class?: string
}

// Define props
const props = defineProps<CommandSeparatorProps>()

// Use Command Separator component
const CommandSeparatorRoot = Command.Separator

// Computed classes
const separatorClasses = computed(() => 
  cn(
    "bg-border -mx-1 h-px",
    props.class
  )
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.command-separator {
  // Base command separator styles
  background-color: var(--color-border);
  margin-left: -0.25rem;
  margin-right: -0.25rem;
  height: 1px;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // Reduce animations for command separator
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Command separator styling is theme-agnostic
  }
  
  // Print styles
  @media print {
    // Ensure command separator prints correctly
    background-color: #000;
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    // Mobile-specific command separator optimizations
    margin-left: -0.1875rem;
    margin-right: -0.1875rem;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    // Small mobile command separator optimizations
    margin-left: -0.125rem;
    margin-right: -0.125rem;
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
.command-separator {
  &.fade-in {
    animation: fadeIn 0.2s ease-out forwards;
  }
  
  &.slide-in {
    animation: slideIn 0.2s ease-out forwards;
  }
  
  &.zoom-in {
    animation: zoomIn 0.2s ease-out forwards;
  }
  
  &.bounce-in {
    animation: bounceIn 0.3s ease-out forwards;
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
    transform: scale(0.9);
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
  .command-separator {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in {
      animation: none;
    }
  }
}

// Hover effects
.command-separator {
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
}

// Focus effects
.command-separator {
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
.command-separator {
  &:active {
    transform: scale(0.98);
  }
}

// Loading state
.command-separator {
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

// Error state
.command-separator {
  &.error {
    background-color: var(--color-destructive);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-destructive) 80%, transparent);
    }
  }
}

// Success state
.command-separator {
  &.success {
    background-color: var(--color-chart-2);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-2) 80%, transparent);
    }
  }
}

// Warning state
.command-separator {
  &.warning {
    background-color: var(--color-chart-1);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-1) 80%, transparent);
    }
  }
}

// Info state
.command-separator {
  &.info {
    background-color: var(--color-chart-4);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-4) 80%, transparent);
    }
  }
}

// Accessibility enhancements
.command-separator {
  // Ensure proper color contrast
  background-color: var(--color-border);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    background-color: currentColor;
    height: 2px;
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
.command-separator {
  [dir="rtl"] & {
    // RTL specific adjustments for command separator
    direction: rtl;
  }
}

// Print optimizations
@media print {
  .command-separator {
    // Ensure command separator prints correctly
    background-color: #000;
    
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
  .command-separator {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .command-separator {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .command-separator {
    // Dark mode command separator adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .command-separator {
    // Light mode command separator adaptations are handled by CSS variables
  }
}

// Command separator with custom background
.command-separator {
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
  }
  
  &.bg-secondary {
    background-color: var(--color-secondary);
  }
  
  &.bg-success {
    background-color: var(--color-chart-2);
  }
  
  &.bg-warning {
    background-color: var(--color-chart-1);
  }
  
  &.bg-info {
    background-color: var(--color-chart-4);
  }
  
  &.bg-error {
    background-color: var(--color-destructive);
  }
}

// Command separator with custom height
.command-separator {
  &.h-px {
    height: 1px;
  }
  
  &.h-0-5 {
    height: 0.125rem;
  }
  
  &.h-1 {
    height: 0.25rem;
  }
  
  &.h-1-5 {
    height: 0.375rem;
  }
  
  &.h-2 {
    height: 0.5rem;
  }
  
  &.h-2-5 {
    height: 0.625rem;
  }
  
  &.h-3 {
    height: 0.75rem;
  }
  
  &.h-3-5 {
    height: 0.875rem;
  }
  
  &.h-4 {
    height: 1rem;
  }
  
  &.h-5 {
    height: 1.25rem;
  }
  
  &.h-6 {
    height: 1.5rem;
  }
  
  &.h-8 {
    height: 2rem;
  }
  
  &.h-10 {
    height: 2.5rem;
  }
  
  &.h-12 {
    height: 3rem;
  }
  
  &.h-16 {
    height: 4rem;
  }
  
  &.h-20 {
    height: 5rem;
  }
  
  &.h-24 {
    height: 6rem;
  }
  
  &.h-32 {
    height: 8rem;
  }
  
  &.h-40 {
    height: 10rem;
  }
  
  &.h-48 {
    height: 12rem;
  }
  
  &.h-56 {
    height: 14rem;
  }
  
  &.h-64 {
    height: 16rem;
  }
  
  &.h-auto {
    height: auto;
  }
  
  &.h-full {
    height: 100%;
  }
  
  &.h-screen {
    height: 100vh;
  }
}

// Command separator with custom margin
.command-separator {
  &.-mx-1 {
    margin-left: -0.25rem;
    margin-right: -0.25rem;
  }
  
  &.-mx-2 {
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }
  
  &.-mx-3 {
    margin-left: -0.75rem;
    margin-right: -0.75rem;
  }
  
  &.-mx-4 {
    margin-left: -1rem;
    margin-right: -1rem;
  }
  
  &.-mx-5 {
    margin-left: -1.25rem;
    margin-right: -1.25rem;
  }
  
  &.-mx-6 {
    margin-left: -1.5rem;
    margin-right: -1.5rem;
  }
  
  &.-mx-8 {
    margin-left: -2rem;
    margin-right: -2rem;
  }
  
  &.-mx-10 {
    margin-left: -2.5rem;
    margin-right: -2.5rem;
  }
  
  &.-mx-12 {
    margin-left: -3rem;
    margin-right: -3rem;
  }
  
  &.-mx-16 {
    margin-left: -4rem;
    margin-right: -4rem;
  }
  
  &.-mx-20 {
    margin-left: -5rem;
    margin-right: -5rem;
  }
  
  &.-mx-24 {
    margin-left: -6rem;
    margin-right: -6rem;
  }
  
  &.-mx-32 {
    margin-left: -8rem;
    margin-right: -8rem;
  }
  
  &.-mx-40 {
    margin-left: -10rem;
    margin-right: -10rem;
  }
  
  &.-mx-48 {
    margin-left: -12rem;
    margin-right: -12rem;
  }
  
  &.-mx-56 {
    margin-left: -14rem;
    margin-right: -14rem;
  }
  
  &.-mx-64 {
    margin-left: -16rem;
    margin-right: -16rem;
  }
  
  &.-mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  
  &.-mx-none {
    margin-left: 0;
    margin-right: 0;
  }
  
  &.m-0 {
    margin: 0;
  }
  
  &.m-1 {
    margin: 0.25rem;
  }
  
  &.m-2 {
    margin: 0.5rem;
  }
  
  &.m-3 {
    margin: 0.75rem;
  }
  
  &.m-4 {
    margin: 1rem;
  }
  
  &.m-5 {
    margin: 1.25rem;
  }
  
  &.m-6 {
    margin: 1.5rem;
  }
  
  &.m-8 {
    margin: 2rem;
  }
  
  &.m-10 {
    margin: 2.5rem;
  }
  
  &.m-12 {
    margin: 3rem;
  }
  
  &.mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  
  &.my-auto {
    margin-top: auto;
    margin-bottom: auto;
  }
}

// Command separator with custom border radius
.command-separator {
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

// Command separator with custom opacity
.command-separator {
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

// Command separator with custom cursor
.command-separator {
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

// Command separator with custom pointer events
.command-separator {
  &.pointer-events-none {
    pointer-events: none;
  }
  
  &.pointer-events-auto {
    pointer-events: auto;
  }
}

// Command separator with custom user select
.command-separator {
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

// Command separator with custom position
.command-separator {
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

// Command separator with custom z-index
.command-separator {
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

// Command separator with custom transition
.command-separator {
  &.transition-none {
    transition: none;
  }
  
  &.transition-all {
    transition: all 0.15s ease-in-out;
  }
  
  &.transition-colors {
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  }
  
  &.transition-opacity {
    transition: opacity 0.15s ease-in-out;
  }
  
  &.transition-shadow {
    transition: box-shadow 0.15s ease-in-out;
  }
  
  &.transition-transform {
    transition: transform 0.15s ease-in-out;
  }
}

// Command separator with custom duration
.command-separator {
  &.duration-75 {
    transition-duration: 75ms;
  }
  
  &.duration-100 {
    transition-duration: 100ms;
  }
  
  &.duration-150 {
    transition-duration: 150ms;
  }
  
  &.duration-200 {
    transition-duration: 200ms;
  }
  
  &.duration-300 {
    transition-duration: 300ms;
  }
  
  &.duration-500 {
    transition-duration: 500ms;
  }
  
  &.duration-700 {
    transition-duration: 700ms;
  }
  
  &.duration-1000 {
    transition-duration: 1000ms;
  }
}

// Command separator with custom ease
.command-separator {
  &.ease-linear {
    transition-timing-function: linear;
  }
  
  &.ease-in {
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  }
  
  &.ease-out {
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  
  &.ease-in-out {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
}

// Command separator with custom delay
.command-separator {
  &.delay-75 {
    transition-delay: 75ms;
  }
  
  &.delay-100 {
    transition-delay: 100ms;
  }
  
  &.delay-150 {
    transition-delay: 150ms;
  }
  
  &.delay-200 {
    transition-delay: 200ms;
  }
  
  &.delay-300 {
    transition-delay: 300ms;
  }
  
  &.delay-500 {
    transition-delay: 500ms;
  }
  
  &.delay-700 {
    transition-delay: 700ms;
  }
  
  &.delay-1000 {
    transition-delay: 1000ms;
  }
}
</style>
