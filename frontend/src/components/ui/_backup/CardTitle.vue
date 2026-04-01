<template>
  <h4
    data-slot="card-title"
    :class="titleClasses"
    v-bind="$attrs"
  >
    <slot />
  </h4>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

// Component props interface
interface CardTitleProps {
  class?: string
}

// Define props
const props = defineProps<CardTitleProps>()

// Computed classes
const titleClasses = computed(() => 
  cn("leading-none", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.card-title {
  // Base card title styles
  line-height: 1;
  margin: 0;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for card title
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Card title styling is theme-agnostic
  }
  
  // Print styles
  @media print {
    // Ensure card title prints correctly
    font-size: 1rem;
    line-height: 1.2;
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    font-size: 1.125rem;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    font-size: 1rem;
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Font size variants
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
  
  // Text alignment variants
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
  
  // Text decoration variants
  &.underline-none {
    text-decoration: none;
  }
  
  &.underline {
    text-decoration: underline;
  }
  
  &.line-through {
    text-decoration: line-through;
  }
  
  &.no-underline {
    text-decoration: none;
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
.card-title {
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
  
  &.typewriter {
    animation: typewriter 2s steps(40) forwards;
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid var(--color-foreground);
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

@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .card-title {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in,
    &.typewriter {
      animation: none;
    }
  }
}

// Hover effects
.card-title {
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
  
  &.hover-color {
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--color-primary);
    }
  }
}

// Focus effects
.card-title {
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
.card-title {
  &:active {
    transform: scale(0.98);
  }
}

// Loading state
.card-title {
  &.loading {
    opacity: 0.7;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
      animation: loading-shimmer 1.5s infinite;
    }
  }
}

@keyframes loading-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

// Error state
.card-title {
  &.error {
    color: var(--color-destructive);
  }
}

// Success state
.card-title {
  &.success {
    color: var(--color-chart-2);
  }
}

// Warning state
.card-title {
  &.warning {
    color: var(--color-chart-1);
  }
}

// Info state
.card-title {
  &.info {
    color: var(--color-chart-4);
  }
}

// Accessibility enhancements
.card-title {
  // Ensure proper color contrast
  color: inherit;
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    color: #000;
    font-weight: 600;
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
.card-title {
  [dir="rtl"] & {
    // RTL specific adjustments
    text-align: right;
  }
}

// Print optimizations
@media print {
  .card-title {
    // Ensure card title prints correctly
    color: #000;
    font-size: 1rem;
    line-height: 1.2;
    
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
  .card-title {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .card-title {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .card-title {
    // Dark mode card title adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .card-title {
    // Light mode card title adaptations are handled by CSS variables
  }
}

// Card title with icon
.card-title {
  &.with-icon {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    > svg {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }
    
    &.icon-sm > svg {
      width: 1rem;
      height: 1rem;
    }
    
    &.icon-lg > svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}

// Card title with badge
.card-title {
  &.with-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    .badge {
      background-color: var(--color-primary);
      color: var(--color-primary-foreground);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.125rem 0.375rem;
      border-radius: 9999px;
      flex-shrink: 0;
    }
  }
}

// Card title with subtitle
.card-title {
  &.with-subtitle {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    
    .subtitle {
      font-size: 0.875rem;
      color: var(--color-muted-foreground);
      font-weight: 400;
      line-height: 1.4;
    }
  }
}

// Card title with link
.card-title {
  &.as-link {
    color: var(--color-primary);
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--color-primary);
      text-decoration: underline;
    }
    
    &:focus {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }
  }
}

// Card title with tooltip
.card-title {
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

// Card title with highlight
.card-title {
  &.highlight {
    background: linear-gradient(120deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
  
  &.highlight-accent {
    background: linear-gradient(120deg, var(--color-accent) 0%, var(--color-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
}

// Card title with gradient text
.card-title {
  &.gradient-text {
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    background-size: 200% auto;
    animation: gradient-shift 3s ease infinite;
  }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

// Card title with outline
.card-title {
  &.outline {
    -webkit-text-stroke: 1px var(--color-border);
    -webkit-text-fill-color: transparent;
    text-stroke: 1px var(--color-border);
    text-fill-color: transparent;
    color: transparent;
    
    &.outline-primary {
      -webkit-text-stroke: 1px var(--color-primary);
      text-stroke: 1px var(--color-primary);
    }
    
    &.outline-accent {
      -webkit-text-stroke: 1px var(--color-accent);
      text-stroke: 1px var(--color-accent);
    }
  }
}

// Card title with shadow
.card-title {
  &.text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    &.text-shadow-lg {
      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    &.text-shadow-xl {
      text-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }
    
    &.text-shadow-primary {
      text-shadow: 0 2px 4px color-mix(in srgb, var(--color-primary) 50%, transparent);
    }
    
    &.text-shadow-accent {
      text-shadow: 0 2px 4px color-mix(in srgb, var(--color-accent) 50%, transparent);
    }
  }
}

// Card title with glow
.card-title {
  &.glow {
    text-shadow: 0 0 10px var(--color-primary);
    color: var(--color-primary);
    
    &.glow-accent {
      text-shadow: 0 0 10px var(--color-accent);
      color: var(--color-accent);
    }
    
    &.glow-success {
      text-shadow: 0 0 10px var(--color-chart-2);
      color: var(--color-chart-2);
    }
    
    &.glow-warning {
      text-shadow: 0 0 10px var(--color-chart-1);
      color: var(--color-chart-1);
    }
    
    &.glow-error {
      text-shadow: 0 0 10px var(--color-destructive);
      color: var(--color-destructive);
    }
  }
}

// Card title with strikethrough
.card-title {
  &.strikethrough {
    text-decoration: line-through;
    color: var(--color-muted-foreground);
  }
  
  &.strikethrough-primary {
    text-decoration: line-through;
    color: var(--color-primary);
  }
  
  &.strikethrough-accent {
    text-decoration: line-through;
    color: var(--color-accent);
  }
}

// Card title with underline
.card-title {
  &.underline {
    text-decoration: underline;
    text-underline-offset: 4px;
    
    &.underline-primary {
      text-decoration-color: var(--color-primary);
    }
    
    &.underline-accent {
      text-decoration-color: var(--color-accent);
    }
    
    &.underline-dotted {
      text-decoration-style: dotted;
    }
    
    &.underline-dashed {
      text-decoration-style: dashed;
    }
    
    &.underline-double {
      text-decoration-style: double;
    }
    
    &.underline-wavy {
      text-decoration-style: wavy;
    }
  }
}

// Card title with custom line height
.card-title {
  &.leading-none {
    line-height: 1;
  }
  
  &.leading-tight {
    line-height: 1.25;
  }
  
  &.leading-snug {
    line-height: 1.375;
  }
  
  &.leading-normal {
    line-height: 1.5;
  }
  
  &.leading-relaxed {
    line-height: 1.625;
  }
  
  &.leading-loose {
    line-height: 2;
  }
}

// Card title with custom spacing
.card-title {
  &.spacing-tight {
    letter-spacing: -0.05em;
  }
  
  &.spacing-normal {
    letter-spacing: 0;
  }
  
  &.spacing-wide {
    letter-spacing: 0.025em;
  }
  
  &.spacing-wider {
    letter-spacing: 0.05em;
  }
  
  &.spacing-widest {
    letter-spacing: 0.1em;
  }
}

// Card title with truncation
.card-title {
  &.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  &.truncate-2-lines {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  &.truncate-3-lines {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

// Card title with word break
.card-title {
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

// Card title with hyphenation
.card-title {
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

// Card title with selection
.card-title {
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

// Card title with pointer events
.card-title {
  &.pointer-events-none {
    pointer-events: none;
  }
  
  &.pointer-events-auto {
    pointer-events: auto;
  }
}
</style>
