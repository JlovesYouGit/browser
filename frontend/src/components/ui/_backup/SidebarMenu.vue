<template>
  <ul
    data-slot="sidebar-menu"
    data-sidebar="menu"
    :class="menuClasses"
    v-bind="$attrs"
  >
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SidebarMenuProps {
  class?: string
}

const props = defineProps<SidebarMenuProps>()

const menuClasses = computed(() =>
  cn(
    "flex w-full min-w-0 flex-col gap-1",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-menu {
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
