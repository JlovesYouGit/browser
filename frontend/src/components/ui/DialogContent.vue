<template>
  <DialogPortalRoot>
    <DialogOverlay />
    <DialogContentRoot
      data-slot="dialog-content"
      :class="contentClasses"
      v-bind="$attrs"
    >
      <slot />
      <DialogCloseRoot
        :class="closeButtonClasses"
      >
        <XIcon />
        <span class="sr-only">Close</span>
      </DialogCloseRoot>
    </DialogContentRoot>
  </DialogPortalRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DialogContent, DialogClose, DialogPortal } from 'reka-ui'
import { X } from 'lucide-vue-next'
import { cn } from '@/utils/cn'
import DialogOverlay from './DialogOverlay.vue'

interface DialogContentProps {
  class?: string
}

const props = defineProps<DialogContentProps>()

const DialogContentRoot = DialogContent
const DialogCloseRoot = DialogClose
const DialogPortalRoot = DialogPortal
const XIcon = X

const contentClasses = computed(() =>
  cn(
    "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
    props.class
  )
)

const closeButtonClasses = computed(() =>
  cn(
    "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  )
)
</script>

<style lang="less" scoped>
.dialog-content {
  background-color: var(--color-background);
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 50;
  display: grid;
  width: 100%;
  max-width: calc(100% - 2rem);
  transform: translate(-50%, -50%);
  gap: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  padding: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition-duration: 200ms;
  
  @media (min-width: 640px) {
    max-width: 32rem;
  }
  
  &[data-state="open"] {
    animation: fadeIn 0.15s ease-out, zoomIn 0.15s ease-out;
  }
  
  &[data-state="closed"] {
    animation: fadeOut 0.1s ease-in, zoomOut 0.1s ease-in;
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
    from { transform: translate(-50%, -50%) scale(0.95); }
    to { transform: translate(-50%, -50%) scale(1); }
  }
  
  @keyframes zoomOut {
    from { transform: translate(-50%, -50%) scale(1); }
    to { transform: translate(-50%, -50%) scale(0.95); }
  }
  
  // Close button
  :deep(.dialog-close) {
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
      box-shadow: 0 0 0 2px var(--color-ring), 0 0 0 4px var(--color-background);
    }
    
    &[data-state="open"] {
      background-color: var(--color-accent);
      color: var(--color-muted-foreground);
    }
    
    &:disabled {
      pointer-events: none;
    }
    
    :deep(svg) {
      pointer-events: none;
      flex-shrink: 0;
      
      &:not([class*='size-']) {
        width: 1rem;
        height: 1rem;
      }
    }
  }
  
  // Screen reader only text
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
  transform: translateZ(0) translate(-50%, -50%);
  -webkit-transform: translateZ(0) translate(-50%, -50%);
  will-change: auto;
  contain: layout style paint;
}
</style>
