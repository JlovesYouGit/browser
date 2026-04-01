<template>
  <p
    data-slot="card-description"
    :class="descriptionClasses"
    v-bind="$attrs"
  >
    <slot />
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

// Component props interface
interface CardDescriptionProps {
  class?: string
}

// Define props
const props = defineProps<CardDescriptionProps>()

// Computed classes
const descriptionClasses = computed(() => 
  cn("text-muted-foreground", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.card-description {
  // Base card description styles
  color: var(--color-muted-foreground);
  margin: 0;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for card description
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    color: var(--color-muted-foreground);
  }
  
  // Print styles
  @media print {
    color: #666;
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    font-size: 0.8125rem;
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
  
  // Line height variants
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
.card-description {
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
    border-right: 2px solid var(--color-muted-foreground);
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
  .card-description {
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
.card-description {
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
  
  &.hover-shrink {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(0.98);
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
  
  &.hover-color {
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--color-foreground);
    }
  }
}

// Focus effects
.card-description {
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
.card-description {
  &:active {
    transform: scale(0.98);
  }
}

// Loading state
.card-description {
  &.loading {
    opacity: 0.7;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--color-muted-foreground), transparent);
      animation: loading-shimmer 1.5s infinite;
    }
  }
}

@keyframes loading-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

// Error state
.card-description {
  &.error {
    color: var(--color-destructive);
  }
}

// Success state
.card-description {
  &.success {
    color: var(--color-chart-2);
  }
}

// Warning state
.card-description {
  &.warning {
    color: var(--color-chart-1);
  }
}

// Info state
.card-description {
  &.info {
    color: var(--color-chart-4);
  }
}

// Accessibility enhancements
.card-description {
  // Ensure proper color contrast
  color: var(--color-muted-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    color: #000;
    font-weight: 400;
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
.card-description {
  [dir="rtl"] & {
    // RTL specific adjustments
    text-align: right;
  }
}

// Print optimizations
@media print {
  .card-description {
    // Ensure card description prints correctly
    color: #666;
    
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
  .card-description {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .card-description {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .card-description {
    // Dark mode card description adaptations
    color: var(--color-muted-foreground);
  }
}

@media (prefers-color-scheme: light) {
  .card-description {
    // Light mode card description adaptations
    color: var(--color-muted-foreground);
  }
}

// Card description with truncation
.card-description {
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
  
  &.truncate-4-lines {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

// Card description with word break
.card-description {
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

// Card description with hyphenation
.card-description {
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

// Card description with selection
.card-description {
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

// Card description with pointer events
.card-description {
  &.pointer-events-none {
    pointer-events: none;
  }
  
  &.pointer-events-auto {
    pointer-events: auto;
  }
}

// Card description with rich text support
.card-description {
  // Support for inline elements
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
  
  code {
    background-color: var(--color-muted);
    color: var(--color-foreground);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.875em;
  }
  
  pre {
    background-color: var(--color-muted);
    color: var(--color-foreground);
    padding: 0.5rem;
    border-radius: 0.375rem;
    font-family: monospace;
    font-size: 0.875em;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
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
  
  blockquote {
    border-left: 4px solid var(--color-border);
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: var(--color-muted-foreground);
  }
  
  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    
    li {
      margin: 0.25rem 0;
    }
  }
  
  ul {
    list-style-type: disc;
    
    &.list-none {
      list-style-type: none;
      padding-left: 0;
    }
    
    &.list-circle {
      list-style-type: circle;
    }
    
    &.list-square {
      list-style-type: square;
    }
  }
  
  ol {
    list-style-type: decimal;
    
    &.list-none {
      list-style-type: none;
      padding-left: 0;
    }
    
    &.list-upper-alpha {
      list-style-type: upper-alpha;
    }
    
    &.list-lower-alpha {
      list-style-type: lower-alpha;
    }
    
    &.list-upper-roman {
      list-style-type: upper-roman;
    }
    
    &.list-lower-roman {
      list-style-type: lower-roman;
    }
  }
  
  // Support for inline code
  :not(pre) > code {
    background-color: var(--color-muted);
    color: var(--color-foreground);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.875em;
  }
  
  // Support for highlights
  mark {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
  }
  
  // Support for abbreviations
  abbr {
    text-decoration: underline dotted;
    text-decoration-color: var(--color-muted-foreground);
    cursor: help;
  }
  
  // Support for citations
  cite {
    font-style: italic;
    color: var(--color-muted-foreground);
  }
  
  // Support for definitions
  dfn {
    font-style: italic;
    color: var(--color-foreground);
  }
  
  // Support for keyboard input
  kbd {
    background-color: var(--color-muted);
    color: var(--color-foreground);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    border: 1px solid var(--color-border);
    font-family: monospace;
    font-size: 0.875em;
  }
  
  // Support for sample output
  samp {
    background-color: var(--color-muted);
    color: var(--color-foreground);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.875em;
  }
  
  // Support for variables
  var {
    font-style: italic;
    color: var(--color-primary);
  }
  
  // Support for small text
  small {
    font-size: 0.875em;
    color: var(--color-muted-foreground);
  }
  
  // Support for subscript and superscript
  sub, sup {
    font-size: 0.75em;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  
  sub {
    bottom: -0.25em;
  }
  
  sup {
    top: -0.5em;
  }
  
  // Support for time
  time {
    color: var(--color-muted-foreground);
    
    &[datetime] {
      cursor: help;
      border-bottom: 1px dotted var(--color-muted-foreground);
    }
  }
  
  // Support for data attributes
  data {
    cursor: help;
    border-bottom: 1px dotted var(--color-muted-foreground);
    
    &::before {
      content: attr(data-value);
      font-size: 0.75em;
      color: var(--color-muted-foreground);
    }
  }
}

// Card description with custom spacing
.card-description {
  &.spacing-tight {
    line-height: 1.25;
    letter-spacing: -0.025em;
  }
  
  &.spacing-normal {
    line-height: 1.5;
    letter-spacing: 0;
  }
  
  &.spacing-loose {
    line-height: 1.75;
    letter-spacing: 0.025em;
  }
  
  &.spacing-extra-loose {
    line-height: 2;
    letter-spacing: 0.05em;
  }
}

// Card description with emphasis
.card-description {
  &.emphasis {
    color: var(--color-foreground);
    font-weight: 500;
  }
  
  &.emphasis-primary {
    color: var(--color-primary);
    font-weight: 500;
  }
  
  &.emphasis-secondary {
    color: var(--color-secondary);
    font-weight: 500;
  }
  
  &.emphasis-accent {
    color: var(--color-accent);
    font-weight: 500;
  }
}

// Card description with muted text
.card-description {
  &.muted {
    opacity: 0.7;
  }
  
  &.muted-more {
    opacity: 0.5;
  }
  
  &.muted-less {
    opacity: 0.85;
  }
}

// Card description with highlight
.card-description {
  &.highlight {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
  }
  
  &.highlight-primary {
    background-color: var(--color-primary);
    color: var(--color-primary-foreground);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
  }
  
  &.highlight-success {
    background-color: var(--color-chart-2);
    color: white;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
  }
  
  &.highlight-warning {
    background-color: var(--color-chart-1);
    color: white;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
  }
  
  &.highlight-error {
    background-color: var(--color-destructive);
    color: var(--color-destructive-foreground);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
  }
}

// Card description with tooltip
.card-description {
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

// Card description with link
.card-description {
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

// Card description with status indicator
.card-description {
  &.with-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
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
</style>
