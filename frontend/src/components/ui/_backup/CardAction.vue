<template>
  <div
    data-slot="card-action"
    :class="actionClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

// Component props interface
interface CardActionProps {
  class?: string
}

// Define props
const props = defineProps<CardActionProps>()

// Computed classes
const actionClasses = computed(() => 
  cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.card-action {
  // Base card action styles
  grid-column-start: 2;
  grid-row-start: 1;
  grid-row-end: span 2;
  align-self: flex-start;
  justify-self: flex-end;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for card action
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Card action styling is theme-agnostic
  }
  
  // Print styles
  @media print {
    // Ensure card action prints correctly
    display: none; // Hide actions in print by default
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    // Mobile-specific action optimizations
    justify-self: flex-end;
    align-self: flex-start;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    // Small mobile action optimizations
    justify-self: flex-end;
    align-self: flex-start;
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Grid positioning variants
  &.col-start-1 {
    grid-column-start: 1;
  }
  
  &.col-start-2 {
    grid-column-start: 2;
  }
  
  &.col-start-3 {
    grid-column-start: 3;
  }
  
  &.col-start-auto {
    grid-column-start: auto;
  }
  
  &.col-end-1 {
    grid-column-end: 1;
  }
  
  &.col-end-2 {
    grid-column-end: 2;
  }
  
  &.col-end-3 {
    grid-column-end: 3;
  }
  
  &.col-end-auto {
    grid-column-end: auto;
  }
  
  &.row-start-1 {
    grid-row-start: 1;
  }
  
  &.row-start-2 {
    grid-row-start: 2;
  }
  
  &.row-start-3 {
    grid-row-start: 3;
  }
  
  &.row-start-auto {
    grid-row-start: auto;
  }
  
  &.row-end-1 {
    grid-row-end: 1;
  }
  
  &.row-end-2 {
    grid-row-end: 2;
  }
  
  &.row-end-3 {
    grid-row-end: 3;
  }
  
  &.row-end-auto {
    grid-row-end: auto;
  }
  
  &.row-span-1 {
    grid-row-end: span 1;
  }
  
  &.row-span-2 {
    grid-row-end: span 2;
  }
  
  &.row-span-3 {
    grid-row-end: span 3;
  }
  
  &.row-span-auto {
    grid-row-end: span auto;
  }
  
  // Alignment variants
  &.self-start {
    align-self: flex-start;
  }
  
  &.self-end {
    align-self: flex-end;
  }
  
  &.self-center {
    align-self: center;
  }
  
  &.self-stretch {
    align-self: stretch;
  }
  
  &.self-baseline {
    align-self: baseline;
  }
  
  // Justify variants
  &.justify-self-start {
    justify-self: flex-start;
  }
  
  &.justify-self-end {
    justify-self: flex-end;
  }
  
  &.justify-self-center {
    justify-self: center;
  }
  
  &.justify-self-stretch {
    justify-self: stretch;
  }
  
  // Display variants
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
  
  // Flex variants
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
  
  &.flex-wrap {
    flex-wrap: wrap;
  }
  
  &.flex-wrap-reverse {
    flex-wrap: wrap-reverse;
  }
  
  &.flex-nowrap {
    flex-wrap: nowrap;
  }
  
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
  
  // Margin variants
  &.margin-none {
    margin: 0;
  }
  
  &.margin-xs {
    margin: 0.25rem;
  }
  
  &.margin-sm {
    margin: 0.5rem;
  }
  
  &.margin-md {
    margin: 0.75rem;
  }
  
  &.margin-lg {
    margin: 1rem;
  }
  
  &.margin-xl {
    margin: 1.25rem;
  }
  
  &.margin-2xl {
    margin: 1.5rem;
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
.card-action {
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
    transform: translateX(20px);
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
  .card-action {
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
.card-action {
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
      filter: saturate(1.1);
    }
  }
}

// Focus effects
.card-action {
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
.card-action {
  &:active {
    transform: scale(0.98);
  }
}

// Loading state
.card-action {
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
.card-action {
  &.error {
    border-color: var(--color-destructive);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-destructive) 10%, transparent);
    }
  }
}

// Success state
.card-action {
  &.success {
    border-color: var(--color-chart-2);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-2) 10%, transparent);
    }
  }
}

// Warning state
.card-action {
  &.warning {
    border-color: var(--color-chart-1);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-1) 10%, transparent);
    }
  }
}

// Info state
.card-action {
  &.info {
    border-color: var(--color-chart-4);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-4) 10%, transparent);
    }
  }
}

