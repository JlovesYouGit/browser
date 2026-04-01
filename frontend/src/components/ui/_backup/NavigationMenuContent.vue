<template>
  <NavigationMenuContentRoot
    data-slot="navigation-menu-content"
    :class="contentClasses"
    v-bind="$attrs"
  >
    <slot />
  </NavigationMenuContentRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NavigationMenuContent } from 'reka-ui'
import { cn } from '@/utils/cn'

interface NavigationMenuContentProps {
  class?: string
}

const props = defineProps<NavigationMenuContentProps>()

const NavigationMenuContentRoot = NavigationMenuContent

const contentClasses = computed(() =>
  cn(
    "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
    "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
    props.class
  )
)
</script>

<style lang="less" scoped>
.navigation-menu-content {
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  padding-right: 0.625rem;
  
  @media (min-width: 768px) {
    position: absolute;
    width: auto;
  }
  
  // Motion animations
  &[data-motion^="from-"] {
    animation: fadeIn 0.15s ease-out;
  }
  
  &[data-motion^="to-"] {
    animation: fadeOut 0.1s ease-in;
  }
  
  &[data-motion="from-end"] {
    animation: slideInFromRight 0.15s ease-out;
  }
  
  &[data-motion="from-start"] {
    animation: slideInFromLeft 0.15s ease-out;
  }
  
  &[data-motion="to-end"] {
    animation: slideOutToRight 0.1s ease-in;
  }
  
  &[data-motion="to-start"] {
    animation: slideOutToLeft 0.1s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes slideInFromRight {
    from { transform: translateX(13rem); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideInFromLeft {
    from { transform: translateX(-13rem); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideOutToRight {
    from { transform: translateX(0); }
    to { transform: translateX(13rem); }
  }
  
  @keyframes slideOutToLeft {
    from { transform: translateX(0); }
    to { transform: translateX(-13rem); }
  }
  
  // Viewport false styles
  :global(.group[data-viewport="false"]) & {
    background-color: var(--color-popover);
    color: var(--color-popover-foreground);
    
    &[data-state="open"] {
      animation: fadeIn 0.15s ease-out, zoomIn 0.15s ease-out;
    }
    
    &[data-state="closed"] {
      animation: fadeOut 0.1s ease-in, zoomOut 0.1s ease-in;
    }
    
    @keyframes zoomIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    
    @keyframes zoomOut {
      from { transform: scale(1); opacity: 1; }
      to { transform: scale(0.95); opacity: 0; }
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
