<template>
  <div
    data-slot="alert-description"
    :class="descriptionClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

// Component props interface
interface AlertDescriptionProps {
  class?: string
}

// Define props
const props = defineProps<AlertDescriptionProps>()

// Computed classes
const descriptionClasses = computed(() => 
  cn("text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.alert-description {
  // Base description styles
  color: var(--color-muted-foreground);
  grid-column-start: 2;
  display: grid;
  justify-items: start;
  gap: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
  
  // Paragraph styling within description
  p {
    line-height: 1.5;
    margin: 0;
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for description
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    color: var(--color-muted-foreground);
  }
  
  // Print styles
  @media print {
    color: #666;
    font-size: 0.75rem;
    line-height: 1.4;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    font-size: 0.8125rem;
    line-height: 1.4;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    font-size: 0.75rem;
    line-height: 1.3;
  }
  
  // Accessibility enhancements
  // Ensure proper color contrast
  color: var(--color-muted-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    color: #000;
    opacity: 0.8;
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Text overflow handling
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  
  // Long description handling
  &.long-description {
    font-size: 0.8125rem;
    line-height: 1.4;
    
    @media (min-width: 640px) {
      font-size: 0.875rem;
      line-height: 1.5;
    }
  }
  
  // Warning state
  &.warning {
    color: var(--color-chart-1);
  }
  
  // Error state
  &.error {
    color: var(--color-destructive);
  }
  
  // Success state
  &.success {
    color: var(--color-chart-2);
  }
  
  // Info state
  &.info {
    color: var(--color-chart-4);
  }
  
  // RTL support
  [dir="rtl"] & {
    text-align: right;
  }
  
  // Performance optimizations
  // Contain text rendering
  contain: layout style paint;
  
  // Optimize for animations
  will-change: auto;
  
  // Hardware acceleration for smooth transitions
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

// Text selection styles
.alert-description {
  &::selection {
    background-color: var(--color-ring);
    color: var(--color-background);
  }
  
  &::-moz-selection {
    background-color: var(--color-ring);
    color: var(--color-background);
  }
}

// Placeholder styles for dynamic content
.alert-description {
  &:empty::before {
    content: "Alert description text";
    color: var(--color-muted-foreground);
    font-style: italic;
    opacity: 0.6;
  }
}

// Emphasis styles
.alert-description {
  strong {
    font-weight: 600;
    color: var(--color-foreground);
  }
  
  em {
    font-style: italic;
  }
  
  .highlight {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    padding: 0.125rem 0.25rem;
    border-radius: 0.125rem;
  }
  
  code {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.8125em;
    background-color: var(--color-muted);
    color: var(--color-foreground);
    padding: 0.125rem 0.25rem;
    border-radius: 0.125rem;
    border: 1px solid var(--color-border);
  }
  
  pre {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.75em;
    background-color: var(--color-muted);
    color: var(--color-foreground);
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid var(--color-border);
    overflow-x: auto;
    margin: 0.5rem 0;
    
    code {
      background: none;
      padding: 0;
      border: none;
    }
  }
}

// Link styles
.alert-description {
  a {
    color: var(--color-primary);
    text-decoration: underline;
    
    &:hover {
      color: var(--color-primary);
      text-decoration: none;
    }
    
    &:focus {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }
  }
}

// List styles
.alert-description {
  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    
    li {
      margin: 0.25rem 0;
    }
  }
  
  ul {
    list-style-type: disc;
  }
  
  ol {
    list-style-type: decimal;
  }
  
  // Nested lists
  ul ul, ol ol, ul ol, ol ul {
    margin: 0.25rem 0;
  }
}

// Blockquote styles
.alert-description {
  blockquote {
    margin: 0.5rem 0;
    padding: 0.5rem 1rem;
    border-left: 4px solid var(--color-border);
    background-color: var(--color-muted);
    color: var(--color-muted-foreground);
    font-style: italic;
    
    p {
      margin: 0;
    }
  }
}

// Table styles
.alert-description {
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0.5rem 0;
    font-size: 0.8125em;
    
    th, td {
      padding: 0.375rem 0.5rem;
      text-align: left;
      border: 1px solid var(--color-border);
    }
    
    th {
      background-color: var(--color-muted);
      font-weight: 600;
      color: var(--color-foreground);
    }
    
    td {
      color: var(--color-muted-foreground);
    }
  }
}

// Separator styles
.alert-description {
  hr {
    border: none;
    height: 1px;
    background-color: var(--color-border);
    margin: 1rem 0;
  }
}

// Badge integration
.alert-description {
  .description-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.125rem 0.375rem;
    font-size: 0.6875rem;
    font-weight: 500;
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    border-radius: 9999px;
    vertical-align: middle;
    margin: 0 0.125rem;
  }
  
  .badge-success {
    background-color: var(--color-chart-2);
    color: white;
  }
  
  .badge-warning {
    background-color: var(--color-chart-1);
    color: white;
  }
  
  .badge-error {
    background-color: var(--color-destructive);
    color: white;
  }
  
  .badge-info {
    background-color: var(--color-chart-4);
    color: white;
  }
}

// Icon integration
.alert-description {
  .description-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    margin-right: 0.375rem;
    vertical-align: middle;
    
    @media (max-width: 640px) {
      width: 0.875rem;
      height: 0.875rem;
      margin-right: 0.25rem;
    }
  }
  
  &.with-icon {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    
    .description-icon {
      margin-top: 0.125rem;
      flex-shrink: 0;
    }
  }
}

// Progress indicator
.alert-description {
  .progress-indicator {
    display: inline-block;
    width: 0.75rem;
    height: 0.75rem;
    background-color: var(--color-accent);
    border-radius: 50%;
    margin: 0 0.125rem;
    
    &.active {
      background-color: var(--color-primary);
      animation: pulse 2s infinite;
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

// Status message styles
.alert-description {
  .status-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: var(--color-muted);
    border: 1px solid var(--color-border);
    border-radius: 0.25rem;
    margin: 0.5rem 0;
    
    &.success {
      background-color: rgba(34, 197, 94, 0.1);
      border-color: var(--color-chart-2);
      color: var(--color-chart-2);
    }
    
    &.warning {
      background-color: rgba(245, 158, 11, 0.1);
      border-color: var(--color-chart-1);
      color: var(--color-chart-1);
    }
    
    &.error {
      background-color: rgba(239, 68, 68, 0.1);
      border-color: var(--color-destructive);
      color: var(--color-destructive);
    }
    
    &.info {
      background-color: rgba(59, 130, 246, 0.1);
      border-color: var(--color-chart-4);
      color: var(--color-chart-4);
    }
  }
}

// Tooltip integration
.alert-description {
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

// Compact variant
.alert-description {
  &.compact {
    font-size: 0.8125rem;
    line-height: 1.4;
    gap: 0.125rem;
  }
}

// Large variant
.alert-description {
  &.large {
    font-size: 1rem;
    line-height: 1.6;
    gap: 0.5rem;
  }
}

// Animation support
.alert-description {
  &.fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  &.slide-in {
    animation: slideIn 0.3s ease-out forwards;
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

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .alert-description {
    &.fade-in,
    &.slide-in {
      animation: none;
    }
  }
}
</style>
