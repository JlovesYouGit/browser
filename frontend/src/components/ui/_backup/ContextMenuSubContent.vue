<template>
  <ContextMenuSubContentRoot
    data-slot="context-menu-sub-content"
    :class="contentClasses"
    v-bind="$attrs"
  >
    <slot />
  </ContextMenuSubContentRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ContextMenuSubContent } from 'reka-ui'
import { cn } from '@/utils/cn'

interface ContextMenuSubContentProps {
  class?: string
  sideOffset?: number
  alignOffset?: number
  avoidCollisions?: boolean
  collisionPadding?: number | Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>
}

const props = defineProps<ContextMenuSubContentProps>()

const ContextMenuSubContentRoot = ContextMenuSubContent

const contentClasses = computed(() =>
  cn(
    "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-[--radix-context-menu-content-transform-origin] overflow-hidden rounded-md border p-1 shadow-lg",
    props.class
  )
)
</script>

<style lang="less" scoped>
.context-menu-sub-content {
  background-color: var(--color-popover);
  color: var(--color-popover-foreground);
  z-index: 50;
  min-width: 8rem;
  overflow: hidden;
  border-radius: 0.375rem;
  border: 1px solid var(--color-border);
  padding: 0.25rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  
  // Animation states
  &[data-state="open"] {
    animation: fadeIn 0.15s ease-out, zoomIn 0.15s ease-out;
  }
  
  &[data-state="closed"] {
    animation: fadeOut 0.1s ease-in, zoomOut 0.1s ease-in;
  }
  
  &[data-side="bottom"] {
    animation: slideInFromTop 0.15s ease-out;
  }
  
  &[data-side="left"] {
    animation: slideInFromRight 0.15s ease-out;
  }
  
  &[data-side="right"] {
    animation: slideInFromLeft 0.15s ease-out;
  }
  
  &[data-side="top"] {
    animation: slideInFromBottom 0.15s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes zoomIn {
    from { transform: scale(0.95); }
    to { transform: scale(1); }
  }
  
  @keyframes zoomOut {
    from { transform: scale(1); }
    to { transform: scale(0.95); }
  }
  
  @keyframes slideInFromTop {
    from { transform: translateY(-0.5rem); }
    to { transform: translateY(0); }
  }
  
  @keyframes slideInFromRight {
    from { transform: translateX(0.5rem); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideInFromLeft {
    from { transform: translateX(-0.5rem); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideInFromBottom {
    from { transform: translateY(0.5rem); }
    to { transform: translateY(0); }
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    transition: none !important;
  }
  
  // Performance optimizations
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
