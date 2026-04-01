<template>
  <NavigationMenuItemRoot
    data-slot="navigation-menu-item"
    :class="itemClasses"
    v-bind="$attrs"
  >
    <slot />
  </NavigationMenuItemRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NavigationMenuItem } from 'reka-ui'
import { cn } from '@/utils/cn'

interface NavigationMenuItemProps {
  class?: string
  value?: string
}

const props = defineProps<NavigationMenuItemProps>()

const NavigationMenuItemRoot = NavigationMenuItem

const itemClasses = computed(() =>
  cn(
    "relative",
    props.class
  )
)
</script>

<style lang="less" scoped>
.navigation-menu-item {
  position: relative;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Performance optimizations
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
