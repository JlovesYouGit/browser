<template>
  <CheckboxRoot
    data-slot="checkbox"
    :class="checkboxClasses"
    v-bind="$attrs"
  >
    <CheckboxIndicator
      data-slot="checkbox-indicator"
      :class="indicatorClasses"
    >
      <CheckIcon class="size-3.5" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui'
import { Check } from 'lucide-vue-next'
import { cn } from '@/utils/cn'

// Component props interface
interface CheckboxProps {
  class?: string
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  id?: string
}

// Define props
const props = defineProps<CheckboxProps>()

// Use Check icon
const CheckIcon = Check

// Computed classes
const checkboxClasses = computed(() => 
  cn(
    "peer border bg-input-background dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
    props.class
  )
)

const indicatorClasses = computed(() => 
  "flex items-center justify-center text-current transition-none"
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.checkbox {
  // Base checkbox styles
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  background-color: var(--color-input-background);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  outline: none;
  position: relative;
  cursor: pointer;
  
  // Dark mode background
  .dark & {
    background-color: color-mix(in srgb, var(--color-input) 30%, transparent);
  }
  
  // Checked state
  &[data-state="checked"] {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-primary-foreground);
    
    .dark & {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }
  
  // Focus visible state
  &:focus-visible {
    border-color: var(--color-ring);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ring) 50%, transparent);
  }
  
  // Invalid state
  &:aria-invalid {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 20%, transparent);
    border-color: var(--color-destructive);
    
    .dark &:aria-invalid {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 40%, transparent);
    }
  }
  
  // Disabled state
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    
    &:hover {
      cursor: not-allowed;
    }
  }
  
  // Hover state (when not disabled)
  &:not(:disabled):hover {
    border-color: var(--color-ring);
  }
  
  // Active state
  &:not(:disabled):active {
    transform: scale(0.95);
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    
    &:not(:disabled):active {
      transform: none;
    }
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Dark mode checkbox adaptations are handled by CSS variables
  }
  
  // Print styles
  @media print {
    // Ensure checkbox prints correctly
    border: 1px solid #000;
    
    // Remove transitions in print
    transition: none;
    
    // Remove transforms in print
    transform: none;
    
    // Remove shadows in print
    box-shadow: none;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    // Mobile-specific checkbox optimizations
    min-width: 1rem;
    min-height: 1rem;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    // Small mobile checkbox optimizations
    min-width: 1rem;
    min-height: 1rem;
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

// Checkbox indicator styles
.checkbox-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
  transition: none;
  
  // Icon styles
  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
  
  // Animation for check appearance
  animation: checkIn 0.2s ease-out;
}

@keyframes checkIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .checkbox-indicator {
    animation: none;
  }
}

