<template>
  <NavigationMenuListRoot
    data-slot="navigation-menu-list"
    :class="listClasses"
    v-bind="$attrs"
  >
    <slot />
  </NavigationMenuListRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NavigationMenuList } from 'reka-ui'
import { cn } from '@/utils/cn'

interface NavigationMenuListProps {
  class?: string
}

const props = defineProps<NavigationMenuListProps>()

const NavigationMenuListRoot = NavigationMenuList

const listClasses = computed(() =>
  cn(
    "group flex flex-1 list-none items-center justify-center gap-1",
    props.class
  )
)
</script>

<style lang="less" scoped>
.navigation-menu-list {
  display: flex;
  flex: 1;
  list-style: none;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  
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
