<template>
  <SelectPortal>
    <SelectContentRoot
      data-slot="select-content"
      :position="position"
      :class="contentClasses"
      v-bind="$attrs"
    >
      <SelectScrollUpButton />
      <SelectViewport :class="viewportClasses">
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContentRoot>
  </SelectPortal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SelectContent, SelectPortal, SelectViewport } from 'reka-ui'
import { cn } from '@/utils/cn'
import SelectScrollUpButton from './SelectScrollUpButton.vue'
import SelectScrollDownButton from './SelectScrollDownButton.vue'

interface SelectContentProps {
  class?: string
  position?: 'popper' | 'item-aligned'
}

const props = withDefaults(defineProps<SelectContentProps>(), {
  position: 'popper'
})

const SelectContentRoot = SelectContent

const contentClasses = computed(() =>
  cn(
    "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] origin-[--radix-select-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
    props.position === 'popper' && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
    props.class
  )
)

const viewportClasses = computed(() =>
  cn(
    "p-1",
    props.position === 'popper' && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
  )
)
</script>

<style lang="less" scoped>
.select-content {
  background-color: var(--color-popover);
  color: var(--color-popover-foreground);
  position: relative;
  z-index: 50;
  max-height: var(--radix-select-content-available-height);
  min-width: 8rem;
  transform-origin: var(--radix-select-content-transform-origin);
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 0.375rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
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
  
  &[data-position="popper"] {
    &[data-side="bottom"] {
      transform: translateY(0.25rem);
    }
    
    &[data-side="left"] {
      transform: translateX(-0.25rem);
    }
    
    &[data-side="right"] {
      transform: translateX(0.25rem);
    }
    
    &[data-side="top"] {
      transform: translateY(-0.25rem);
    }
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
