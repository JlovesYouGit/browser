<template>
  <DrawerPortalRoot>
    <DrawerOverlay />
    <DrawerContentRoot
      data-slot="drawer-content"
      :class="contentClasses"
      v-bind="$attrs"
    >
      <div class="drawer-handle" />
      <slot />
    </DrawerContentRoot>
  </DrawerPortalRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DrawerContent, DrawerPortal } from 'vaul'
import { cn } from '@/utils/cn'
import DrawerOverlay from './DrawerOverlay.vue'

interface DrawerContentProps {
  class?: string
}

const props = defineProps<DrawerContentProps>()

const DrawerContentRoot = DrawerContent
const DrawerPortalRoot = DrawerPortal

const contentClasses = computed(() =>
  cn(
    "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
    "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
    "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
    "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
    "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
    props.class
  )
)
</script>

<style lang="less" scoped>
.drawer-content {
  background-color: var(--color-background);
  position: fixed;
  z-index: 50;
  display: flex;
  flex-direction: column;
  height: auto;
  
  // Top direction
  &[data-vaul-drawer-direction="top"] {
    inset-inline: 0;
    top: 0;
    margin-bottom: 6rem;
    max-height: 80vh;
    border-radius: 0 0 0.5rem 0.5rem;
    border-bottom: 1px solid var(--color-border);
  }
  
  // Bottom direction
  &[data-vaul-drawer-direction="bottom"] {
    inset-inline: 0;
    bottom: 0;
    margin-top: 6rem;
    max-height: 80vh;
    border-radius: 0.5rem 0.5rem 0 0;
    border-top: 1px solid var(--color-border);
  }
  
  // Right direction
  &[data-vaul-drawer-direction="right"] {
    inset-block: 0;
    right: 0;
    width: 75%;
    border-left: 1px solid var(--color-border);
    
    @media (min-width: 640px) {
      max-width: 24rem;
    }
  }
  
  // Left direction
  &[data-vaul-drawer-direction="left"] {
    inset-block: 0;
    left: 0;
    width: 75%;
    border-right: 1px solid var(--color-border);
    
    @media (min-width: 640px) {
      max-width: 24rem;
    }
  }
  
  // Drawer handle (only visible for bottom drawer)
  .drawer-handle {
    background-color: var(--color-muted);
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    height: 0.5rem;
    width: 100px;
    flex-shrink: 0;
    border-radius: 9999px;
    
    // Only show handle for bottom drawer
    :global(.group\\/drawer-content[data-vaul-drawer-direction="bottom"]) & {
      display: block;
    }
    
    // Hide handle for other directions
    :global(.group\\/drawer-content:not([data-vaul-drawer-direction="bottom"])) & {
      display: none;
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