// Accessibility enhancements
.card-action {
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
.card-action {
  [dir="rtl"] & {
    // RTL specific adjustments
    justify-self: flex-start;
    align-self: flex-start;
  }
}

// Print optimizations
@media print {
  .card-action {
    // Ensure card action prints correctly
    display: none; // Hide actions in print by default
    
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
  .card-action {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .card-action {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .card-action {
    // Dark mode card action adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .card-action {
    // Light mode card action adaptations are handled by CSS variables
  }
}

// Card action with button styling
.card-action {
  &.as-button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 0.375rem;
    background-color: var(--color-background);
    color: var(--color-foreground);
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
    
    &:active {
      transform: scale(0.98);
    }
    
    &.primary {
      background-color: var(--color-primary);
      color: var(--color-primary-foreground);
      border-color: var(--color-primary);
      
      &:hover {
        background-color: color-mix(in srgb, var(--color-primary) 90%, transparent);
      }
    }
    
    &.destructive {
      background-color: var(--color-destructive);
      color: var(--color-destructive-foreground);
      border-color: var(--color-destructive);
      
      &:hover {
        background-color: color-mix(in srgb, var(--color-destructive) 90%, transparent);
      }
    }
    
    &.outline {
      background-color: transparent;
      color: var(--color-foreground);
      
      &:hover {
        background-color: var(--color-accent);
        color: var(--color-accent-foreground);
      }
    }
    
    &.ghost {
      background-color: transparent;
      color: var(--color-foreground);
      border: none;
      
      &:hover {
        background-color: var(--color-accent);
        color: var(--color-accent-foreground);
      }
    }
  }
}

// Card action with icon button
.card-action {
  &.as-icon-button {
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
    
    &:active {
      transform: scale(0.98);
    }
    
    &.sm {
      width: 2rem;
      height: 2rem;
      
      > svg {
        width: 0.875rem;
        height: 0.875rem;
      }
    }
    
    &.lg {
      width: 3rem;
      height: 3rem;
      
      > svg {
        width: 1.25rem;
      height: 1.25rem;
      }
    }
  }
}

// Card action with dropdown
.card-action {
  &.as-dropdown {
    position: relative;
    
    &::after {
      content: '▼';
      margin-left: 0.5rem;
      font-size: 0.75rem;
      opacity: 0.7;
    }
  }
}

// Card action with menu
.card-action {
  &.as-menu {
    position: relative;
    
    &::before {
      content: '⋮';
      font-size: 1.25rem;
      opacity: 0.7;
    }
  }
}

// Card action with close button
.card-action {
  &.as-close {
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    color: var(--color-muted-foreground);
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
      background-color: var(--color-muted);
      color: var(--color-foreground);
    }
    
    &:focus {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
}

// Card action with toggle
.card-action {
  &.as-toggle {
    width: 3rem;
    height: 1.5rem;
    padding: 0.125rem;
    border: 1px solid var(--color-border);
    border-radius: 9999px;
    background-color: var(--color-muted);
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0.125rem;
      width: 1.25rem;
      height: 1.25rem;
      background-color: var(--color-background);
      border-radius: 50%;
      transform: translateY(-50%);
      transition: all 0.2s ease;
    }
    
    &.active {
      background-color: var(--color-primary);
      
      &::after {
        left: calc(100% - 1.375rem);
        background-color: var(--color-primary-foreground);
      }
    }
    
    &:focus {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
}

// Card action with badge
.card-action {
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

// Card action with tooltip
.card-action {
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

// Card action with progress
.card-action {
  &.with-progress {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: color-mix(in srgb, currentColor 20%, transparent);
      border-radius: 1px;
    }
    
    &[data-progress] {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background-color: currentColor;
        border-radius: 1px;
        width: attr(data-progress);
      }
    }
  }
}

// Card action with custom positioning
.card-action {
  &.position-top-left {
    grid-column-start: 1;
    grid-row-start: 1;
    align-self: flex-start;
    justify-self: flex-start;
  }
  
  &.position-top-right {
    grid-column-start: 2;
    grid-row-start: 1;
    align-self: flex-start;
    justify-self: flex-end;
  }
  
  &.position-bottom-left {
    grid-column-start: 1;
    grid-row-start: 2;
    align-self: flex-end;
    justify-self: flex-start;
  }
  
  &.position-bottom-right {
    grid-column-start: 2;
    grid-row-start: 2;
    align-self: flex-end;
    justify-self: flex-end;
  }
  
  &.position-center {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
    align-self: center;
    justify-self: center;
  }
}

// Card action with responsive behavior
.card-action {
  &.responsive {
    @media (max-width: 640px) {
      grid-column-start: 1;
      grid-column-end: 3;
      justify-self: stretch;
      align-self: flex-end;
    }
  }
  
  &.mobile-hidden {
    @media (max-width: 640px) {
      display: none;
    }
  }
  
  &.desktop-hidden {
    @media (min-width: 641px) {
      display: none;
    }
  }
}
</style>
