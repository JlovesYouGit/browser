<template>
  <AvatarRoot
    :data-slot="'avatar'"
    :class="avatarClasses"
    v-bind="$attrs"
  >
    <slot />
  </AvatarRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Avatar } from 'radix-vue'
import { cn } from '@/utils/cn'

// Component props interface
interface AvatarProps {
  class?: string
}

// Define props
const props = defineProps<AvatarProps>()

// Use Radix Vue Avatar under the hood
const AvatarRoot = Avatar

// Computed classes
const avatarClasses = computed(() => 
  cn("relative flex size-10 shrink-0 overflow-hidden rounded-full", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.avatar {
  // Base avatar styles
  position: relative;
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 50%;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for avatar
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Avatar styling is theme-agnostic
  }
  
  // Print styles
  @media print {
    // Ensure avatar prints correctly
    border: 1px solid #000;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    width: 2rem;
    height: 2rem;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    width: 1.75rem;
    height: 1.75rem;
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Size variants
  &.size-xs {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  &.size-sm {
    width: 2rem;
    height: 2rem;
  }
  
  &.size-md {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  &.size-lg {
    width: 3rem;
    height: 3rem;
  }
  
  &.size-xl {
    width: 3.5rem;
    height: 3.5rem;
  }
  
  &.size-2xl {
    width: 4rem;
    height: 4rem;
  }
  
  &.size-3xl {
    width: 5rem;
    height: 5rem;
  }
  
  &.size-4xl {
    width: 6rem;
    height: 6rem;
  }
  
  // Shape variants
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
  
  // Border variants
  &.border-none {
    border: none;
  }
  
  &.border {
    border: 1px solid var(--color-border);
  }
  
  &.border-2 {
    border: 2px solid var(--color-border);
  }
  
  &.border-4 {
    border: 4px solid var(--color-border);
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
  &.bg-muted {
    background-color: var(--color-muted);
  }
  
  &.bg-primary {
    background-color: var(--color-primary);
  }
  
  &.bg-secondary {
    background-color: var(--color-secondary);
  }
  
  &.bg-accent {
    background-color: var(--color-accent);
  }
  
  &.bg-destructive {
    background-color: var(--color-destructive);
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
  
  // Status indicators
  &.online {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0.75rem;
      height: 0.75rem;
      background-color: var(--color-chart-2);
      border: 2px solid var(--color-background);
      border-radius: 50%;
    }
  }
  
  &.offline {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0.75rem;
      height: 0.75rem;
      background-color: var(--color-muted-foreground);
      border: 2px solid var(--color-background);
      border-radius: 50%;
    }
  }
  
  &.busy {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0.75rem;
      height: 0.75rem;
      background-color: var(--color-chart-1);
      border: 2px solid var(--color-background);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
  }
  
  &.away {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0.75rem;
      height: 0.75rem;
      background-color: var(--color-chart-3);
      border: 2px solid var(--color-background);
      border-radius: 50%;
    }
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

// Status indicator animation
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

// Responsive status indicators
@media (max-width: 640px) {
  .avatar {
    &.online,
    &.offline,
    &.busy,
    &.away {
      &::after {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
}

@media (max-width: 480px) {
  .avatar {
    &.online,
    &.offline,
    &.busy,
    &.away {
      &::after {
        width: 0.375rem;
        height: 0.375rem;
      }
    }
  }
}

// RTL support
.avatar {
  [dir="rtl"] & {
    // Avatar is direction-agnostic
  }
}

// Accessibility enhancements
.avatar {
  // Ensure proper color contrast for borders
  &.border {
    border-color: var(--color-border);
  }
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    &.border {
      border-color: #000;
      border-width: 2px;
    }
    
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

// Animation support
.avatar {
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
    animation: bounceIn 0.5s ease-out forwards;
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

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .avatar {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in {
      animation: none;
    }
  }
}

// Hover effects
.avatar {
  &.hover-zoom {
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  &.hover-shadow {
    transition: box-shadow 0.3s ease;
    
    &:hover {
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    }
  }
  
  &.hover-brighten {
    transition: filter 0.3s ease;
    
    &:hover {
      filter: brightness(1.1);
    }
  }
}

// Focus effects
.avatar {
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
}

// Loading states
.avatar {
  &.loading {
    > * {
      opacity: 0.7;
      filter: blur(1px);
    }
    
    &::before {
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
      z-index: 1;
    }
  }
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

// Error states
.avatar {
  &.error {
    background-color: var(--color-destructive);
    
    > * {
      opacity: 0.5;
      filter: grayscale(100%);
    }
    
    &::before {
      content: '⚠️';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1rem;
      z-index: 1;
    }
  }
}

// Placeholder states
.avatar {
  &.placeholder {
    background-color: var(--color-muted);
    border: 2px dashed var(--color-border);
    
    &::before {
      content: attr(data-placeholder);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--color-muted-foreground);
      font-size: 0.75rem;
      font-weight: 500;
      text-align: center;
      z-index: 1;
    }
  }
}

// Group avatars (stacked)
.avatar-group {
  display: flex;
  align-items: center;
  
  .avatar {
    &:not(:first-child) {
      margin-left: -0.5rem;
    }
    
    &:hover {
      z-index: 1;
      transform: scale(1.05);
    }
  }
}

// Avatar with badge
.avatar-with-badge {
  position: relative;
  
  .avatar {
    // Avatar styles
  }
  
  .badge {
    position: absolute;
    bottom: -0.25rem;
    right: -0.25rem;
    background-color: var(--color-primary);
    color: white;
    font-size: 0.625rem;
    font-weight: 600;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
    border: 2px solid var(--color-background);
  }
}

// Avatar with initials
.avatar-initials {
  background-color: var(--color-primary);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  
  // Dynamic background colors based on name
  &[data-color="blue"] {
    background-color: #3b82f6;
  }
  
  &[data-color="green"] {
    background-color: #10b981;
  }
  
  &[data-color="red"] {
    background-color: #ef4444;
  }
  
  &[data-color="purple"] {
    background-color: #8b5cf6;
  }
  
  &[data-color="orange"] {
    background-color: #f97316;
  }
  
  &[data-color="pink"] {
    background-color: #ec4899;
  }
  
  &[data-color="yellow"] {
    background-color: #eab308;
  }
  
  &[data-color="indigo"] {
    background-color: #6366f1;
  }
  
  &[data-color="teal"] {
    background-color: #14b8a6;
  }
  
  &[data-color="cyan"] {
    background-color: #06b6d4;
  }
}
</style>
