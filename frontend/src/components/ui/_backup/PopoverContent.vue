<template>
  <PopoverPortalRoot>
    <PopoverContentRoot
      data-slot="popover-content"
      :align="align"
      :side-offset="sideOffset"
      :class="contentClasses"
      v-bind="$attrs"
    >
      <slot />
    </PopoverContentRoot>
  </PopoverPortalRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PopoverContent, PopoverPortal } from 'reka-ui'
import { cn } from '@/utils/cn'

interface PopoverContentProps {
  class?: string
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  avoidCollisions?: boolean
  collisionPadding?: number | Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>
}

const props = withDefaults(defineProps<PopoverContentProps>(), {
  align: 'center',
  sideOffset: 4
})

const PopoverContentRoot = PopoverContent
const PopoverPortalRoot = PopoverPortal

const contentClasses = computed(() =>
  cn(
    "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-[--radix-popover-content-transform-origin] rounded-md border p-4 shadow-md outline-hidden",
    props.class
  )
)
</script>

<style lang="less" scoped>
.popover-content {
  background-color: var(--color-popover);
  color: var(--color-popover-foreground);
  z-index: 50;
  width: 18rem;
  border-radius: 0.375rem;
  border: 1px solid var(--color-border);
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  outline: none;
  
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