// Checkbox variants
.checkbox {
  // Size variants
  &.size-xs {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 3px;
    
    .checkbox-indicator svg {
      width: 0.625rem;
      height: 0.625rem;
    }
  }
  
  &.size-sm {
    width: 0.875rem;
    height: 0.875rem;
    border-radius: 3.5px;
    
    .checkbox-indicator svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
  
  &.size-md {
    width: 1rem;
    height: 1rem;
    border-radius: 4px;
    
    .checkbox-indicator svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
  
  &.size-lg {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 5px;
    
    .checkbox-indicator svg {
      width: 1rem;
      height: 1rem;
    }
  }
  
  &.size-xl {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 6px;
    
    .checkbox-indicator svg {
      width: 1.125rem;
      height: 1.125rem;
    }
  }
  
  // Border radius variants
  &.rounded-none {
    border-radius: 0;
  }
  
  &.rounded-sm {
    border-radius: 2px;
  }
  
  &.rounded {
    border-radius: 4px;
  }
  
  &.rounded-md {
    border-radius: 6px;
  }
  
  &.rounded-lg {
    border-radius: 8px;
  }
  
  &.rounded-xl {
    border-radius: 12px;
  }
  
  &.rounded-2xl {
    border-radius: 16px;
  }
  
  &.rounded-full {
    border-radius: 50%;
  }
  
  // Border variants
  &.border-none {
    border: none;
  }
  
  &.border-2 {
    border-width: 2px;
  }
  
  &.border-4 {
    border-width: 4px;
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
  
  // Background variants
  &.bg-transparent {
    background-color: transparent;
  }
  
  &.bg-muted {
    background-color: var(--color-muted);
    
    &[data-state="checked"] {
      background-color: var(--color-primary);
    }
  }
  
  &.bg-accent {
    background-color: var(--color-accent);
    
    &[data-state="checked"] {
      background-color: var(--color-primary);
    }
  }
  
  &.bg-success {
    background-color: var(--color-chart-2);
    
    &[data-state="checked"] {
      background-color: var(--color-chart-2);
      border-color: var(--color-chart-2);
    }
  }
  
  &.bg-warning {
    background-color: var(--color-chart-1);
    
    &[data-state="checked"] {
      background-color: var(--color-chart-1);
      border-color: var(--color-chart-1);
    }
  }
  
  &.bg-error {
    background-color: var(--color-destructive);
    
    &[data-state="checked"] {
      background-color: var(--color-destructive);
      border-color: var(--color-destructive);
    }
  }
  
  // Custom color variants
  &.color-red {
    &[data-state="checked"] {
      background-color: #ef4444;
      border-color: #ef4444;
    }
  }
  
  &.color-green {
    &[data-state="checked"] {
      background-color: #10b981;
      border-color: #10b981;
    }
  }
  
  &.color-blue {
    &[data-state="checked"] {
      background-color: #3b82f6;
      border-color: #3b82f6;
    }
  }
  
  &.color-yellow {
    &[data-state="checked"] {
      background-color: #f59e0b;
      border-color: #f59e0b;
    }
  }
  
  &.color-purple {
    &[data-state="checked"] {
      background-color: #8b5cf6;
      border-color: #8b5cf6;
    }
  }
  
  &.color-pink {
    &[data-state="checked"] {
      background-color: #ec4899;
      border-color: #ec4899;
    }
  }
  
  // Indeterminate state
  &[data-state="indeterminate"] {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    
    .checkbox-indicator::after {
      content: '';
      width: 0.5rem;
      height: 2px;
      background-color: var(--color-primary-foreground);
      border-radius: 1px;
    }
  }
  
  // Animation variants
  &.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  &.animate-bounce {
    animation: bounce 1s infinite;
  }
  
  &.animate-spin {
    animation: spin 1s linear infinite;
  }
  
  &.animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
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

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

// Hover effects
.checkbox {
  &.hover-lift {
    &:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.06);
    }
  }
  
  &.hover-grow {
    &:not(:disabled):hover {
      transform: scale(1.1);
    }
  }
  
  &.hover-shrink {
    &:not(:disabled):hover {
      transform: scale(0.9);
    }
  }
  
  &.hover-rotate {
    &:not(:disabled):hover {
      transform: rotate(180deg);
    }
  }
  
  &.hover-brighten {
    &:not(:disabled):hover {
      filter: brightness(1.2);
    }
  }
  
  &.hover-saturate {
    &:not(:disabled):hover {
      filter: saturate(1.2);
    }
  }
  
  &.hover-grayscale {
    &:not(:disabled):hover {
      filter: grayscale(100%);
    }
  }
  
  &.hover-invert {
    &:not(:disabled):hover {
      filter: invert(100%);
    }
  }
}

// Focus effects
.checkbox {
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

// Active effects
.checkbox {
  &.active-scale {
    &:not(:disabled):active {
      transform: scale(0.95);
    }
  }
  
  &.active-rotate {
    &:not(:disabled):active {
      transform: rotate(90deg);
    }
  }
  
  &.active-flip {
    &:not(:disabled):active {
      transform: rotateY(180deg);
    }
  }
}

// Loading state
.checkbox {
  &.loading {
    opacity: 0.7;
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0.5rem;
      height: 0.5rem;
      margin: -0.25rem 0 0 -0.25rem;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
}

// Error state
.checkbox {
  &.error {
    border-color: var(--color-destructive);
    background-color: color-mix(in srgb, var(--color-destructive) 10%, transparent);
    
    &:not(:disabled):hover {
      border-color: var(--color-destructive);
      background-color: color-mix(in srgb, var(--color-destructive) 20%, transparent);
    }
  }
}

// Success state
.checkbox {
  &.success {
    border-color: var(--color-chart-2);
    background-color: color-mix(in srgb, var(--color-chart-2) 10%, transparent);
    
    &:not(:disabled):hover {
      border-color: var(--color-chart-2);
      background-color: color-mix(in srgb, var(--color-chart-2) 20%, transparent);
    }
  }
}

// Warning state
.checkbox {
  &.warning {
    border-color: var(--color-chart-1);
    background-color: color-mix(in srgb, var(--color-chart-1) 10%, transparent);
    
    &:not(:disabled):hover {
      border-color: var(--color-chart-1);
      background-color: color-mix(in srgb, var(--color-chart-1) 20%, transparent);
    }
  }
}

// Info state
.checkbox {
  &.info {
    border-color: var(--color-chart-4);
    background-color: color-mix(in srgb, var(--color-chart-4) 10%, transparent);
    
    &:not(:disabled):hover {
      border-color: var(--color-chart-4);
      background-color: color-mix(in srgb, var(--color-chart-4) 20%, transparent);
    }
  }
}

// Accessibility enhancements
.checkbox {
  // Ensure proper color contrast
  &:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    border: 2px solid currentColor;
    background-color: transparent;
    
    &[data-state="checked"] {
      background-color: currentColor;
      color: background-color;
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
.checkbox {
  [dir="rtl"] & {
    // RTL specific adjustments for checkbox
    // Checkbox is generally direction-agnostic
  }
}

// Print optimizations
@media print {
  .checkbox {
    // Ensure checkbox prints correctly
    border: 1px solid #000;
    
    // Remove transitions in print
    transition: none;
    
    // Remove transforms in print
    transform: none;
    
    // Remove shadows in print
    box-shadow: none;
    
    // Remove animations in print
    animation: none;
  }
}

// High DPI optimizations
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .checkbox {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .checkbox {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .checkbox {
    // Dark mode checkbox adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .checkbox {
    // Light mode checkbox adaptations are handled by CSS variables
  }
}

// Checkbox with custom icon
.checkbox {
  &.icon-checkmark {
    .checkbox-indicator::after {
      content: '✓';
      font-size: 0.75rem;
      font-weight: bold;
    }
    
    .checkbox-indicator svg {
      display: none;
    }
  }
  
  &.icon-cross {
    .checkbox-indicator::after {
      content: '✗';
      font-size: 0.75rem;
      font-weight: bold;
    }
    
    .checkbox-indicator svg {
      display: none;
    }
  }
  
  &.icon-plus {
    .checkbox-indicator::after {
      content: '+';
      font-size: 0.75rem;
      font-weight: bold;
    }
    
    .checkbox-indicator svg {
      display: none;
    }
  }
  
  &.icon-minus {
    .checkbox-indicator::after {
      content: '−';
      font-size: 0.75rem;
      font-weight: bold;
    }
    
    .checkbox-indicator svg {
      display: none;
    }
  }
  
  &.icon-arrow {
    .checkbox-indicator::after {
      content: '→';
      font-size: 0.75rem;
      font-weight: bold;
    }
    
    .checkbox-indicator svg {
      display: none;
    }
  }
}

// Checkbox with custom transition
.checkbox {
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

// Checkbox with custom duration
.checkbox {
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

// Checkbox with custom ease
.checkbox {
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

// Checkbox with custom delay
.checkbox {
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

// Checkbox with custom cursor
.checkbox {
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

// Checkbox with custom pointer events
.checkbox {
  &.pointer-events-none {
    pointer-events: none;
  }
  
  &.pointer-events-auto {
    pointer-events: auto;
  }
}

// Checkbox with custom user select
.checkbox {
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

// Checkbox with custom position
.checkbox {
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

// Checkbox with custom z-index
.checkbox {
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

// Checkbox with custom opacity
.checkbox {
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

// Checkbox with custom visibility
.checkbox {
  &.visible {
    visibility: visible;
  }
  
  &.invisible {
    visibility: hidden;
  }
  
  &.collapse {
    visibility: collapse;
  }
}

// Checkbox with custom transform
.checkbox {
  &.transform-none {
    transform: none;
  }
  
  &.scale-0 {
    transform: scale(0);
  }
  
  &.scale-50 {
    transform: scale(0.5);
  }
  
  &.scale-75 {
    transform: scale(0.75);
  }
  
  &.scale-90 {
    transform: scale(0.9);
  }
  
  &.scale-95 {
    transform: scale(0.95);
  }
  
  &.scale-100 {
    transform: scale(1);
  }
  
  &.scale-105 {
    transform: scale(1.05);
  }
  
  &.scale-110 {
    transform: scale(1.1);
  }
  
  &.scale-125 {
    transform: scale(1.25);
  }
  
  &.scale-150 {
    transform: scale(1.5);
  }
  
  &.rotate-0 {
    transform: rotate(0deg);
  }
  
  &.rotate-45 {
    transform: rotate(45deg);
  }
  
  &.rotate-90 {
    transform: rotate(90deg);
  }
  
  &.rotate-180 {
    transform: rotate(180deg);
  }
  
  &.rotate-270 {
    transform: rotate(270deg);
  }
}

// Checkbox with custom filter
.checkbox {
  &.filter-none {
    filter: none;
  }
  
  &.filter-grayscale {
    filter: grayscale(100%);
  }
  
  &.filter-sepia {
    filter: sepia(100%);
  }
  
  &.filter-invert {
    filter: invert(100%);
  }
  
  &.filter-hue-rotate-90 {
    filter: hue-rotate(90deg);
  }
  
  &.filter-hue-rotate-180 {
    filter: hue-rotate(180deg);
  }
  
  &.filter-hue-rotate-270 {
    filter: hue-rotate(270deg);
  }
  
  &.filter-saturate-0 {
    filter: saturate(0);
  }
  
  &.filter-saturate-50 {
    filter: saturate(50%);
  }
  
  &.filter-saturate-150 {
    filter: saturate(150%);
  }
  
  &.filter-saturate-200 {
    filter: saturate(200%);
  }
  
  &.filter-brightness-50 {
    filter: brightness(50%);
  }
  
  &.filter-brightness-75 {
    filter: brightness(75%);
  }
  
  &.filter-brightness-125 {
    filter: brightness(125%);
  }
  
  &.filter-brightness-150 {
    filter: brightness(150%);
  }
  
  &.filter-contrast-50 {
    filter: contrast(50%);
  }
  
  &.filter-contrast-75 {
    filter: contrast(75%);
  }
  
  &.filter-contrast-125 {
    filter: contrast(125%);
  }
  
  &.filter-contrast-150 {
    filter: contrast(150%);
  }
  
  &.filter-blur-sm {
    filter: blur(2px);
  }
  
  &.filter-blur {
    filter: blur(4px);
  }
  
  &.filter-blur-md {
    filter: blur(8px);
  }
  
  &.filter-blur-lg {
    filter: blur(16px);
  }
  
  &.filter-blur-xl {
    filter: blur(24px);
  }
}
</style>
