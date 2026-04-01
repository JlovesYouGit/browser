<template>
  <TooltipPortal>
    <TooltipContentRoot
      data-slot="tooltip-content"
      :side-offset="sideOffset"
      :class="contentClasses"
      v-bind="$attrs"
    >
      <slot />
      <TooltipArrow
        class="tooltip-arrow"
      />
    </TooltipContentRoot>
  </TooltipPortal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TooltipContent, TooltipArrow, TooltipPortal } from 'reka-ui'
import { cn } from '@/utils/cn'

interface TooltipContentProps {
  class?: string
  sideOffset?: number
}

const props = withDefaults(defineProps<TooltipContentProps>(), {
  sideOffset: 0
})

const TooltipContentRoot = TooltipContent

const contentClasses = computed(() =>
  cn(
    "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-[--radix-tooltip-content-transform-origin] rounded-md px-3 py-1.5 text-xs text-balance",
    props.class
  )
)
</script>

<style lang="less" scoped>
.tooltip-content {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  z-index: 50;
  width: fit-content;
  transform-origin: var(--radix-tooltip-content-transform-origin);
  border-radius: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  text-wrap: balance;
  
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
  
  .tooltip-arrow {
    background-color: var(--color-primary);
    fill: var(--color-primary);
    z-index: 50;
    width: 0.625rem;
    height: 0.625rem;
    transform: translateY(calc(-50% - 2px)) rotate(45deg);
    border-radius: 2px;
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
