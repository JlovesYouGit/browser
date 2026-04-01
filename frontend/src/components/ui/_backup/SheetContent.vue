<template>
  <SheetPortal>
    <SheetOverlay />
    <DialogContentRoot
      data-slot="sheet-content"
      :class="contentClasses"
      v-bind="$attrs"
    >
      <slot />
      <DialogCloseRoot
        class="close-button"
      >
        <XIcon class="x-icon" />
        <span class="sr-only">Close</span>
      </DialogCloseRoot>
    </DialogContentRoot>
  </SheetPortal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DialogContent, DialogClose } from 'reka-ui'
import { X } from 'lucide-vue-next'
import { cn } from '@/utils/cn'
import SheetPortal from './SheetPortal.vue'
import SheetOverlay from './SheetOverlay.vue'

interface SheetContentProps {
  class?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const props = withDefaults(defineProps<SheetContentProps>(), {
  side: 'right'
})

const DialogContentRoot = DialogContent
const DialogCloseRoot = DialogClose
const XIcon = X

const contentClasses = computed(() =>
  cn(
    "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
    props.side === 'right' && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
    props.side === 'left' && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
    props.side === 'top' && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
    props.side === 'bottom' && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sheet-content {
  background-color: var(--color-background);
  position: fixed;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
  
  &[data-state="open"] {
    animation-duration: 500ms;
  }
  
  &[data-state="closed"] {
    animation-duration: 300ms;
  }
  
  // Right side
  &[data-side="right"] {
    top: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 75%;
    border-left: 1px solid var(--color-border);
    
    @media (min-width: 640px) {
      max-width: 24rem;
    }
    
    &[data-state="open"] {
      animation: slideInFromRight 0.5s ease-out;
    }
    
    &[data-state="closed"] {
      animation: slideOutToRight 0.3s ease-in;
    }
  }
  
  // Left side
  &[data-side="left"] {
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 75%;
    border-right: 1px solid var(--color-border);
    
    @media (min-width: 640px) {
      max-width: 24rem;
    }
    
    &[data-state="open"] {
      animation: slideInFromLeft 0.5s ease-out;
    }
    
    &[data-state="closed"] {
      animation: slideOutToLeft 0.3s ease-in;
    }
  }
  
  // Top side
  &[data-side="top"] {
    left: 0;
    right: 0;
    top: 0;
    height: auto;
    border-bottom: 1px solid var(--color-border);
    
    &[data-state="open"] {
      animation: slideInFromTop 0.5s ease-out;
    }
    
    &[data-state="closed"] {
      animation: slideOutToTop 0.3s ease-in;
    }
  }
  
  // Bottom side
  &[data-side="bottom"] {
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
    border-top: 1px solid var(--color-border);
    
    &[data-state="open"] {
      animation: slideInFromBottom 0.5s ease-out;
    }
    
    &[data-state="closed"] {
      animation: slideOutToBottom 0.3s ease-in;
    }
  }
  
  @keyframes slideInFromRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideOutToRight {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
  
  @keyframes slideInFromLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideOutToLeft {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }
  
  @keyframes slideInFromTop {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }
  
  @keyframes slideOutToTop {
    from { transform: translateY(0); }
    to { transform: translateY(-100%); }
  }
  
  @keyframes slideInFromBottom {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  
  @keyframes slideOutToBottom {
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
  }
  
  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    border-radius: 0.125rem;
    opacity: 0.7;
    transition: opacity 0.15s ease;
    
    &:hover {
      opacity: 1;
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--color-ring);
      ring-offset: 2px;
    }
    
    &:disabled {
      pointer-events: none;
    }
    
    .x-icon {
      width: 1rem;
      height: 1rem;
    }
    
    .sr-only {
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
