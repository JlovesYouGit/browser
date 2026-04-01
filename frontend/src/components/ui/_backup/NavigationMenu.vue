<template>
  <NavigationMenuRoot
    data-slot="navigation-menu"
    :data-viewport="viewport"
    :class="menuClasses"
    v-bind="$attrs"
  >
    <slot />
    <NavigationMenuViewport v-if="viewport" />
  </NavigationMenuRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NavigationMenuRoot } from 'reka-ui'
import NavigationMenuViewport from './NavigationMenuViewport.vue'
import { cn } from '@/utils/cn'

interface NavigationMenuProps {
  class?: string
  viewport?: boolean
  delayDuration?: number
  skipDelayDuration?: number
  dir?: 'ltr' | 'rtl'
  orientation?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<NavigationMenuProps>(), {
  viewport: true
})

const menuClasses = computed(() =>
  cn(
    "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
    props.class
  )
)
</script>

<style lang="less" scoped>
.navigation-menu {
  position: relative;
  display: flex;
  max-width: max-content;
  flex: 1;
  align-items: center;
  justify-content: center;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
  
  // Performance optimizations
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
