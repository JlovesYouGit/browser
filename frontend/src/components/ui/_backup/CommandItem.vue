<template>
  <CommandItemRoot
    data-slot="command-item"
    :class="itemClasses"
    v-bind="$attrs"
  >
    <slot />
  </CommandItemRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Command } from 'cmdk-vue'
import { cn } from '@/utils/cn'

// Component props interface
interface CommandItemProps {
  class?: string
  value?: string
  disabled?: boolean
  onSelect?: (value: string) => void
  forceMount?: boolean
  asChild?: boolean
}

// Define props
const props = defineProps<CommandItemProps>()

// Use Command Item component
const CommandItemRoot = Command.Item

// Computed classes
const itemClasses = computed(() => 
  cn(
    "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    props.class
  )
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.command-item {
  // Base command item styles
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: default;
  border-radius: 0.125rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  outline: none;
  user-select: none;
  
  // SVG styles
  &:deep(svg:not([class*='text-'])) {
    color: var(--color-muted-foreground);
    pointer-events: none;
    flex-shrink: 0;
    
    &:not([class*='size-']) {
      width: 1rem;
      height: 1rem;
    }
  }
  
  // Selected state
  &[data-selected='true'] {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
  }
  
  // Disabled state
  &[data-disabled='true'] {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  // Hover state
  &:hover:not([data-disabled='true']) {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
  }
  
  // Focus state
  &:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // Reduce animations for command item
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Command item styling is theme-agnostic
  }
  
  // Print styles
  @media print {
    // Ensure command item prints correctly
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    // Mobile-specific command item optimizations
    padding: 0.3125rem 0.4375rem;
    font-size: 0.8125rem;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    // Small mobile command item optimizations
    padding: 0.25rem 0.375rem;
    font-size: 0.75rem;
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
.command-item {
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
  .command-item {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in {
      animation: none;
    }
  }
}

// Hover effects
.command-item {
  &.hover-lift {
    transition: transform 0.2s ease;
    
    &:hover:not([data-disabled='true']) {
      transform: translateY(-2px);
    }
  }
  
  &.hover-grow {
    transition: transform 0.2s ease;
    
    &:hover:not([data-disabled='true']) {
      transform: scale(1.05);
    }
  }
  
  &.hover-shrink {
    transition: transform 0.2s ease;
    
    &:hover:not([data-disabled='true']) {
      transform: scale(0.95);
    }
  }
  
  &.hover-brighten {
    transition: filter 0.2s ease;
    
    &:hover:not([data-disabled='true']) {
      filter: brightness(1.1);
    }
  }
  
  &.hover-saturate {
    transition: filter 0.2s ease;
    
    &:hover:not([data-disabled='true']) {
      filter: saturate(1.1);
    }
  }
  
  &.hover-rotate {
    transition: transform 0.2s ease;
    
    &:hover:not([data-disabled='true']) {
      transform: rotate(5deg);
    }
  }
}

// Focus effects
.command-item {
  &.focus-ring {
    &:focus-visible {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }
  }
  
  &.focus-inset {
    &:focus-visible {
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
  
  &.focus-dotted {
    &:focus-visible {
      outline: 2px dotted var(--color-ring);
      outline-offset: 2px;
    }
  }
  
  &.focus-dashed {
    &:focus-visible {
      outline: 2px dashed var(--color-ring);
      outline-offset: 2px;
    }
  }
}

// Active state
.command-item {
  &:active:not([data-disabled='true']) {
    transform: scale(0.98);
  }
}

// Loading state
.command-item {
  &.loading {
    opacity: 0.7;
    pointer-events: none;
    
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
.command-item {
  &.error {
    background-color: color-mix(in srgb, var(--color-destructive) 10%, transparent);
    border-color: var(--color-destructive);
    
    &:hover:not([data-disabled='true']) {
      background-color: color-mix(in srgb, var(--color-destructive) 20%, transparent);
    }
  }
}

// Success state
.command-item {
  &.success {
    background-color: color-mix(in srgb, var(--color-chart-2) 10%, transparent);
    border-color: var(--color-chart-2);
    
    &:hover:not([data-disabled='true']) {
      background-color: color-mix(in srgb, var(--color-chart-2) 20%, transparent);
    }
  }
}

// Warning state
.command-item {
  &.warning {
    background-color: color-mix(in srgb, var(--color-chart-1) 10%, transparent);
    border-color: var(--color-chart-1);
    
    &:hover:not([data-disabled='true']) {
      background-color: color-mix(in srgb, var(--color-chart-1) 20%, transparent);
    }
  }
}

// Info state
.command-item {
  &.info {
    background-color: color-mix(in srgb, var(--color-chart-4) 10%, transparent);
    border-color: var(--color-chart-4);
    
    &:hover:not([data-disabled='true']) {
      background-color: color-mix(in srgb, var(--color-chart-4) 20%, transparent);
    }
  }
}

// Accessibility enhancements
.command-item {
  // Ensure proper color contrast
  color: var(--color-foreground);
  
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
.command-item {
  [dir="rtl"] & {
    // RTL specific adjustments for command item
    direction: rtl;
  }
}

// Print optimizations
@media print {
  .command-item {
    // Ensure command item prints correctly
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    
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
  .command-item {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .command-item {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .command-item {
    // Dark mode command item adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .command-item {
    // Light mode command item adaptations are handled by CSS variables
  }
}

// Command item with custom background
.command-item {
  &.bg-transparent {
    background-color: transparent;
  }
  
  &.bg-muted {
    background-color: var(--color-muted);
    color: var(--color-muted-foreground);
  }
  
  &.bg-accent {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
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
  
  &.bg-error {
    background-color: var(--color-destructive);
    color: var(--color-destructive-foreground);
  }
}

// Command item with custom border
.command-item {
  &.border-none {
    border: none;
  }
  
  &.border {
    border: 1px solid var(--color-border);
  }
  
  &.border-2 {
    border: 2px solid var(--color-border);
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
  
  &.border-transparent {
    border: 1px solid transparent;
  }
}

// Command item with custom border radius
.command-item {
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

// Command item with custom shadow
.command-item {
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
  
  &.shadow-inner {
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  }
}

// Command item with custom padding
.command-item {
  &.p-0 {
    padding: 0;
  }
  
  &.p-1 {
    padding: 0.25rem;
  }
  
  &.p-2 {
    padding: 0.5rem;
  }
  
  &.p-3 {
    padding: 0.75rem;
  }
  
  &.p-4 {
    padding: 1rem;
  }
  
  &.p-5 {
    padding: 1.25rem;
  }
  
  &.p-6 {
    padding: 1.5rem;
  }
  
  &.p-8 {
    padding: 2rem;
  }
  
  &.p-10 {
    padding: 2.5rem;
  }
  
  &.p-12 {
    padding: 3rem;
  }
  
  &.px-0 {
    padding-left: 0;
    padding-right: 0;
  }
  
  &.px-1 {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
  
  &.px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  
  &.px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  
  &.px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  &.px-5 {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
  
  &.px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  &.py-0 {
    padding-top: 0;
    padding-bottom: 0;
  }
  
  &.py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
  
  &.py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  
  &.py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  
  &.py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  
  &.py-5 {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }
  
  &.py-6 {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
}

// Command item with custom margin
.command-item {
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

// Command item with custom layout
.command-item {
  &.flex {
    display: flex;
  }
  
  &.inline-flex {
    display: inline-flex;
  }
  
  &.grid {
    display: grid;
  }
  
  &.block {
    display: block;
  }
  
  &.inline-block {
    display: inline-block;
  }
  
  &.hidden {
    display: none;
  }
}

// Command item with custom alignment
.command-item {
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
}

// Command item with custom text alignment
.command-item {
  &.text-left {
    text-align: left;
  }
  
  &.text-center {
    text-align: center;
  }
  
  &.text-right {
    text-align: right;
  }
  
  &.text-justify {
    text-align: justify;
  }
}

// Command item with custom font size
.command-item {
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
}

// Command item with custom font weight
.command-item {
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

// Command item with custom opacity
.command-item {
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

// Command item with custom cursor
.command-item {
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
  
  &.cursor-grab {
    cursor: grab;
    
    &:active {
      cursor: grabbing;
    }
  }
}

// Command item with custom pointer events
.command-item {
  &.pointer-events-none {
    pointer-events: none;
  }
  
  &.pointer-events-auto {
    pointer-events: auto;
  }
}

// Command item with custom user select
.command-item {
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

// Command item with custom position
.command-item {
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

// Command item with custom z-index
.command-item {
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

// Command item with custom max width
.command-item {
  &.max-w-xs {
    max-width: 20rem;
  }
  
  &.max-w-sm {
    max-width: 24rem;
  }
  
  &.max-w-md {
    max-width: 28rem;
  }
  
  &.max-w-lg {
    max-width: 32rem;
  }
  
  &.max-w-xl {
    max-width: 36rem;
  }
  
  &.max-w-2xl {
    max-width: 42rem;
  }
  
  &.max-w-3xl {
    max-width: 48rem;
  }
  
  &.max-w-4xl {
    max-width: 56rem;
  }
  
  &.max-w-5xl {
    max-width: 64rem;
  }
  
  &.max-w-6xl {
    max-width: 72rem;
  }
  
  &.max-w-7xl {
    max-width: 80rem;
  }
  
  &.max-w-full {
    max-width: 100%;
  }
  
  &.max-w-none {
    max-width: none;
  }
}

// Command item with custom min width
.command-item {
  &.min-w-0 {
    min-width: 0px;
  }
  
  &.min-w-full {
    min-width: 100%;
  }
  
  &.min-w-min {
    min-width: min-content;
  }
  
  &.min-w-max {
    min-width: max-content;
  }
}

// Command item with custom width
.command-item {
  &.w-auto {
    width: auto;
  }
  
  &.w-full {
    width: 100%;
  }
  
  &.w-screen {
    width: 100vw;
  }
  
  &.w-32 {
    width: 8rem;
  }
  
  &.w-40 {
    width: 10rem;
  }
  
  &.w-48 {
    width: 12rem;
  }
  
  &.w-56 {
    width: 14rem;
  }
  
  &.w-64 {
    width: 16rem;
  }
  
  &.w-72 {
    width: 18rem;
  }
  
  &.w-80 {
    width: 20rem;
  }
  
  &.w-96 {
    width: 24rem;
  }
}

// Command item with custom height
.command-item {
  &.h-auto {
    height: auto;
  }
  
  &.h-full {
    height: 100%;
  }
  
  &.h-screen {
    height: 100vh;
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
  
  &.h-72 {
    height: 18rem;
  }
  
  &.h-80 {
    height: 20rem;
  }
  
  &.h-96 {
    height: 24rem;
  }
}

// Command item with custom transition
.command-item {
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

// Command item with custom duration
.command-item {
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

// Command item with custom ease
.command-item {
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

// Command item with custom delay
.command-item {
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
