<template>
  <div
    class="viewport-wrapper"
  >
    <NavigationMenuViewportRoot
      data-slot="navigation-menu-viewport"
      :class="viewportClasses"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NavigationMenuViewport } from 'reka-ui'
import { cn } from '@/utils/cn'

interface NavigationMenuViewportProps {
  class?: string
}

const props = defineProps<NavigationMenuViewportProps>()

const NavigationMenuViewportRoot = NavigationMenuViewport

const viewportClasses = computed(() =>
  cn(
    "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
    props.class
  )
)
</script>

<style lang="less" scoped>
.viewport-wrapper {
  position: absolute;
  top: 100%;
  left: 0;
  isolation: isolate;
  z-index: 50;
  display: flex;
  justify-content: center;
}

.navigation-menu-viewport {
  background-color: var(--color-popover);
  color: var(--color-popover-foreground);
  position: relative;
  margin-top: 0.375rem;
  height: var(--radix-navigation-menu-viewport-height);
  width: 100%;
  overflow: hidden;
  border-radius: 0.375rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform-origin: top center;
  
  @media (min-width: 768px) {
    width: var(--radix-navigation-menu-viewport-width);
  }
  
  &[data-state="open"] {
    animation: zoomIn 0.15s ease-out;
  }
  
  &[data-state="closed"] {
    animation: zoomOut 0.1s ease-in;
  }
  
  @keyframes zoomIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  @keyframes zoomOut {
    from { transform: scale(1); opacity: 1; }
    to { transform: scale(0.95); opacity: 0; }
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
