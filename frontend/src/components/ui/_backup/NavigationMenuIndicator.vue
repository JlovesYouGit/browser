<template>
  <NavigationMenuIndicatorRoot
    data-slot="navigation-menu-indicator"
    :class="indicatorClasses"
    v-bind="$attrs"
  >
    <div class="indicator-arrow" />
  </NavigationMenuIndicatorRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NavigationMenuIndicator } from 'reka-ui'
import { cn } from '@/utils/cn'

interface NavigationMenuIndicatorProps {
  class?: string
}

const props = defineProps<NavigationMenuIndicatorProps>()

const NavigationMenuIndicatorRoot = NavigationMenuIndicator

const indicatorClasses = computed(() =>
  cn(
    "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
    props.class
  )
)
</script>

<style lang="less" scoped>
.navigation-menu-indicator {
  top: 100%;
  z-index: 1;
  display: flex;
  height: 0.375rem;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  
  &[data-state="visible"] {
    animation: fadeIn 0.15s ease-out;
  }
  
  &[data-state="hidden"] {
    animation: fadeOut 0.1s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  .indicator-arrow {
    background-color: var(--color-border);
    position: relative;
    top: 60%;
    height: 0.5rem;
    width: 0.5rem;
    transform: rotate(45deg);
    border-top-left-radius: 0.125rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
  
  // Performance optimizations
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
